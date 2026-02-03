/**
 * QuickActionsPanel Component
 * 
 * Right sidebar with quick action buttons
 */

import React from 'react';
import { Shield, FileText, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuickAction {
    icon: LucideIcon;
    label: string;
    action: string;
}

interface QuickActionsPanelProps {
    isOpen: boolean;
    onActionClick: (action: string) => void;
}

const quickActions: QuickAction[] = [
    { icon: Shield, label: 'Verify Humanity', action: 'verify_human' },
    { icon: FileText, label: 'White Paper', action: 'white_paper' },
    { icon: HelpCircle, label: 'How It Works', action: 'how_it_works' },
];

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
    isOpen,
    onActionClick,
}) => {
    return (
        <aside
            className="glass"
            style={{
                width: isOpen ? '240px' : '0',
                flexShrink: 0,
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                transition: 'width 0.3s ease',
                display: window.innerWidth >= 1024 ? 'flex' : 'none',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <div style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                flexShrink: 0,
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap'
            }}>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    Quick Actions
                </h3>
            </div>

            {/* Actions */}
            <div style={{
                padding: '16px',
                flex: 1,
                overflow: 'auto',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.2s ease 0.1s'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {quickActions.map((qa, i) => {
                        const Icon = qa.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => onActionClick(qa.action)}
                                className="card card-hover"
                                style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                                <span style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {qa.label}
                                </span>
                                <span style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>→</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
