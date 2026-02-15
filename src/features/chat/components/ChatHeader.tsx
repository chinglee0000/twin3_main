/**
 * ChatHeader Component
 * 
 * Top header bar with sidebar toggles and logo
 */

import React from 'react';
import { PanelLeftOpen, PanelLeftClose, LayoutList } from 'lucide-react';
import { Tooltip } from '../../../components/ui/Tooltip';
import { LogoWithText } from '../../../components/ui/LogoWithText';

interface ChatHeaderProps {
    sidebarOpen: boolean;
    rightSidebarOpen: boolean;
    onToggleSidebar: () => void;
    onToggleRightSidebar: () => void;
    tokenBalance?: number;
    userAvatar?: string;
    isWalletConnected?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    sidebarOpen,
    rightSidebarOpen,
    onToggleSidebar,
    onToggleRightSidebar,
    tokenBalance = 0,
    userAvatar = 'https://i.pravatar.cc/150?img=12',
    isWalletConnected = false,
}) => {
    const formatTokenBalance = (balance: number) => {
        if (balance >= 1000) {
            return `${(balance / 1000).toFixed(2)}K`;
        }
        return balance.toString();
    };

    const isMobile = window.innerWidth < 768;

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
                <LogoWithText height={28} />
            </div>

            {/* Right Side: Token Balance + Avatar + Wallet Address (only if wallet connected) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Token Balance + Avatar + Wallet Address - Only show if wallet connected */}
                {isWalletConnected && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '8px' : '10px',
                        padding: isMobile ? '6px 10px' : '6px 12px',
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    }}
                    >
                        {/* Token Balance - Always visible */}
                        <span style={{
                            fontSize: isMobile ? '14px' : '15px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-sans)',
                            whiteSpace: 'nowrap',
                        }}>
                            {formatTokenBalance(tokenBalance)} $twin3
                        </span>

                        {/* Avatar - Always visible */}
                        <div style={{
                            width: isMobile ? '28px' : '32px',
                            height: isMobile ? '28px' : '32px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0,
                        }}>
                            <img 
                                src={userAvatar} 
                                alt="User Avatar"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>

                        {/* Wallet Address - Hidden on mobile (< 768px) */}
                        {!isMobile && (
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)',
                                fontFamily: 'monospace',
                                whiteSpace: 'nowrap',
                            }}>
                                0xbf6183a1...859
                            </span>
                        )}
                    </div>
                )}

                {/* Right Sidebar Toggle (PC Only) */}
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
