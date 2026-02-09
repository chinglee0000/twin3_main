import React from 'react';
import type { Message } from '../../../types';
import type { Suggestion } from '../../../types/a2ui';
import { MessageBubble } from '../MessageBubble';
import { ChatInput } from '../components';

interface ChatViewProps {
    messages: Message[];
    suggestions: Suggestion[];
    isTyping: boolean;
    inputValue: string;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    scrollRef: React.RefObject<HTMLDivElement>;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onSuggestionClick: (payload: string) => void;
    onAction: (action: string, payload?: any) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
    messages,
    suggestions,
    isTyping,
    inputValue,
    inputRef,
    scrollRef,
    onInputChange,
    onSubmit,
    onKeyDown,
    onSuggestionClick,
    onAction
}) => {
    return (
        <div className="chat-view animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '16px'
            }} className="scrollbar-hide">
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} onAction={onAction} />
                    ))}

                    {isTyping && (
                        <div className="animate-fade-in" style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '24px'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--color-accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: 'var(--glow-primary)'
                            }}>
                                <span style={{ fontSize: '16px' }}>✨</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '8px' }}>
                                {[0, 150, 300].map((delay, i) => (
                                    <span key={i} className="animate-bounce" style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--color-text-dim)',
                                        animationDelay: `${delay}ms`,
                                        display: 'inline-block'
                                    }} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Chat Input */}
            <div style={{
                borderTop: '1px solid var(--glass-border)',
                padding: '16px',
                flexShrink: 0
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <ChatInput
                        inputValue={inputValue}
                        isTyping={isTyping}
                        suggestions={suggestions}
                        inputRef={inputRef}
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                        onKeyDown={onKeyDown}
                        onSuggestionClick={onSuggestionClick}
                    />
                </div>
            </div>
        </div>
    );
};
