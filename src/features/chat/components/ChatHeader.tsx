/**
 * ChatHeader Component
 * 
 * Top header bar with sidebar toggles and logo
 */

import React from 'react';
import { PanelLeftOpen, PanelLeftClose, LayoutList } from 'lucide-react';
import { Tooltip } from '../../../components/ui/Tooltip';
import { Logo } from '../../../components/ui/Logo';

interface ChatHeaderProps {
    sidebarOpen: boolean;
    rightSidebarOpen: boolean;
    onToggleSidebar: () => void;
    onToggleRightSidebar: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    sidebarOpen,
    rightSidebarOpen,
    onToggleSidebar,
    onToggleRightSidebar,
}) => {
    return (
        <header className="glass" style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 50
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Left Sidebar Toggle */}
                <Tooltip content={sidebarOpen ? "Close" : "Open"} placement="right">
                    <button
                        onClick={onToggleSidebar}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            transition: 'all 0.2s'
                        }}
                    >
                        {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                    </button>
                </Tooltip>
            </div>

            {/* Centered Logo for Mobile */}
            <div className="desktop-hidden" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Logo
                    width={24}
                    height={24}
                    variant="dark"
                />
                <h1 className="text-gradient" style={{ fontSize: '18px', fontWeight: 500 }}>twin3.ai</h1>
            </div>

            {/* Right Sidebar Toggle (PC Only) */}
            <div style={{ width: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                {window.innerWidth >= 1024 && (
                    <Tooltip content={rightSidebarOpen ? "Close" : "Quick Actions"} placement="left">
                        <button
                            onClick={onToggleRightSidebar}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                transition: 'all 0.2s'
                            }}
                        >
                            <LayoutList size={20} />
                        </button>
                    </Tooltip>
                )}
            </div>
        </header>
    );
};
