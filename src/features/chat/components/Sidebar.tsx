import React from 'react';
import { Settings, Sparkles, Grid, CheckSquare, LayoutDashboard, X, MessageSquare } from 'lucide-react';
import { Logo } from '../../../components/ui/Logo';
import { SidebarNavButton } from './SidebarNavButton';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onNavigate: (section: 'chat' | 'matrix' | 'tasks' | 'dashboard') => void;
    activeSection: {
        chat: boolean;
        matrix: boolean;
        tasks: boolean;
        dashboard: boolean;
    };
    onReplayIntro: () => void;
    quickActions?: Array<{ icon: any; label: string; action: string }>;
    onQuickAction?: (actionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onToggle,
    onNavigate,
    activeSection,
    onReplayIntro,
    quickActions = [],
    onQuickAction
}) => {
    const isDesktop = window.innerWidth >= 1024;
    const isCollapsed = isDesktop && !isOpen;

    return (
        <aside
            className="glass scrollbar-hide"
            style={{
                width: isDesktop ? (isOpen ? '240px' : '80px') : isOpen ? '280px' : '0',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                position: isDesktop ? 'relative' : 'fixed',
                left: 0,
                top: 0,
                height: '100%',
                zIndex: 40,
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: isOpen ? 'visible' : 'hidden',
                borderRight: '1px solid var(--glass-border)',
            }}
        >
            {/* Header */}
            <div style={{
                padding: isCollapsed ? '16px 8px' : '16px 12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    gap: '8px'
                }}>
                    {isCollapsed ? (
                        <Logo />
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Logo />
                            <span style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)'
                            }}>twin3.ai</span>
                        </div>
                    )}

                    {!isDesktop && (
                        <button
                            onClick={onToggle}
                            className="btn-ghost"
                            style={{
                                padding: '8px',
                                minWidth: '32px',
                                borderRadius: 'var(--radius-md)'
                            }}
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav style={{
                flex: 1,
                padding: isCollapsed ? '16px 8px' : '16px 12px',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: isCollapsed ? 'center' : 'stretch'
            }} className="scrollbar-hide">
                {/* Main Navigation Tabs */}
                <SidebarNavButton
                    icon={MessageSquare}
                    label="Chat"
                    isActive={activeSection.chat}
                    isCollapsed={isCollapsed}
                    onClick={() => onNavigate('chat')}
                />

                <SidebarNavButton
                    icon={Grid}
                    label="Twin Matrix"
                    isActive={activeSection.matrix}
                    isCollapsed={isCollapsed}
                    onClick={() => onNavigate('matrix')}
                />

                <SidebarNavButton
                    icon={CheckSquare}
                    label="Tasks"
                    isActive={activeSection.tasks}
                    isCollapsed={isCollapsed}
                    onClick={() => onNavigate('tasks')}
                />

                <SidebarNavButton
                    icon={LayoutDashboard}
                    label="Dashboard"
                    isActive={activeSection.dashboard}
                    isCollapsed={isCollapsed}
                    onClick={() => onNavigate('dashboard')}
                />

                {/* Mobile Quick Actions */}
                {!isDesktop && quickActions.length > 0 && (
                    <>
                        <div style={{
                            height: '1px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            margin: '12px 0'
                        }} />

                        <div style={{
                            padding: '0 12px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--color-text-dim)',
                            marginBottom: '8px'
                        }}>
                            Quick Actions
                        </div>

                        {quickActions.map((qa, i) => {
                            const Icon = qa.icon;
                            return (
                                <button
                                    key={i}
                                    onClick={() => onQuickAction?.(qa.action)}
                                    className="btn-ghost"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    <Icon size={20} />
                                    <span style={{ fontWeight: 500 }}>{qa.label}</span>
                                </button>
                            );
                        })}
                    </>
                )}
            </nav>

            {/* Footer */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}>
                <button
                    onClick={onReplayIntro}
                    className="btn-ghost"
                    style={{
                        width: isCollapsed ? '48px' : '100%',
                        height: isCollapsed ? '48px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: isCollapsed ? '0' : '10px 12px',
                        background: 'transparent',
                        color: 'var(--color-text-dim)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                    }}
                    title="Replay Intro"
                >
                    <Sparkles size={16} />
                    {!isCollapsed && "Replay Intro"}
                </button>

                <button
                    className="btn-ghost"
                    style={{
                        width: isCollapsed ? '48px' : '100%',
                        height: isCollapsed ? '48px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: isCollapsed ? '0' : '10px 12px',
                        background: 'transparent',
                        color: 'var(--color-text-dim)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        justifyContent: isCollapsed ? 'center' : 'flex-start'
                    }}
                    title={!isOpen ? "Settings" : undefined}
                >
                    <Settings size={16} />
                    {!isCollapsed && "Settings"}
                </button>
            </div>
        </aside>
    );
};
