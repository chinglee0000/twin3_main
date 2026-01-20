import React, { useState } from 'react';
import {
    Shield,
    ShieldCheck,
    Smartphone,
    UserCheck,
    Users,
    Wallet,
    Award,
    Puzzle,
    Fingerprint,
    Key,
    ChevronRight,
    ChevronDown,
    CheckCircle,
    LayoutGrid
} from 'lucide-react';
import { verificationMethods, calculateHumanityIndex, defaultCompletedMethods } from '../../components/HumanVerification/data/verificationMethods';
import type { VerificationMethod } from '../../components/HumanVerification/types';

// Map string icon names to components
const ICON_MAP: Record<string, React.ElementType> = {
    'ShieldCheck': ShieldCheck,
    'Smartphone': Smartphone,
    'UserCheck': UserCheck,
    'Users': Users,
    'Wallet': Wallet,
    'Award': Award,
    'Puzzle': Puzzle,
    'Fingerprint': Fingerprint,
    'Key': Key,
    'Shield': Shield // Logic might still request Shield if old data, but new data has ShieldCheck
};

export type FlowState = 'initial' | 'selecting_method' | 'verifying' | 'verification_complete' | 'matrix_view' | 'simulate_kol';

interface HumanVerificationProps {
    onClose?: () => void;
    onComplete?: (score: number) => void;
    initialScore?: number;
}

export const HumanVerification: React.FC<HumanVerificationProps> = ({
    onClose,
    onComplete,
    initialScore = calculateHumanityIndex(defaultCompletedMethods) // Use default methods to calc initial score (~135)
}) => {
    const [flowState, setFlowState] = useState<FlowState>('initial');
    const [score, setScore] = useState(initialScore);
    const [completedMethods, setCompletedMethods] = useState<string[]>(defaultCompletedMethods);
    const [expanded, setExpanded] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);

    // Filter visible methods based on expansion
    const visibleMethods = expanded ? verificationMethods : verificationMethods.slice(0, 4);
    const hiddenCount = verificationMethods.length - 4;

    const handleMethodClick = (method: VerificationMethod) => {
        if (completedMethods.includes(method.id)) return; // Prevent re-verification

        setSelectedMethod(method);
        setFlowState('verifying');

        // Simulate verification process
        setTimeout(() => {
            const newCompletedMethods = [...completedMethods, method.id];
            const newScore = calculateHumanityIndex(newCompletedMethods);

            setCompletedMethods(newCompletedMethods);
            setScore(newScore);
            setFlowState('verification_complete');
        }, 2000);
    };

    const handleVerificationComplete = () => {
        setFlowState('matrix_view');
        onComplete?.(score);
    };

    // Render Helpers
    const renderHeader = () => (
        <div className="widget-header" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '16px 20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={18} color="#8B5CF6" fill="rgba(139, 92, 246, 0.2)" />
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Verification Tasks
                    </span>
                </div>
                <div style={{
                    padding: '4px 10px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#8B5CF6',
                    letterSpacing: '0.5px'
                }}>
                    SCORE: {score}
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%' }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: '8px',
                    fontSize: '11px', fontWeight: 500, color: 'var(--color-text-dim)'
                }}>
                    <span>Humanity Index</span>
                    <span>{score} / 255</span>
                </div>
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${Math.min((score / 255) * 100, 100)}%`,
                        height: '100%',
                        background: '#8B5CF6',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                </div>
            </div>
        </div>
    );

    if (flowState === 'verifying') {
        return (
            <div className="card animate-fade-in" style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                minWidth: '320px',
                padding: 0
            }}>
                {renderHeader()}
                <div className="widget-content" style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px', height: '64px', margin: '0 auto 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            border: '3px solid rgba(139, 92, 246, 0.1)',
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            border: '3px solid #8B5CF6',
                            borderTopColor: 'transparent',
                            animation: 'spin 1s linear infinite'
                        }} />
                        {selectedMethod?.icon && React.createElement(selectedMethod.icon, {
                            size: 24,
                            color: '#8B5CF6'
                        })}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Verifying...
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        Please wait while we verify your {selectedMethod?.name}
                    </p>
                </div>
                <style>{`
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (flowState === 'verification_complete') {
        return (
            <div className="card animate-fade-in" style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                minWidth: '320px',
                padding: 0
            }}>
                {renderHeader()}
                <div className="widget-content" style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: 'rgba(139, 92, 246, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
                    }}>
                        <CheckCircle size={32} color="#8B5CF6" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Verification Successful
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                        Your Human Score has increased by {selectedMethod?.weight} points.
                    </p>
                    <button
                        onClick={handleVerificationComplete}
                        className="btn btn-primary"
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px',
                            background: '#8B5CF6', color: 'white',
                            fontWeight: 600, border: 'none', cursor: 'pointer'
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }

    if (flowState === 'matrix_view') {
        return (
            <div className="card animate-fade-in" style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                minWidth: '320px',
                padding: 0
            }}>
                {renderHeader()}
                <div className="widget-content" style={{ textAlign: 'center', padding: '32px 24px' }}>
                    <LayoutGrid size={48} color="var(--color-primary)" style={{ marginBottom: '16px', opacity: 0.8 }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Twin Matrix Unlocked
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                        You now have access to the decentralized identity matrix.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setFlowState('simulate_kol')}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'var(--color-text-primary)', cursor: 'pointer'
                            }}
                        >
                            Simulate KOL
                        </button>
                        <button
                            onClick={() => onClose?.()}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '8px',
                                background: 'var(--color-primary)',
                                border: 'none',
                                color: 'white', cursor: 'pointer'
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (flowState === 'simulate_kol') {
        return (
            <div className="card animate-fade-in" style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                minWidth: '320px',
                padding: 0
            }}>
                {renderHeader()}
                <div className="widget-content" style={{ textAlign: 'center', padding: '32px 24px' }}>
                    <Users size={48} color="#A855F7" style={{ marginBottom: '16px', opacity: 0.8 }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Simulating KOL Traffic
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                        Analyzing social graph interaction patterns...
                    </p>
                    <button
                        onClick={() => onClose?.()}
                        style={{
                            width: '100%', padding: '10px', borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--color-text-primary)', cursor: 'pointer'
                        }}
                    >
                        Close Simulation
                    </button>
                </div>
            </div>
        )
    }

    // Default: Initial / Selecting Method
    return (
        <div className="card animate-fade-in" style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            overflow: 'hidden',
            minWidth: '320px', // Ensure card width
            padding: 0
        }}>
            {renderHeader()}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {visibleMethods.map((method) => {
                    const isCompleted = completedMethods.includes(method.id);
                    return (
                        <div
                            key={method.id}
                            onClick={() => handleMethodClick(method)}
                            className="widget-list-item"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                                cursor: isCompleted ? 'default' : 'pointer',
                                transition: 'background 0.2s',
                                opacity: isCompleted ? 0.6 : 1
                            }}
                            onMouseEnter={(e) => !isCompleted && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                            onMouseLeave={(e) => !isCompleted && (e.currentTarget.style.background = 'transparent')}
                        >
                            {/* Icon Box */}
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: '12px',
                                background: isCompleted ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {isCompleted ? (
                                    <CheckCircle size={20} color="#30D158" />
                                ) : (
                                    React.createElement(ICON_MAP[method.icon] || Shield, { size: 20, color: 'var(--color-text-secondary)' })
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: '15px', fontWeight: 500, color: isCompleted ? '#30D158' : 'var(--color-text-primary)',
                                    marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    {method.name}
                                </div>
                                {/* Description removed as it's not in the type definition */}
                            </div>

                            {/* Right Points */}
                            <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {isCompleted ? (
                                    <div style={{
                                        padding: '4px 8px',
                                        background: 'rgba(48, 209, 88, 0.1)',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: '#30D158'
                                    }}>
                                        Completed
                                    </div>
                                ) : (
                                    <>
                                        <div style={{
                                            padding: '4px 8px',
                                            background: 'rgba(139, 92, 246, 0.1)',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: '#8B5CF6'
                                        }}>
                                            +{Math.round(method.weight * 255)}
                                        </div>
                                        <ChevronRight size={16} color="var(--color-text-dim)" />
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Show More */}
                {!expanded && hiddenCount > 0 && (
                    <div
                        onClick={() => setExpanded(true)}
                        style={{
                            padding: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            fontSize: '13px', color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                    >
                        Show {hiddenCount} more options
                        <ChevronDown size={14} />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 20px', display: 'flex', gap: '10px' }}>
                <button
                    style={{
                        padding: '10px 16px', borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        color: 'var(--color-text-secondary)',
                        fontSize: '13px', fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                >
                    Why do I need this?
                </button>
                <button
                    onClick={() => onClose?.()}
                    style={{
                        padding: '10px 16px', borderRadius: '10px',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--color-text-secondary)',
                        fontSize: '13px', fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
};
