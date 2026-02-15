import React from 'react';
import { Users, Lock, ExternalLink, Zap, Target, Gift } from 'lucide-react';

interface CommunityPreviewProps {
    onJoinCommunity?: () => void;
    onClose?: () => void;
}

const FUTURE_TASKS = [
    {
        id: 'social_connect',
        title: 'Connect Social Accounts',
        description: 'Link Twitter, Instagram, or TikTok for identity boost',
        reward: '+100 $twin3',
        icon: Zap,
        locked: true,
    },
    {
        id: 'content_creator',
        title: 'Content Creator Challenge',
        description: 'Complete brand tasks and earn rewards',
        reward: '+500 $twin3',
        icon: Target,
        locked: true,
    },
    {
        id: 'dao_vote',
        title: 'DAO Governance Vote',
        description: 'Participate in community decision-making',
        reward: '+200 $twin3',
        icon: Users,
        locked: true,
    },
    {
        id: 'referral_milestone',
        title: 'Referral Milestone',
        description: 'Invite 10 friends to unlock bonus rewards',
        reward: '+1000 $twin3',
        icon: Gift,
        locked: true,
    },
];

export const CommunityPreview: React.FC<CommunityPreviewProps> = ({
    onJoinCommunity,
    onClose,
}) => {
    const cardStyle: React.CSSProperties = {
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '400px',
        margin: window.innerWidth < 768 ? '0 auto' : '0',
    };

    return (
        <div className="card animate-fade-in" style={cardStyle}>
            {/* Header */}
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={20} color="#ffffff" />
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Community & Future Tasks
                    </span>
                </div>
                <p style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '8px',
                    lineHeight: 1.5,
                }}>
                    Join the twin3 community and unlock upcoming missions.
                </p>
            </div>

            {/* Future Tasks */}
            <div style={{ padding: '8px 0' }}>
                {FUTURE_TASKS.map((task) => {
                    const TaskIcon = task.icon;
                    return (
                        <div key={task.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '14px 20px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                            opacity: 0.6,
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                position: 'relative',
                            }}>
                                <TaskIcon size={18} color="var(--color-text-dim)" />
                                {task.locked && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        right: '-3px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: 'rgba(107, 114, 128, 0.8)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Lock size={8} color="white" />
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: '2px',
                                }}>
                                    {task.title}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'var(--color-text-dim)',
                                    lineHeight: 1.3,
                                }}>
                                    {task.description}
                                </div>
                            </div>

                            <div style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                color: 'var(--color-text-dim)',
                                fontFamily: 'var(--font-sans)',
                                whiteSpace: 'nowrap',
                            }}>
                                {task.reward}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Community CTA */}
            <div style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <button
                    onClick={onJoinCommunity}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: '#ffffff',
                        border: '1px solid transparent',
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <ExternalLink size={16} />
                    Join Community
                </button>

                {onClose && (
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Chat
                    </button>
                )}
            </div>
        </div>
    );
};
