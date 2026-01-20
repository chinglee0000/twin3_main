import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, Lock, LayoutGrid } from 'lucide-react';
import type { VerificationMethod, HumanityCardVariant } from '../types';
import { ANIMATION_DURATION } from '../variants';

interface HumanityStatusCardProps {
    humanityIndex: number;
    completedMethods: string[];
    availableMethods: VerificationMethod[];
    onViewMatrix: () => void;
    onAddMoreVerification?: () => void;
}

export const HumanityStatusCard: React.FC<HumanityStatusCardProps> = ({
    humanityIndex,
    completedMethods,
    availableMethods,
    onViewMatrix,
    onAddMoreVerification,
}) => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [isPulsing, setIsPulsing] = useState(false);

    const variant: HumanityCardVariant = completedMethods.length === 0 ? 'locked' : 'unlocked';
    const percentage = Math.round((humanityIndex / 255) * 100);

    // Handle unlock animation
    useEffect(() => {
        if (variant === 'unlocked') {
            // Fade out overlay
            const fadeOutTimer = setTimeout(() => {
                setShowOverlay(false);
            }, ANIMATION_DURATION.FADE_OUT);

            // Start pulse animation
            const pulseTimer = setTimeout(() => {
                setIsPulsing(true);
            }, ANIMATION_DURATION.FADE_OUT);

            // Stop pulse animation after 2 seconds
            const stopPulseTimer = setTimeout(() => {
                setIsPulsing(false);
            }, ANIMATION_DURATION.FADE_OUT + ANIMATION_DURATION.PULSE);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(pulseTimer);
                clearTimeout(stopPulseTimer);
            };
        }
    }, [variant]);

    const completedMethodsList = availableMethods.filter(m =>
        completedMethods.includes(m.id)
    );
    const remainingMethods = availableMethods.filter(m =>
        !completedMethods.includes(m.id)
    );

    return (
        <div style={{
            padding: '24px',
            position: 'relative',
        }}>
            {/* Locked overlay */}
            {variant === 'locked' && showOverlay && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    zIndex: 10,
                    transition: `opacity ${ANIMATION_DURATION.FADE_OUT}ms ease-out`,
                }}>
                    <div style={{
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)',
                    }}>
                        <Lock size={32} style={{ marginBottom: '12px', opacity: 0.6 }} />
                        <p style={{ fontSize: '14px' }}>完成驗證以解鎖</p>
                    </div>
                </div>
            )}

            {/* Score display */}
            <div style={{
                textAlign: 'center',
                marginBottom: '24px',
            }}>
                <div style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                }}>
                    {humanityIndex}
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 400,
                        color: 'var(--color-text-dim)',
                    }}>/255</span>
                </div>
                <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '8px',
                }}>
                    Humanity Index
                </p>

                {/* Progress bar */}
                <div style={{
                    marginTop: '16px',
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-out',
                    }} />
                </div>
                <p style={{
                    fontSize: '12px',
                    color: 'var(--color-text-dim)',
                    marginTop: '8px',
                }}>
                    {percentage}% 完成
                </p>
            </div>

            {/* Completed verifications */}
            {completedMethodsList.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-text-dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px',
                    }}>
                        已完成驗證
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {completedMethodsList.map(method => (
                            <div
                                key={method.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '10px',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}>
                                    <CheckCircle size={16} color="#22c55e" />
                                    <span style={{
                                        fontSize: '14px',
                                        color: '#22c55e',
                                        fontWeight: 500,
                                    }}>
                                        {method.name}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '13px',
                                    color: '#22c55e',
                                    fontWeight: 600,
                                }}>
                                    +{Math.round(method.weight * 255)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Remaining verifications */}
            {remainingMethods.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--color-text-dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <Info size={12} />
                        可用驗證方式
                    </h4>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                    }}>
                        {remainingMethods.slice(0, 4).map(method => (
                            <span
                                key={method.id}
                                style={{
                                    padding: '6px 12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    color: 'var(--color-text-secondary)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '140px',
                                }}
                                title={method.name} // 添加 tooltip 顯示完整名稱
                            >
                                {method.name}
                            </span>
                        ))}
                        {remainingMethods.length > 4 && (
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '20px',
                                fontSize: '12px',
                                color: 'var(--color-text-dim)',
                            }}>
                                +{remainingMethods.length - 4} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
                {onAddMoreVerification && (
                    <button
                        onClick={onAddMoreVerification}
                        className="btn-ghost"
                        style={{
                            flex: 1,
                            padding: '10px 16px',
                            borderRadius: '12px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Add Verification
                    </button>
                )}
                <button
                    onClick={onViewMatrix}
                    disabled={variant === 'locked'}
                    className={variant === 'unlocked' ? 'btn-primary' : ''}
                    style={{
                        flex: 2,
                        padding: '10px 16px',
                        borderRadius: '12px',
                        background: variant === 'unlocked'
                            ? '#ffffff'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: variant === 'unlocked'
                            ? '1px solid transparent'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        color: variant === 'unlocked' ? '#000000' : 'var(--color-text-dim)',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: variant === 'unlocked' ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        animation: isPulsing ? 'pulse 1s ease-in-out infinite' : 'none',
                    }}
                    onMouseEnter={(e) => {
                        if (variant === 'unlocked') {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.border = '1px solid #ffffff';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (variant === 'unlocked') {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.border = '1px solid transparent';
                        }
                    }}
                >
                    <LayoutGrid size={16} />
                    View My Matrix
                </button>
            </div>

            {/* Pulse animation keyframes */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
                    50% { transform: scale(1.02); box-shadow: 0 0 20px 4px rgba(139, 92, 246, 0.3); }
                }
            `}</style>
        </div>
    );
};
