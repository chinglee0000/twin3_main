import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, X, PartyPopper } from 'lucide-react';

interface WelcomeMemberModalProps {
    memberNumber: number;
    onClose: () => void;
}

export const WelcomeMemberModal: React.FC<WelcomeMemberModalProps> = ({
    memberNumber,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Fade in animation
        setTimeout(() => setIsVisible(true), 100);
        
        // Show confetti effect
        setTimeout(() => setShowConfetti(true), 300);
    }, []);

    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US');
    };

    const getOrdinalSuffix = (num: number) => {
        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return 'th';
        }
        
        switch (lastDigit) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '16px',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(40px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.2)',
                    overflow: 'hidden',
                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Confetti Background Effect */}
                {showConfetti && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                >
                    <X size={18} />
                </button>

                {/* Content */}
                <div style={{
                    padding: '48px 32px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px',
                }}>
                    {/* Icon */}
                    <div style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                    }}>
                        {/* Pulse rings */}
                        <div style={{
                            position: 'absolute',
                            inset: '-12px',
                            borderRadius: '50%',
                            border: '2px solid rgba(139, 92, 246, 0.3)',
                            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        }} />
                        <div style={{
                            position: 'absolute',
                            inset: '-24px',
                            borderRadius: '50%',
                            border: '2px solid rgba(139, 92, 246, 0.2)',
                            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
                        }} />
                        
                        {/* Main icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.3))',
                            border: '2px solid rgba(139, 92, 246, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            <Trophy size={40} color="var(--color-info)" />
                        </div>
                    </div>

                    {/* Title */}
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}>
                            <Sparkles size={20} color="var(--color-info)" />
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: 'var(--color-text-primary)',
                                margin: 0,
                            }}>
                                Congratulations!
                            </h2>
                            <Sparkles size={20} color="var(--color-info)" />
                        </div>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--color-text-secondary)',
                            margin: 0,
                            lineHeight: 1.6,
                        }}>
                            You've successfully joined the twin3 community
                        </p>
                    </div>

                    {/* Member Number Card */}
                    <div style={{
                        width: '100%',
                        padding: '24px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15))',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--color-text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '12px',
                        }}>
                            You are the
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            gap: '4px',
                            marginBottom: '8px',
                        }}>
                            <span style={{
                                fontSize: '48px',
                                fontWeight: 700,
                                color: 'var(--color-info)',
                                fontFamily: 'var(--font-sans)',
                                lineHeight: 1,
                            }}>
                                {formatNumber(memberNumber)}
                            </span>
                            <span style={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'var(--color-info)',
                                marginBottom: '8px',
                            }}>
                                {getOrdinalSuffix(memberNumber)}
                            </span>
                        </div>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--color-text-secondary)',
                        }}>
                            verified member
                        </div>
                    </div>

                    {/* Message */}
                    <div style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}>
                            <PartyPopper size={18} color="var(--color-info)" />
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                            }}>
                                Welcome to twin3!
                            </span>
                        </div>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            margin: 0,
                            lineHeight: 1.6,
                        }}>
                            Your SBT has been minted and your journey begins now. Explore your twin Matrix and start earning rewards!
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onClose}
                        style={{
                            width: '100%',
                            padding: '14px 24px',
                            borderRadius: '12px',
                            background: 'var(--color-primary)',
                            border: 'none',
                            color: '#000000',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Let's Get Started
                        <Sparkles size={18} />
                    </button>
                </div>

                {/* Keyframes for animations */}
                <style>{`
                    @keyframes pulse-ring {
                        0%, 100% { 
                            transform: scale(0.95);
                            opacity: 1;
                        }
                        50% { 
                            transform: scale(1.05);
                            opacity: 0.3;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};
