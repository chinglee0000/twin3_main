/**
 * ChatLayoutV2
 * 
 * Refactored version using extracted hooks and components.
 * For testing and gradual migration.
 */

import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import type { ContextId } from '../../types/context';
import type { TaskOpportunityPayload } from '../../types';

// Extracted Hooks
import { useChatState } from './hooks/useChatState';
import { useSidebar } from './hooks/useSidebar';

// Extracted Components
import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { QuickActionsPanel } from './components/QuickActionsPanel';

// Existing Components
import { MessageBubble } from './MessageBubble';
import { TaskDetailModal } from '../twin-matrix/components/TaskDetailModal';
import { DevConsole } from '../widgets';

interface ChatLayoutV2Props {
    contextId?: ContextId;
}

export const ChatLayoutV2: React.FC<ChatLayoutV2Props> = ({ contextId }) => {
    // Extracted state hooks
    const {
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
    } = useChatState({ contextId });

    const {
        sidebarOpen,
        rightSidebarOpen,
        toggleSidebar,
        toggleRightSidebar,
        closeSidebarOnMobile,
    } = useSidebar();

    const [showDevConsole, setShowDevConsole] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'matrix' | 'tasks' | 'history'>('chat');

    const handleQuickAction = (action: string) => {
        triggerResponse(null, action, false);
    };

    const handleSuggestionClick = (payload: string) => {
        triggerResponse(payload, payload, true);
    };

    return (
        <div style={{
            display: 'flex',
            height: '100dvh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Mobile Overlay */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 998
                    }}
                />
            )}

            {/* Main Area */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                position: 'relative',
            }}>
                {/* Header */}
                <ChatHeader
                    sidebarOpen={sidebarOpen}
                    rightSidebarOpen={rightSidebarOpen}
                    onToggleSidebar={toggleSidebar}
                    onToggleRightSidebar={toggleRightSidebar}
                />

                {/* Chat Messages Area */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '16px'
                }} className="scrollbar-hide">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {/* Messages */}
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                onAction={(actionId) => triggerResponse(null, actionId, false)}
                                onCardClick={(task: TaskOpportunityPayload) => setSelectedTask(task)}
                                onVerificationComplete={() => setIsVerified(true)}
                            />
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 16px',
                                marginBottom: '8px'
                            }}>
                                <div className="typing-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        )}

                        <div ref={scrollRef} />
                    </div>
                </div>

                {/* Input Area */}
                <ChatInput
                    inputValue={inputValue}
                    isTyping={isTyping}
                    suggestions={suggestions}
                    inputRef={inputRef}
                    onInputChange={setInputValue}
                    onSubmit={handleSubmit}
                    onKeyDown={handleKeyDown}
                    onSuggestionClick={handleSuggestionClick}
                />
            </main>

            {/* Right Sidebar */}
            <QuickActionsPanel
                isOpen={rightSidebarOpen}
                onActionClick={handleQuickAction}
            />

            {/* Task Detail Modal */}
            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onAccept={handleAcceptTask}
                />
            )}

            {/* Dev Console Toggle */}
            <button
                onClick={() => setShowDevConsole(!showDevConsole)}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    left: '16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: showDevConsole ? 'rgba(48, 209, 88, 0.2)' : 'var(--glass-bg)',
                    border: showDevConsole ? '1px solid rgba(48, 209, 88, 0.3)' : '1px solid var(--glass-border)',
                    color: showDevConsole ? '#30d158' : 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100
                }}
            >
                <Terminal size={18} />
            </button>

            {/* Dev Console */}
            <DevConsole
                isOpen={showDevConsole}
                onClose={() => setShowDevConsole(false)}
            />
        </div>
    );
};
