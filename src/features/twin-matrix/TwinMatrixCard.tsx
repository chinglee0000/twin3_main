/**
 * Twin Matrix Card Component
 * 
 * A 16x16 grid visualization showing user's trait matrix across 4 dimensions:
 * - Physical (rows 0-7, cols 0-7): Red #D02800
 * - Digital (rows 0-7, cols 8-15): Blue #3F88C5
 * - Social (rows 8-15, cols 0-7): Yellow #FFBA08
 * - Spiritual (rows 8-15, cols 8-15): Teal #1A9E8F
 */
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Info, X } from 'lucide-react';
import type { MatrixTrait } from './types';
import { TwinMatrixModal } from './TwinMatrixModal';
import { TwinMatrixGrid, ProgressBar, MatrixTooltip } from './components';
import { useMatrixData } from '../../store/appStore';

// ============================================================
// Main Twin Matrix Card Component
// ============================================================

interface TwinMatrixCardProps {
    onExplore?: () => void;
}

export const TwinMatrixCard: React.FC<TwinMatrixCardProps> = ({ onExplore }) => {
    // Use global matrix data from store
    const data = useMatrixData();
    
    const [selectedTrait, setSelectedTrait] = useState<MatrixTrait | null>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const dimensionColors = {
        physical: '#D02800',
        social: '#FFBA08',
        digital: '#3F88C5',
        spiritual: '#1A9E8F',
    };

    // Detect touch device or mobile width
    useEffect(() => {
        const checkTouchDevice = () => {
            const hasHover = window.matchMedia('(hover: hover)').matches;
            const hasPointer = window.matchMedia('(pointer: fine)').matches;
            const isSmallScreen = window.innerWidth < 1024;
            setIsTouchDevice(!hasHover || !hasPointer || isSmallScreen);
        };
        checkTouchDevice();

        const hoverQuery = window.matchMedia('(hover: hover)');
        hoverQuery.addEventListener('change', checkTouchDevice);
        window.addEventListener('resize', checkTouchDevice);

        return () => {
            hoverQuery.removeEventListener('change', checkTouchDevice);
            window.removeEventListener('resize', checkTouchDevice);
        };
    }, []);

    // Add CSS for fade-in animation if not already present
    useEffect(() => {
        const styleId = 'tooltip-animations';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes fade-in {
                    from { opacity: 0; transform: translate(-50%, -100%) scale(0.95); }
                    to { opacity: 1; transform: translate(-50%, -100%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <div
            className="card"
            style={{
                width: '100%',
                maxWidth: '480px',
                padding: 0,
                overflow: 'visible',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '16px 20px 12px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            margin: 0,
                            fontFamily: 'Montserrat, Inter, sans-serif',
                        }}
                    >
                        Twin Matrix Growth
                    </h3>
                    <MatrixTooltip
                        disabled={isTouchDevice}
                        content={
                            <div style={{ maxWidth: '200px', whiteSpace: 'normal', fontSize: '13px' }}>
                                Your Twin Matrix represents your unique human experience profile across 256 dimensions, organized into 4 key areas: Physical, Social, Digital, and Spiritual traits.
                            </div>
                        }
                    >
                        <button
                            type="button"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            aria-label="Matrix information"
                            onClick={() => {
                                if (isTouchDevice) {
                                    setShowInfoModal(true);
                                }
                            }}
                        >
                            <Info size={14} color="var(--color-text-secondary)" />
                        </button>
                    </MatrixTooltip>
                </div>
                <p
                    style={{
                        fontSize: '14px',
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                        fontWeight: 300,
                    }}
                >
                    {data.discoveredTraits} / {data.totalTraits} Traits Discovered
                </p>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
                {/* Twin Matrix Completion */}
                <div style={{ marginBottom: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            marginBottom: '8px',
                        }}
                    >
                        <span style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>
                            Twin Matrix Completion
                        </span>
                        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                            {data.journeyProgress}%
                        </span>
                    </div>
                    <ProgressBar
                        value={data.journeyProgress}
                        color="#ffffff"
                    />
                </div>

                {/* Matrix Grid Visualization */}
                <TwinMatrixGrid
                    data={data}
                    isTouchDevice={isTouchDevice}
                    onCellClick={(trait) => setSelectedTrait(trait)}
                />

                {/* Dimension Progress Bars - Quadrant Order */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginTop: '16px',
                    }}
                >
                    {(['physical', 'digital', 'social', 'spiritual'] as const).map((key) => {
                        const dim = data.dimensions[key];
                        const color = dimensionColors[key];
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        
                        // Use the percentage from dimensions data (calculated based on trait strengths)
                        const percentage = dim.percentage;
                        const score255 = Math.round((percentage / 100) * 255);

                        return (
                            <div key={key}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        marginBottom: '6px',
                                    }}
                                >
                                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                        {label}
                                    </span>
                                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>
                                        {score255}/255
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1 }}>
                                        <ProgressBar value={percentage} color={percentage < 5 ? '#374151' : color} />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            color: 'var(--color-text-primary)',
                                            minWidth: '32px',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Explore Button */}
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => onExplore?.()}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
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
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = '#000000';
                            e.currentTarget.style.border = '1px solid transparent';
                        }}
                    >
                        Boost Your Score
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Mobile Modal for Trait Details */}
            <TwinMatrixModal
                trait={selectedTrait}
                onClose={() => setSelectedTrait(null)}
            />

            {/* Mobile Info Modal */}
            {showInfoModal && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        animation: 'fadeIn 0.15s ease-out',
                    }}
                    onClick={() => setShowInfoModal(false)}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '320px',
                            background: 'rgba(28, 28, 30, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '24px',
                            position: 'relative',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                            animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowInfoModal(false)}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-secondary, #9CA3AF)',
                            }}
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Info size={20} color="var(--color-text-primary)" />
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>
                                About Twin Matrix
                            </h3>
                        </div>

                        <p style={{
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: 'rgba(255, 255, 255, 0.8)',
                            margin: 0
                        }}>
                            Your Twin Matrix represents your unique human experience profile across 256 dimensions, organized into 4 key areas: <strong>Physical</strong>, <strong>Social</strong>, <strong>Digital</strong>, and <strong>Spiritual</strong> traits.
                        </p>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default TwinMatrixCard;
