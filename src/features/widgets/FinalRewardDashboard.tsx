import React, { useState, useEffect } from 'react';
import { Trophy, Coins, Users, Share2, ArrowRight } from 'lucide-react';

interface FinalRewardDashboardProps {
    matrixScore: number;
    tokenAmount: number;
    onInviteFriends?: () => void;
    onJoinCommunity?: () => void;
}

export const FinalRewardDashboard: React.FC<FinalRewardDashboardProps> = ({
    matrixScore,
    tokenAmount,
    onInviteFriends,
    onJoinCommunity,
}) => {
    const [displayTokens, setDisplayTokens] = useState(0);

    // Animate token count-up
    useEffect(() => {
        const duration = 2000;
        const startTime = Date.now();
        let raf: number;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const ratio = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - ratio, 3);
            setDisplayTokens(Math.round(tokenAmount * eased));

            if (ratio < 1) {
                raf = requestAnimationFrame(animate);
            }
        };

        raf = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(raf);
    }, [tokenAmount]);

    return (
        <div 
            className="card animate-fade-in" 
            style={{
                width: '100%',
                maxWidth: '480px',
                padding: 0,
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '24px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                textAlign: 'center',
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                }}>
                    <Trophy size={32} color="var(--color-info)" />
                </div>
                <h3 style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    fontFamily: 'Montserrat, sans-serif',
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                }}>
                    Congratulations!
                </h3>
                <p style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                }}>
                    You've completed all missions and earned your airdrop share
                </p>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
                {/* Token Amount */}
                <div style={{
                    padding: '24px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '1px solid rgba(139, 92, 246, 0.15)',
                    textAlign: 'center',
                    marginBottom: '16px',
                }}>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 300,
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '12px',
                    }}>
                        Your Airdrop Share
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '8px',
                    }}>
                        <Coins size={32} color="var(--color-info)" />
                        <div style={{
                            fontSize: '48px',
                            fontWeight: 500,
                            fontFamily: 'Montserrat, sans-serif',
                            color: 'var(--color-info)',
                            lineHeight: 1,
                        }}>
                            {displayTokens.toLocaleString()}
                        </div>
                    </div>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: 300,
                        color: 'var(--color-text-secondary)',
                    }}>
                        $twin3 tokens
                    </div>
                </div>

                {/* Breakdown */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--color-text-dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '12px',
                    }}>
                        Calculation Breakdown
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 300,
                                color: 'var(--color-text-secondary)',
                            }}>
                                Matrix Score Bonus
                            </span>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-sans)',
                            }}>
                                {Math.round((matrixScore / 255) * 5000)} $twin3
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 300,
                                color: 'var(--color-text-secondary)',
                            }}>
                                Mission Completion (4/4)
                            </span>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-sans)',
                            }}>
                                {4 * 250} $twin3
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'rgba(139, 92, 246, 0.08)',
                            border: '1px solid rgba(139, 92, 246, 0.15)',
                        }}>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--color-text-primary)',
                            }}>
                                Total Earned
                            </span>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: 'var(--color-info)',
                                fontFamily: 'var(--font-sans)',
                            }}>
                                {tokenAmount.toLocaleString()} $twin3
                            </span>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--color-text-dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '12px',
                    }}>
                        What's Next?
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {onInviteFriends && (
                            <button
                                onClick={onInviteFriends}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: '#ffffff',
                                    border: '1px solid transparent',
                                    color: '#000000',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.border = '1px solid #ffffff';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#000000';
                                    e.currentTarget.style.border = '1px solid transparent';
                                }}
                            >
                                <Users size={16} />
                                Invite Friends & Earn More
                                <ArrowRight size={16} />
                            </button>
                        )}

                        {onJoinCommunity && (
                            <button
                                onClick={onJoinCommunity}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: 'transparent',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <Share2 size={16} />
                                Join Community
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
