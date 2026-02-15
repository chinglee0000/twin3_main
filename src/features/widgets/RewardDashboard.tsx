import React, { useState, useEffect } from 'react';
import { Wallet, Trophy, CheckCircle, ArrowUpRight, Clock } from 'lucide-react';

interface RewardDashboardProps {
    balance?: number;
    completedTasks?: Array<{
        id: string;
        name: string;
        reward: number;
        completedAt: string;
    }>;
    onInvite?: () => void;
    onCommunity?: () => void;
}

export const RewardDashboard: React.FC<RewardDashboardProps> = ({
    balance = 500,
    completedTasks = [
        { id: '1', name: 'Airdrop Claim', reward: 500, completedAt: 'Just now' },
    ],
    onInvite,
    onCommunity,
}) => {
    const [displayBalance, setDisplayBalance] = useState(0);

    // Animate balance count-up
    useEffect(() => {
        const duration = 1500;
        const startTime = Date.now();
        let raf: number;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const ratio = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - ratio, 3);
            setDisplayBalance(Math.round(balance * eased));

            if (ratio < 1) {
                raf = requestAnimationFrame(animate);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [balance]);

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
                    <Wallet size={20} color="#ffffff" />
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Reward Dashboard
                    </span>
                </div>
            </div>

            {/* Balance */}
            <div style={{
                padding: '24px 20px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
                <div style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    Total Balance
                </div>
                <div style={{
                    fontSize: '36px',
                    fontWeight: 800,
                    color: 'var(--color-info)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1.1,
                }}>
                    {displayBalance.toLocaleString()}
                </div>
                <div style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                }}>
                    $twin3
                </div>
            </div>

            {/* Completed Tasks */}
            <div style={{ padding: '12px 0' }}>
                <div style={{
                    padding: '8px 20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                }}>
                    Completed Missions
                </div>

                {completedTasks.map((task) => (
                    <div key={task.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'rgba(34, 197, 94, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <CheckCircle size={18} color="#22c55e" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                            }}>
                                {task.name}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: 'var(--color-text-dim)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}>
                                <Clock size={10} />
                                {task.completedAt}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--color-info)',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            +{task.reward}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div style={{
                padding: '12px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                gap: '10px',
            }}>
                {onInvite && (
                    <button
                        onClick={onInvite}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            background: '#ffffff',
                            border: '1px solid transparent',
                            color: '#000000',
                            fontSize: '13px',
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
                        <ArrowUpRight size={14} />
                        Invite Friends
                    </button>
                )}
                {onCommunity && (
                    <button
                        onClick={onCommunity}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Trophy size={14} />
                        Community
                    </button>
                )}
            </div>
        </div>
    );
};
