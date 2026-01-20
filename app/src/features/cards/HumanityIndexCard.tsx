import React from 'react';
import { Lock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { verificationMethods } from '../../components/HumanVerification/data/verificationMethods';

// ============================================================
// Types
// ============================================================

interface HumanityIndexCardProps {
    currentScore: number;
    maxScore: number;
    completedMethodIds: string[];
    onUnlock: () => void;
}

// ============================================================
// Internal Components
// ============================================================

function ProgressBar({ value }: { value: number; max?: number }) {
    const percentage = Math.min(100, Math.max(0, (value / 255) * 100));

    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '24px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '8px'
            }}>
                <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                }}>
                    HUMANITY INDEX
                </span>
                <div>
                    <span style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                    }}>
                        {Math.round(value)}
                    </span>
                    <span style={{
                        fontSize: '14px',
                        color: 'var(--color-text-dim)',
                        marginLeft: '4px'
                    }}>
                        /255
                    </span>
                </div>
            </div>

            {/* Bar Container */}
            <div style={{
                width: '100%',
                height: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)'
            }}>
                {/* Fill */}
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: '#8B5CF6',
                    borderRadius: '6px',
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                }} />
            </div>
        </div>
    );
}

// ============================================================
// Main Component
// ============================================================

export const HumanityIndexCard: React.FC<HumanityIndexCardProps> = ({
    currentScore,
    maxScore,
    completedMethodIds,
    onUnlock
}) => {
    const isUnlocked = currentScore > 0; // Simple unlock logic based on score > 0 for demo

    // Sort methods: Completed first
    const completedMethods = verificationMethods.filter(m => completedMethodIds.includes(m.id));
    const availableMethods = verificationMethods.filter(m => !completedMethodIds.includes(m.id)).slice(0, 5); // Show top 5 available

    return (
        <div className="card" style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
            <ProgressBar value={currentScore} max={maxScore} />

            {/* Completed Section */}
            {completedMethods.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Completed Verifications
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {completedMethods.map(method => (
                            <div key={method.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 12px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '8px',
                                border: '1px solid rgba(139, 92, 246, 0.2)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle2 size={16} color="#8B5CF6" />
                                    <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                                        {method.name}
                                    </span>
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B5CF6' }}>
                                    +{Math.round(method.weight * 255)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Available Section */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                    <h4 style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Available Verifications
                    </h4>
                    <div style={{
                        fontSize: '10px',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <ShieldCheck size={12} />
                        <span>Increase Trust Score</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {availableMethods.map(method => (
                        <div key={method.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                                <Lock size={14} color="var(--color-text-secondary)" />
                                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                    {method.name}
                                </span>
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-dim)' }}>
                                +{Math.round(method.weight * 255)}
                            </span>
                        </div>
                    ))}
                    {verificationMethods.length - completedMethods.length > 5 && (
                        <div style={{
                            textAlign: 'center',
                            fontSize: '12px',
                            color: 'var(--color-text-dim)',
                            paddingTop: '8px'
                        }}>
                            +{verificationMethods.length - completedMethods.length - 5} more methods available
                        </div>
                    )}
                </div>
            </div>

            {/* Action Button */}
            <button
                disabled={!isUnlocked}
                onClick={onUnlock}
                style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isUnlocked
                        ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                    color: isUnlocked ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isUnlocked ? '0 8px 32px rgba(139, 92, 246, 0.4)' : 'none',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {isUnlocked ? (
                    <>
                        <span>View My Twin Matrix</span>
                        <ArrowRight size={20} />
                    </>
                ) : (
                    <>
                        <Lock size={18} />
                        <span>Complete verification to unlock</span>
                    </>
                )}

                {/* Shine effect for unlocked state */}
                {isUnlocked && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transform: 'skewX(-20deg)',
                        animation: 'shine 3s infinite'
                    }} />
                )}
            </button>
            <style>
                {`
                @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }
                `}
            </style>
        </div>
    );
};
