import { useRef, useState, useEffect } from 'react';
import { Shield, FileText, HelpCircle } from 'lucide-react';
import type { Message } from '../../types';
import type { Suggestion } from '../../types/a2ui';
import type { TaskOpportunityPayload } from '../../types';
import type { ContextId } from '../../types/context';
import { INTERACTION_INVENTORY } from '../../data/inventory';
import { generateAgentResponse, isAIEnabled, generateSuggestions } from '../../services/geminiService';
import { devLog } from '../widgets';
import { ImmersiveIntro } from '../../components/ImmersiveIntro';
import { TaskDetailModal } from '../twin-matrix/components/TaskDetailModal';

// Components
import { Sidebar } from './components/Sidebar';
import { ChatHeader } from './components/ChatHeader';
import { QuickActionsPanel } from './components/QuickActionsPanel';
import { ChatView, MatrixView, TasksView, DashboardView } from './views';

interface ChatLayoutProps {
    contextId?: ContextId;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ contextId }) => {
    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // Default open on PC
    const [selectedTask, setSelectedTask] = useState<TaskOpportunityPayload | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'matrix' | 'tasks' | 'history'>('chat');
    const [showIntro, setShowIntro] = useState(false);

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const hasStarted = useRef(false);

    // Quick Actions
    const quickActions = [
        { icon: Shield, label: 'Verify Humanity', action: 'verify_human' },
        { icon: FileText, label: 'White Paper', action: 'white_paper' },
        { icon: HelpCircle, label: 'How It Works', action: 'how_it_works' },
    ];

    // Effects
    useEffect(() => {
        if (scrollRef.current && messages.length > 1) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, suggestions]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!hasStarted.current) {
            hasStarted.current = true;
            triggerResponse(null, 'welcome', false);
        }
    }, []);

    // Logic
    const findNode = (text: string) => {
        const lowerText = text.toLowerCase();
        const match = INTERACTION_INVENTORY.find(node =>
            node.triggers.some(trigger => lowerText.includes(trigger.toLowerCase()))
        );
        return match || null;
    };

    const triggerResponse = async (input: string | null, nodeId: string | null = null, showUserMessage = true) => {
        const targetId = nodeId || input;

        // Verification gate
        if ((targetId === 'browse_tasks' || input === 'browse_tasks') && !isVerified) {
            nodeId = 'verification_required';
            input = null;
            showUserMessage = false;
            devLog('info', 'User not verified - redirecting to verification flow');
        }

        // Add User Message
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

        let node;
        if (nodeId) {
            node = INTERACTION_INVENTORY.find(n => n.id === nodeId)!;
        } else if (input) {
            node = findNode(input);
        }

        // Handle Response
        if (node) {
            const delay = node.response.delay || 500;
            await new Promise(r => setTimeout(r, delay));

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: node.response.card ? 'card' : 'text',
                content: node.response.text,
                cardData: node.response.card,
                layout: node.response.layout,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMsg]);
            setSuggestions(node.suggestedActions || []);

            // Inline widget
            if (node.response.widget) {
                const widgetMsg: Message = {
                    id: (Date.now() + 2).toString(),
                    role: 'assistant',
                    type: 'widget',
                    content: '',
                    widget: node.response.widget,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, widgetMsg]);
            }
        } else if (input && isAIEnabled()) {
            // Gemini AI
            devLog('api', 'Calling Gemini AI...');
            const history = messages.map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content
            }));

            const response = await generateAgentResponse(input, history);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'text',
                content: response.text,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, aiMsg]);

            const aiSuggestions = await generateSuggestions(response.text, `User asked: ${input}`);
            setSuggestions(aiSuggestions.map(label => ({
                label,
                payload: label.toLowerCase().replace(/\s+/g, '_')
            })));
        } else {
            // Fallback
            const fallbackNode = INTERACTION_INVENTORY.find(n => n.id === 'fallback')!;
            await new Promise(r => setTimeout(r, 300));
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                type: 'text',
                content: fallbackNode.response.text,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, aiMsg]);
            setSuggestions(fallbackNode.suggestedActions || []);
        }

        setIsTyping(false);

        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const handleAction = (actionId: string, payload?: any) => {
        // Special mapping for verification completion
        if (actionId === 'complete_verification') {
            setIsVerified(true);
            return;
        }
        triggerResponse(null, actionId, false);
    };

    const handleSubmit = () => {
        if (!inputValue.trim() || isTyping) return;
        triggerResponse(inputValue.trim());
        setInputValue('');
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div style={{
            display: 'flex',
            height: '100dvh',
            width: '100vw',
            position: 'relative',
            zIndex: 2,
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)'
        }}>
            {/* Backdrop for mobile */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 998
                    }}
                />
            )}

            {/* Main Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                onNavigate={(section) => {
                    setActiveTab(section as any);
                    if (window.innerWidth < 1024) setSidebarOpen(false);

                    // Trigger specific responses for tab switches if needed
                    if (section === 'matrix') triggerResponse(null, 'twin_matrix', false);
                    if (section === 'tasks') triggerResponse(null, 'browse_tasks', false);
                }}
                activeSection={{
                    chat: activeTab === 'chat',
                    matrix: activeTab === 'matrix',
                    tasks: activeTab === 'tasks',
                    dashboard: activeTab === 'dashboard'
                }}
                onReplayIntro={() => setShowIntro(true)}
                quickActions={[]}
            />

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                position: 'relative',
            }}>
                <ChatHeader
                    sidebarOpen={sidebarOpen}
                    rightSidebarOpen={rightSidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
                />

                {/* Content View Switching */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    {activeTab === 'chat' && (
                        <ChatView
                            messages={messages}
                            suggestions={suggestions}
                            isTyping={isTyping}
                            inputValue={inputValue}
                            inputRef={inputRef}
                            scrollRef={scrollRef}
                            onInputChange={setInputValue}
                            onSubmit={handleSubmit}
                            onKeyDown={handleKeyDown}
                            onSuggestionClick={(payload) => triggerResponse(null, payload, false)}
                            onAction={handleAction}
                        />
                    )}

                    {activeTab === 'matrix' && <MatrixView />}
                    {activeTab === 'tasks' && <TasksView />}
                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'history' && (
                        <div className="flex items-center justify-center h-full text-dim">
                            History View (Coming Soon)
                        </div>
                    )}
                </div>
            </main>

            {/* Right Sidebar */}
            <QuickActionsPanel
                isOpen={rightSidebarOpen}
                onActionClick={handleAction}
            />

            {/* Modals & Overlays */}
            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onAccept={() => {
                        // Logic from handleAcceptTask
                        if (!isVerified) {
                            setSelectedTask(null);
                            triggerResponse(null, 'verification_required', false);
                            return;
                        }
                        setSelectedTask(null);
                        triggerResponse(null, 'accept_task', false);
                    }}
                />
            )}

            {showIntro && (
                <ImmersiveIntro
                    onComplete={() => setShowIntro(false)}
                />
            )}
        </div>
    );
};
