import React, { useState, useEffect } from 'react';
import { Fingerprint, RefreshCw, Lock } from 'lucide-react';
import { ANIMATION_DURATION } from '../variants';

interface VerificationStep {
    id: string;
    label: string;
    status: 'pending' | 'active' | 'completed';
}

interface VerificationLoaderProps {
    methodName: string;
    onComplete: () => void;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({
    methodName,
    onComplete,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<VerificationStep[]>([
        { id: 'connection', label: 'Establishing secure connection...', status: 'active' },
        { id: 'fingerprint', label: 'Checking device fingerprint...', status: 'pending' },
        { id: 'score', label: 'Calculating score bonus...', status: 'pending' },
    ]);

    useEffect(() => {
        const stepDuration = ANIMATION_DURATION.VERIFICATION / 3;

        // Step 1 -> Step 2
        const timer1 = setTimeout(() => {
            setCurrentStep(1);
            setSteps(prev => prev.map((s, i) => ({
                ...s,
                status: i === 0 ? 'completed' : i === 1 ? 'active' : 'pending'
            })));
        }, stepDuration);

        // Step 2 -> Step 3
        const timer2 = setTimeout(() => {
            setCurrentStep(2);
            setSteps(prev => prev.map((s, i) => ({
                ...s,
                status: i <= 1 ? 'completed' : 'active'
            })));
        }, stepDuration * 2);

        // Complete
        const timer3 = setTimeout(() => {
            setSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
            setTimeout(onComplete, 300);
        }, ANIMATION_DURATION.VERIFICATION);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    // Generate a random session ID
    const sessionId = `#TM-${Math.floor(1000 + Math.random() * 9000)}`;

    return (
        <div style={{
            padding: '0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}>
            {/* Main verification card content (flattened) */}
            <div style={{
                padding: '20px',
                marginBottom: '16px',
            }}>
                {/* Header with spinning fingerprint */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    marginBottom: '24px',
                }}>
                    {/* Spinning icon container */}
                    <div style={{
                        position: 'relative',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                    }}>
                        {/* Background circle */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'rgba(139, 92, 246, 0.08)',
                        }} />
                        {/* Static border */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '2px solid rgba(139, 92, 246, 0.15)',
                        }} />
                        {/* Spinning border */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '2px solid transparent',
                            borderTopColor: '#8B5CF6',
                            animation: 'spin 1s linear infinite',
                        }} />
                        {/* Icon */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Fingerprint size={22} color="#8B5CF6" />
                        </div>
                    </div>

                    {/* Title and description */}
                    <div style={{ flex: 1, width: '100%' }}>
                        <h3 style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            marginBottom: '4px',
                            lineHeight: 1.3,
                        }}>
                            Verification in Progress
                        </h3>
                        <p style={{
                            fontSize: '12px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.5,
                            width: '100%',
                        }}>
                            Please keep this window open while we secure your session.
                        </p>
                    </div>
                </div>

                {/* Steps with connecting line */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                    position: 'relative',
                    paddingLeft: '6px',
                }}>
                    {/* Connecting line */}
                    <div style={{
                        position: 'absolute',
                        left: '6px',
                        top: '14px',
                        width: '1px',
                        height: 'calc(100% - 28px)',
                        background: 'rgba(255, 255, 255, 0.1)',
                    }} />

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 0',
                                position: 'relative',
                                zIndex: 1,
                                opacity: step.status === 'pending' ? 0.5 : 1,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            {/* Step indicator dot */}
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: 'var(--glass-bg)',
                                border: `2px solid ${step.status === 'completed' ? '#30D158' :
                                    step.status === 'active' ? '#8B5CF6' :
                                        'rgba(255, 255, 255, 0.2)'
                                    }`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'border-color 0.3s ease',
                            }}>
                                <div style={{
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: step.status === 'completed' ? '#30D158' :
                                        step.status === 'active' ? '#8B5CF6' :
                                            'rgba(255, 255, 255, 0.2)',
                                    transition: 'background 0.3s ease',
                                }} />
                            </div>

                            {/* Step label */}
                            <span style={{
                                fontSize: '13px',
                                fontWeight: step.status === 'active' ? 500 : 400,
                                color: step.status === 'pending'
                                    ? 'var(--color-text-dim)'
                                    : 'var(--color-text-primary)',
                                flex: 1,
                                transition: 'color 0.3s ease',
                            }}>
                                {step.label}
                            </span>

                            {/* Status icon */}
                            {step.status === 'active' && (
                                <RefreshCw
                                    size={14}
                                    color="#8B5CF6"
                                    style={{ animation: 'spin 1s linear infinite' }}
                                />
                            )}
                            {step.status === 'completed' && (
                                <span style={{
                                    fontSize: '12px',
                                    color: '#30D158',
                                }}>✓</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* System details section */}
            <div style={{
                padding: '0 24px',
                marginBottom: '16px',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <div style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'var(--color-text-dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        paddingBottom: '6px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                        System Details
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                    }}>
                        <span style={{ color: 'var(--color-text-dim)' }}>Session ID</span>
                        <span style={{
                            color: 'var(--color-text-primary)',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                        }}>{sessionId}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                    }}>
                        <span style={{ color: 'var(--color-text-dim)' }}>Security</span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#8B5CF6',
                        }}>
                            <Lock size={11} />
                            <span style={{ fontSize: '11px' }}>E2E Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer status bar */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '10px 14px',
                margin: '0 20px 20px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                <RefreshCw
                    size={14}
                    color="var(--color-text-dim)"
                    style={{ animation: 'spin 2s linear infinite' }}
                />
                <span style={{
                    fontSize: '12px',
                    color: 'var(--color-text-dim)',
                    fontStyle: 'italic',
                }}>
                    Processing verification...
                </span>
            </div>

            {/* Keyframes for spin animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
