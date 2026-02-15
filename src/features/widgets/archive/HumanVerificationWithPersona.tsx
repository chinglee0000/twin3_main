import React, { useState, useCallback, useEffect } from 'react';
import { Shield, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

// Import from HumanVerification module
import {
    WIDGET_STATES,
    ANIMATION_DURATION,
    verificationMethods,
} from '../human-verification';
import type { FlowState, VerificationMethod } from '../human-verification/components/types';

// Import sub-components (removed HumanityStatusCard - not needed)
import { VerificationOptions } from '../human-verification/components/VerificationOptions';
import { VerificationLoader } from '../human-verification/components/VerificationLoader';

// Import TwinMatrixCard (16x16 grid)
import { TwinMatrixCard } from '../twin-matrix/TwinMatrixCard';
import {
    initialMatrixData,
    travelKOLMatrixData,
} from '../../data/profiles';
import type { TwinMatrixData } from '../twin-matrix/types';

interface HumanVerificationProps {
    onClose?: () => void;
    onComplete?: (score: number) => void;
    initialScore?: number;
}

export const HumanVerification: React.FC<HumanVerificationProps> = ({
    onClose,
    onComplete,
    initialScore = 0,
}) => {
    // Start directly at method selection - no need to ask again
    const [flowState, setFlowState] = useState<FlowState>(WIDGET_STATES.SELECTING);
    const [score, setScore] = useState(initialScore);
    const [displayScore, setDisplayScore] = useState(initialScore);
    const [completedMethods, setCompletedMethods] = useState<string[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
    const [matrixData, setMatrixData] = useState<TwinMatrixData>(initialMatrixData);

    // Animate score changes
    useEffect(() => {
        let startTime: number;
        let animationFrameId: number;
        const startScore = displayScore;
        const targetScore = score;

        if (startScore === targetScore) return;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const duration = 1500; // 1.5 seconds

            if (progress < duration) {
                // Ease out cubic
                const ratio = 1 - Math.pow(1 - progress / duration, 3);
                const current = startScore + (targetScore - startScore) * ratio;
                setDisplayScore(current);
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayScore(targetScore);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [score]);

    // Method selection handler
    const handleMethodSelect = useCallback((methodId: string) => {
        const method = verificationMethods.find(m => m.id === methodId);
        if (!method || completedMethods.includes(methodId)) return;

        setSelectedMethod(method);
        setFlowState(WIDGET_STATES.VERIFYING);
    }, [completedMethods]);

    const handleVerificationComplete = useCallback(() => {
        if (!selectedMethod) return;

        // 20% chance of failure for POC demo
        const shouldFail = Math.random() < 0.2;
        if (shouldFail) {
            setFlowState(WIDGET_STATES.WIDGET_FAILED);
            return;
        }

        // Add to completed methods
        const newCompletedMethods = [...completedMethods, selectedMethod.id];
        setCompletedMethods(newCompletedMethods);

        // Calculate new score based on completed weights
        // Formula: score = Σ(weight_i) × 255
        const totalWeight = newCompletedMethods.reduce((sum, id) => {
            const method = verificationMethods.find(m => m.id === id);
            return sum + (method?.weight || 0);
        }, 0);
        const newScore = Math.round(Math.min(totalWeight, 1.0) * 255);
        setScore(newScore);

        // Update matrix data with new score
        const updatedMatrixData = {
            ...initialMatrixData,
            humanityIndex: newScore,
            avgStrength: Math.round((newScore / 255) * 100),
            dimensions: {
                ...initialMatrixData.dimensions,
                physical: {
                    ...initialMatrixData.dimensions.physical,
                    percentage: Math.round((newScore / 255) * 100),
                    discovered: Math.max(initialMatrixData.dimensions.physical.discovered, newScore > 0 ? 1 : 0)
                }
            },
            traits: initialMatrixData.traits.map(trait =>
                trait.id === '00' ? { ...trait, strength: newScore, discovered: true } : trait
            )
        };
        setMatrixData(updatedMatrixData);

        // Return to options list (user can do more verifications)
        setTimeout(() => {
            setFlowState(WIDGET_STATES.SELECTING);
            setSelectedMethod(null);
            onComplete?.(newScore);
        }, ANIMATION_DURATION.FADE_IN);
    }, [selectedMethod, completedMethods, onComplete]);

    // Failure handlers
    const handleRetryVerification = useCallback(() => {
        setFlowState(WIDGET_STATES.VERIFYING);
    }, []);

    const handlePickAnother = useCallback(() => {
        setSelectedMethod(null);
        setFlowState(WIDGET_STATES.SELECTING);
    }, []);

    const handleViewMatrix = useCallback(() => {
        setFlowState(WIDGET_STATES.MATRIX_VIEW);

        // 滾動到 Twin Matrix 卡片
        setTimeout(() => {
            const matrixElement = document.querySelector('[data-twin-matrix]');
            if (matrixElement) {
                matrixElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100); // 等待 DOM 更新後再滾動
    }, []);

    const handleSimulateKOL = useCallback(() => {
        setMatrixData(travelKOLMatrixData);
        setFlowState(WIDGET_STATES.SIMULATE_KOL);
    }, []);

    const handleBackToMyMatrix = useCallback(() => {
        setMatrixData(initialMatrixData);
        setFlowState(WIDGET_STATES.MATRIX_VIEW);
    }, []);

    // Render header with progress bar
    const renderHeader = () => (
        <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '96px',
                height: '96px',
                background: 'rgba(255, 255, 255, 0.05)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />

            {/* Title row */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={20} color="#ffffff" />
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.2,
                    }}>
                        Verify Humanity
                    </div>
                </div>
                {/* Score badge */}
                <div style={{
                    padding: '4px 10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: '#ffffff',
                }}>
                    SCORE: {Math.round(displayScore)}
                </div>
            </div>

            {/* Progress bar 0-255 */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                padding: '0 4px', // 與 header 內容對齊
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '6px',
                }}>
                    <span>Humanity Index</span>
                    <span style={{ fontWeight: 600 }}>{Math.round(displayScore)}/255</span>
                </div>
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        width: `${(displayScore / 255) * 100}%`,
                        height: '100%',
                        background: '#ffffff',
                        borderRadius: '3px',
                        transition: 'width 0.5s ease',
                    }} />
                </div>
            </div>
        </div>
    );

    // Card wrapper styles with responsive alignment
    const cardStyle: React.CSSProperties = {
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '380px',
        // Mobile: 置中, Desktop/Laptop: 靠左
        margin: window.innerWidth < 768 ? '0 auto' : '0',
    };

    // Method selection state - STARTS HERE (no initial "prove" step)
    if (flowState === WIDGET_STATES.SELECTING) {
        return (
            <div className="card animate-fade-in" style={cardStyle}>

                {renderHeader()}
                <div style={{ padding: '8px 0' }}>
                    <VerificationOptions
                        methods={verificationMethods}
                        completedMethods={completedMethods}
                        onSelect={handleMethodSelect}
                    />
                </div>
                {/* Footer buttons */}
                <div style={{
                    padding: '12px 20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    gap: '10px',
                }}>
                    {/* View My Matrix button - shows when at least one verification is complete */}
                    {completedMethods.length > 0 && (
                        <button
                            onClick={handleViewMatrix}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: '12px',
                                background: '#ffffff',
                                border: '1px solid transparent',
                                color: '#000000',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.border = '1px solid #ffffff';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.color = '#000000';
                                e.currentTarget.style.border = '1px solid transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            View My Matrix
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            style={{
                                flex: completedMethods.length > 0 ? 'none' : 1,
                                padding: completedMethods.length > 0 ? '12px 16px' : '10px',
                                borderRadius: completedMethods.length > 0 ? '10px' : '8px',
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'var(--color-text-secondary)',
                                fontSize: '13px',
                                cursor: 'pointer',
                            }}
                        >
                            {completedMethods.length > 0 ? 'Later' : 'Skip for now'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Verifying state
    if (flowState === WIDGET_STATES.VERIFYING) {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                {renderHeader()}
                <VerificationLoader
                    methodName={selectedMethod?.name || 'Google reCAPTCHA v3'}
                    onComplete={handleVerificationComplete}
                />
            </div>
        );
    }

    // Widget failed state
    if (flowState === WIDGET_STATES.WIDGET_FAILED) {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    background: 'linear-gradient(135deg, rgba(80, 30, 20, 0.5), rgba(60, 20, 15, 0.5))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={20} color="#f59e0b" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>
                            Verification Failed
                        </span>
                    </div>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginTop: '8px',
                        lineHeight: 1.5,
                    }}>
                        {selectedMethod?.name || 'Verification'} could not be completed. This can happen due to network issues or service unavailability.
                    </p>
                </div>

                <div style={{
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <button
                        onClick={handleRetryVerification}
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
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>

                    <button
                        onClick={handlePickAnother}
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
                    >
                        <ArrowLeft size={16} />
                        Pick Another Method
                    </button>
                </div>
            </div>
        );
    }

    // Matrix view state - Using 16x16 TwinMatrixCard (appears below verification card)
    if (flowState === WIDGET_STATES.MATRIX_VIEW) {
        return (
            <div className="animate-fade-in" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
                maxWidth: '500px', // 確保有足夠寬度給 Twin Matrix
                // Mobile: 置中, Desktop/Laptop: 靠左
                alignItems: window.innerWidth < 768 ? 'center' : 'flex-start',
            }}>
                {/* 保留原本的 Verification Tasks 卡片 */}
                <div className="card" style={{
                    ...cardStyle,
                    maxWidth: '380px', // Verification card 保持較小寬度
                }}>
                    {renderHeader()}
                    <div style={{ padding: '8px 0' }}>
                        <VerificationOptions
                            methods={verificationMethods}
                            completedMethods={completedMethods}
                            onSelect={handleMethodSelect}
                        />
                    </div>
                    {/* Footer buttons */}
                    <div style={{
                        padding: '12px 20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        gap: '10px',
                    }}>
                        {/* View My Matrix button - now shows "Hide Matrix" */}
                        {completedMethods.length > 0 && (
                            <button
                                onClick={() => setFlowState(WIDGET_STATES.SELECTING)}
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                Hide Matrix
                            </button>
                        )}
                        {onClose && (
                            <button
                                onClick={onClose}
                                style={{
                                    flex: completedMethods.length > 0 ? 'none' : 1,
                                    padding: completedMethods.length > 0 ? '12px 16px' : '10px',
                                    borderRadius: completedMethods.length > 0 ? '10px' : '8px',
                                    background: 'transparent',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >
                                {completedMethods.length > 0 ? 'Later' : 'Skip for now'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Twin Matrix Card 接著出現 - 給它完整寬度 */}
                <div data-twin-matrix style={{ width: '100%' }}>
                    <TwinMatrixCard
                        data={matrixData}
                        onExplore={handleSimulateKOL} // 直接跳轉到 KOL 模擬
                    />
                </div>
            </div>
        );
    }

    // Simulate KOL state
    if (flowState === WIDGET_STATES.SIMULATE_KOL) {
        return (
            <div className="animate-fade-in" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
                maxWidth: '500px',
                // Mobile: 置中, Desktop/Laptop: 靠左
                margin: window.innerWidth < 768 ? '0 auto' : '0',
            }}>


                {/* KOL's Twin Matrix - 16x16 grid with multiple traits */}
                <TwinMatrixCard
                    data={matrixData}
                    onExplore={handleBackToMyMatrix} // KOL 狀態下點擊返回自己的 Matrix
                />
            </div>
        );
    }

    return null;
};
