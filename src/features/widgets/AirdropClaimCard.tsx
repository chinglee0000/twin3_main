import React, { useState } from 'react';
import { Trophy, Sparkles, ArrowRight, Lock, ChevronRight } from 'lucide-react';

interface AirdropClaimCardProps {
    score: number;
    threshold?: number;
    onClaim?: () => void;
    onGoBack?: () => void;
    hasClaimed?: boolean;
}

export const AirdropClaimCard: React.FC<AirdropClaimCardProps> = ({
    score,
    threshold = 100,
    onClaim,
    onGoBack,
    hasClaimed = false,
}) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [claimed, setClaimed] = useState(hasClaimed);
    const canClaim = score >= threshold && !claimed;
    const locked = score < threshold;

    const handleClaim = () => {
        if (!canClaim) return;
        setClaimed(true);
        setShowConfetti(true);
        onClaim?.();
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const cardStyle: React.CSSProperties = {
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '400px',
        margin: window.innerWidth < 768 ? '0 auto' : '0',
        position: 'relative',
    };

    // ─── Locked State ────────────────────────────────────
    if (locked) {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={20} color="#6b7280" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                            Airdrop Locked
                        </span>
                    </div>
                </div>

                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(107, 114, 128, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        <Lock size={28} color="#6b7280" />
                    </div>

                    <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '8px',
                    }}>
                        Score Required: {threshold}/255
                    </div>

                    <div style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '16px',
                    }}>
                        Your current score: <span style={{ color: 'var(--color-info)', fontWeight: 600 }}>{score}/255</span>
                        <br />
                        Complete more verifications to unlock the airdrop.
                    </div>

                    {/* Progress toward threshold */}
                    <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                    }}>
                        <div style={{
                            width: `${Math.min((score / threshold) * 100, 100)}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--color-info), #7c3aed)',
                            borderRadius: '3px',
                            transition: 'width 0.5s ease',
                        }} />
                    </div>

                    {onGoBack && (
                        <button
                            onClick={onGoBack}
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
                            <ChevronRight size={16} />
                            Complete More Verifications
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // ─── Claimed State ──────────────────────────────────
    if (claimed) {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                {/* Confetti overlay */}
                {showConfetti && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: 'none',
                        overflow: 'hidden',
                        zIndex: 10,
                    }}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-confetti"
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    left: `${Math.random() * 100}%`,
                                    width: `${6 + Math.random() * 6}px`,
                                    height: `${6 + Math.random() * 6}px`,
                                    background: ['#8b5cf6', '#22c55e', '#3b82f6', '#ec4899', '#a78bfa'][i % 5],
                                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    animationDuration: `${1.5 + Math.random()}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    background: 'linear-gradient(135deg, rgba(20, 60, 30, 0.5), rgba(15, 50, 25, 0.5))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy size={20} color="var(--color-info)" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#22c55e' }}>
                            Airdrop Claimed!
                        </span>
                    </div>
                </div>

                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(34, 197, 94, 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}>
                        <Sparkles size={32} color="var(--color-info)" />
                    </div>

                    <div style={{
                        fontSize: '24px',
                        fontWeight: 800,
                        color: 'var(--color-info)',
                        marginBottom: '4px',
                        fontFamily: 'var(--font-sans)',
                    }}>
                        +500 $twin3
                    </div>

                    <div style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '20px',
                    }}>
                        Successfully claimed your Airdrop reward!
                    </div>

                    <button
                        onClick={() => onGoBack?.()}
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
                    >
                        <ArrowRight size={16} />
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // ─── Ready to Claim ─────────────────────────────────
    return (
        <div className="card animate-fade-in" style={cardStyle}>
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'linear-gradient(135deg, rgba(40, 50, 20, 0.5), rgba(30, 40, 15, 0.5))',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trophy size={20} color="var(--color-info)" />
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Airdrop Available!
                    </span>
                </div>
                <p style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '8px',
                }}>
                    You've reached the required score. Claim your $twin3 tokens now!
                </p>
            </div>

            <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                <div style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: 'var(--color-info)',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-sans)',
                }}>
                    500 $twin3
                </div>
                <div style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px',
                }}>
                    Humanity Score: {score}/255
                </div>

                <button
                    onClick={handleClaim}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--color-info), #7c3aed)',
                        border: 'none',
                        color: '#000000',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <Sparkles size={18} />
                    Claim Airdrop
                </button>
            </div>
        </div>
    );
};
