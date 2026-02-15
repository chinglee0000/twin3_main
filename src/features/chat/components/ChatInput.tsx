/**
 * ChatInput Component
 * 
 * Message input area with textarea and send button
 */

import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import type { Suggestion } from '../../../types/a2ui';

interface ChatInputProps {
    inputValue: string;
    isTyping: boolean;
    suggestions: Suggestion[];
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onSuggestionClick: (payload: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputValue,
    isTyping,
    suggestions,
    inputRef,
    onInputChange,
    onSubmit,
    onKeyDown,
    onSuggestionClick,
    disabled = false,
}) => {
    return (
        <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            flexShrink: 0,
            opacity: disabled ? 0.6 : 1,
            pointerEvents: disabled ? 'none' : 'auto',
            transition: 'opacity 0.2s'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Suggestions */}
                {suggestions.length > 0 && !disabled && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px'
                    }}>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                className="btn-ghost"
                                style={{
                                    fontSize: '13px',
                                    padding: '8px 14px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)'
                                }}
                                onClick={() => onSuggestionClick(s.payload)}
                            >
                                <Sparkles size={12} style={{ color: 'var(--color-primary)', opacity: 0.8 }} />
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="glass" style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => {
                            if (disabled) return;
                            onInputChange(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                        }}
                        onKeyDown={onKeyDown}
                        placeholder={disabled ? "Please complete verification above..." : "Message twin3..."}
                        rows={1}
                        readOnly={disabled}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-primary)',
                            fontSize: '15px',
                            resize: 'none',
                            outline: 'none',
                            maxHeight: '120px',
                            lineHeight: '1.5',
                            padding: '4px 0',
                            cursor: disabled ? 'not-allowed' : 'text'
                        }}
                    />
                    <button
                        onClick={onSubmit}
                        disabled={isTyping || !inputValue.trim() || disabled}
                        className="btn btn-primary"
                        style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isTyping || !inputValue.trim() || disabled ? 0.5 : 1,
                            transition: 'all 0.2s',
                            cursor: disabled ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
