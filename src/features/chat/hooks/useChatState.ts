/**
 * useChatState Hook
 * 
 * Extracted state management logic from ChatLayout
 * Handles messages, typing state, suggestions, and chat flow
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../../../types';
import type { Suggestion } from '../../../types/a2ui';
import type { TaskOpportunityPayload } from '../../../types';
import type { ContextId } from '../../../types/context';
import { INTERACTION_INVENTORY } from '../../../data/inventory';
import { generateAgentResponse, isAIEnabled, generateSuggestions } from '../../../services/geminiService';
import { devLog } from '../../widgets';

interface UseChatStateOptions {
    contextId?: ContextId;
}

interface UseChatStateReturn {
    // State
    messages: Message[];
    suggestions: Suggestion[];
    isTyping: boolean;
    inputValue: string;
    isVerified: boolean;
    selectedTask: TaskOpportunityPayload | null;

    // Refs
    scrollRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLTextAreaElement | null>;

    // Actions
    setInputValue: (value: string) => void;
    setIsVerified: (verified: boolean) => void;
    setSelectedTask: (task: TaskOpportunityPayload | null) => void;
    triggerResponse: (input: string | null, nodeId?: string | null, showUserMessage?: boolean) => Promise<void>;
    handleSubmit: () => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleNewChat: () => void;
    handleAcceptTask: () => void;
}

export function useChatState({ contextId }: UseChatStateOptions = {}): UseChatStateReturn {
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskOpportunityPayload | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const hasStarted = useRef(false);

    // Auto scroll on new messages
    useEffect(() => {
        if (scrollRef.current && messages.length > 1) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, suggestions]);

    // Find matching node in inventory
    const findNode = useCallback((text: string) => {
        const lowerText = text.toLowerCase();
        const match = INTERACTION_INVENTORY.find(node =>
            node.triggers.some(trigger => lowerText.includes(trigger.toLowerCase()))
        );
        return match || null;
    }, []);

    // Main response trigger
    const triggerResponse = useCallback(async (
        input: string | null,
        nodeId: string | null = null,
        showUserMessage = true
    ) => {
        // Verification gate
        const targetId = nodeId || input;
        if ((targetId === 'browse_tasks' || input === 'browse_tasks') && !isVerified) {
            nodeId = 'verification_required';
            input = null;
            showUserMessage = false;
            devLog('info', 'User not verified - redirecting to verification flow');
        }

        if (input && showUserMessage) {
            const userMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                type: 'text',
                content: input,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, userMsg]);
        }

        setIsTyping(true);
        setSuggestions([]);

        const node = nodeId
            ? INTERACTION_INVENTORY.find(n => n.id === nodeId)
            : input ? findNode(input) : null;

        await new Promise(resolve => setTimeout(resolve, node?.response.delay || 500));

        if (node) {
            devLog('info', `Matched node: ${node.id}`);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: node.response.card ? 'card' : node.response.widget ? 'widget' : 'text',
                content: node.response.text,
                cardData: node.response.card,
                widget: node.response.widget,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, botMsg]);

            if (node.suggestedActions) {
                setSuggestions(node.suggestedActions);
            }
        } else if (input && isAIEnabled()) {
            devLog('info', 'No match found, using AI response');

            const history = messages.slice(-6).map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content
            }));

            const aiResponse = await generateAgentResponse(input, history, contextId);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'text',
                content: aiResponse.text,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, botMsg]);

            const dynamicSuggestions = await generateSuggestions(input, aiResponse.text);
            setSuggestions(dynamicSuggestions.map(label => ({ label, payload: label.toLowerCase().replace(/\s+/g, '_') })));
        } else {
            devLog('error', 'No match and AI disabled, using fallback');
            const fallbackNode = INTERACTION_INVENTORY.find(n => n.id === 'fallback');
            if (fallbackNode) {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    type: 'text',
                    content: fallbackNode.response.text,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, botMsg]);
                if (fallbackNode.suggestedActions) {
                    setSuggestions(fallbackNode.suggestedActions);
                }
            }
        }

        setIsTyping(false);
    }, [isVerified, messages, findNode, contextId]);

    // Handle submit
    const handleSubmit = useCallback(() => {
        if (!inputValue.trim() || isTyping) return;
        triggerResponse(inputValue.trim());
        setInputValue('');
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    }, [inputValue, isTyping, triggerResponse]);

    // Handle keyboard
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    // Handle new chat
    const handleNewChat = useCallback(() => {
        setMessages([]);
        setSuggestions([]);
        triggerResponse(null, 'welcome', false);
    }, [triggerResponse]);

    // Handle accept task
    const handleAcceptTask = useCallback(() => {
        if (!isVerified) {
            setSelectedTask(null);
            triggerResponse(null, 'verification_required', false);
            return;
        }
        setSelectedTask(null);
        triggerResponse(null, 'accept_task', false);
    }, [isVerified, triggerResponse]);

    // Initial welcome
    useEffect(() => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            triggerResponse(null, 'welcome', false);
        }
    }, [triggerResponse]);

    return {
        messages,
        suggestions,
        isTyping,
        inputValue,
        isVerified,
        selectedTask,
        scrollRef,
        inputRef,
        setInputValue,
        setIsVerified,
        setSelectedTask,
        triggerResponse,
        handleSubmit,
        handleKeyDown,
        handleNewChat,
        handleAcceptTask,
    };
}
