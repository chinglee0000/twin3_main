/**
 * Twin Matrix Card Component
 * 
 * A 16x16 grid visualization showing user's trait matrix across 4 dimensions:
 * - Physical (rows 0-7, cols 0-7): Red #D02800
 * - Digital (rows 0-7, cols 8-15): Blue #3F88C5
 * - Social (rows 8-15, cols 0-7): Yellow #FFBA08
 * - Spiritual (rows 8-15, cols 8-15): Teal #1A9E8F
 */
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Info, Lock, X } from 'lucide-react';
import type { TwinMatrixData, MatrixTrait } from './types';
import { TwinMatrixModal } from './TwinMatrixModal';

// ============================================================
// Color Utility Functions
// ============================================================

const DIMENSION_COLORS = {
    physical: '#D02800',
    social: '#FFBA08',
    digital: '#3F88C5',
    spiritual: '#1A9E8F',
    undiscoveredFill: 'transparent',
    undiscoveredStroke: '#374151', // Gray 700 stroke
};


// ============================================================
// Tooltip Components (inline for simplicity)
// ============================================================

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}

function Tooltip({ children, content, disabled }: TooltipProps) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 8
            });
        }
        timeoutRef.current = setTimeout(() => setOpen(true), 100);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const tooltipContent = open ? createPortal(
        <div
            role="tooltip"
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                transform: 'translate(-50%, -100%)',
                zIndex: 99999,
                background: 'rgba(28, 28, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13px',
                color: 'var(--color-text-primary, #ffffff)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                whiteSpace: 'normal',
                animation: 'fade-in 0.15s ease-out',
                pointerEvents: 'none',
                maxWidth: '280px',
            }}
        >
            {content}
        </div>,
        document.body
    ) : null;

    if (disabled) return <>{children}</>;

    return (
        <div
            ref={triggerRef}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {tooltipContent}
        </div>
    );
}

// ============================================================
// Twin Matrix Grid Component (16x16)
// ============================================================

interface TwinMatrixGridProps {
    data: TwinMatrixData;
    onCellClick?: (trait: MatrixTrait & { displayDimension: string }) => void;
    isTouchDevice?: boolean;
}

function TwinMatrixGrid({ data, onCellClick, isTouchDevice }: TwinMatrixGridProps) {
    /**
     * Quadrant Layout:
     * ┌─────────────┬─────────────┐
     * │  Physical   │   Digital   │
     * │  (rows 0-7) │  (rows 0-7) │
     * │  cols 0-7   │  cols 8-15  │
     * ├─────────────┼─────────────┤
     * │   Social    │  Spiritual  │
     * │  (rows 8-15)│  (rows 8-15)│
     * │  cols 0-7   │  cols 8-15  │
     * └─────────────┴─────────────┘
     */

    // Reorganize traits into quadrant layout
    const getQuadrantDimension = (row: number, col: number): 'physical' | 'social' | 'digital' | 'spiritual' => {
        if (row < 8 && col < 8) return 'physical';      // Top-left
        if (row < 8 && col >= 8) return 'digital';      // Top-right
        if (row >= 8 && col < 8) return 'social';       // Bottom-left
        return 'spiritual';                              // Bottom-right
    };

    // Map original linear traits to quadrant positions
    const getTraitForQuadrant = (row: number, col: number) => {
        const dimension = getQuadrantDimension(row, col);

        // Calculate local position within the 8x8 quadrant
        const localRow = row < 8 ? row : row - 8;
        const localCol = col < 8 ? col : col - 8;
        const localIndex = localRow * 8 + localCol;

        // Get the original trait based on dimension ranges
        // Physical: 00-3F (0-63), Social: 40-7F (64-127), Digital: 80-BF (128-191), Spiritual: C0-FF (192-255)
        let globalIndex: number;
        switch (dimension) {
            case 'physical': globalIndex = localIndex; break;
            case 'social': globalIndex = 64 + localIndex; break;
            case 'digital': globalIndex = 128 + localIndex; break;
            case 'spiritual': globalIndex = 192 + localIndex; break;
        }

        const trait = data.traits[globalIndex];
        return { ...trait, displayDimension: dimension };
    };

    // Generate 16x16 grid with quadrant layout
    const gridCells = [];
    for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 16; col++) {
            gridCells.push(getTraitForQuadrant(row, col));
        }
    }

    return (
        <div
            style={{
                width: '100%',
                aspectRatio: '1',
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gridTemplateRows: 'repeat(16, 1fr)',
                gap: isTouchDevice ? '2px' : '4px', // 2px on mobile, 4px on desktop
                padding: 0,
                background: 'transparent',
                borderRadius: 'var(--radius-md, 12px)',
                marginBottom: '10px', // Add some safety margin
            }}
        >
            {
                gridCells.map((trait, index) => (
                    <Tooltip
                        key={`${trait.id}-${index}`}
                        disabled={isTouchDevice}
                        content={
                            <div style={{ width: '240px', padding: '4px' }}>
                                {/* Header: Trait Name & ID */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '10px',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    paddingBottom: '8px'
                                }}>
                                    <div>
                                        <div style={{
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            color: trait.discovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                            lineHeight: '1.2'
                                        }}>
                                            {trait.discovered ? (trait.name || trait.id) : `Locked Trait`}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: 'var(--color-text-dim)',
                                            marginTop: '2px',
                                            fontFamily: 'monospace'
                                        }}>
                                            ID: {trait.id}
                                        </div>
                                    </div>
                                    {trait.discovered && (
                                        <div style={{
                                            fontSize: '10px',
                                            padding: '1px 5px', // Adjusted for border
                                            borderRadius: '4px',
                                            background: 'transparent',
                                            border: `1px solid ${DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff'}`,
                                            color: DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {trait.dimension?.slice(0, 3)}
                                        </div>
                                    )}
                                </div>

                                {trait.discovered ? (
                                    <>
                                        {/* Strength Bar */}
                                        <div style={{ marginBottom: '12px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '11px',
                                                marginBottom: '4px',
                                                color: 'var(--color-text-secondary)'
                                            }}>
                                                <span>Strength</span>
                                                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                                                    {Math.round(((trait.strength || 0) / 255) * 100)}%
                                                </span>
                                            </div>
                                            <div style={{
                                                width: '100%',
                                                height: '4px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '2px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${Math.round(((trait.strength || 0) / 255) * 100)}%`,
                                                    height: '100%',
                                                    background: DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff'
                                                }} />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {trait.description && (
                                            <div style={{
                                                fontSize: '12px',
                                                color: 'var(--color-text-secondary)',
                                                lineHeight: '1.5',
                                                marginBottom: '10px',
                                                background: 'rgba(255,255,255,0.03)',
                                                padding: '8px',
                                                borderRadius: '6px'
                                            }}>
                                                {trait.description}
                                            </div>
                                        )}

                                        {/* Metadata Footer */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            fontSize: '10px',
                                            color: 'var(--color-text-dim)',
                                            alignItems: 'center'
                                        }}>
                                            {trait.unlockedAt && (
                                                <span>📅 {new Date(trait.unlockedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '12px 0',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        <Lock size={20} style={{ marginBottom: '8px', opacity: 0.5 }} />
                                        <div style={{ fontSize: '12px', fontWeight: 500 }}>Trait Undiscovered</div>
                                        <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>
                                            Continue verification to unlock
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <button
                            type="button"
                            style={{
                                aspectRatio: '1',
                                width: '100%',
                                borderRadius: '2px',
                                transition: 'all 0.15s ease',
                                cursor: 'pointer',
                                border: trait.discovered ? 'none' : `1px solid ${DIMENSION_COLORS.undiscoveredStroke}`,
                                backgroundColor: trait.discovered
                                    ? (DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || DIMENSION_COLORS.undiscoveredFill)
                                    : DIMENSION_COLORS.undiscoveredFill,
                                opacity: 1,
                                padding: 0,
                            }}
                            aria-label={trait.name || `Trait ${trait.id}`}
                            onMouseOver={(e) => {
                                if (window.innerWidth >= 1024) {
                                    e.currentTarget.style.transform = 'scale(1.3)';
                                    e.currentTarget.style.zIndex = '10';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (window.innerWidth >= 1024) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.zIndex = '1';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}
                            onClick={() => {
                                // On touch devices, trigger modal instead of tooltip
                                if (isTouchDevice && onCellClick) {
                                    onCellClick(trait);
                                }
                            }}
                        />
                    </Tooltip>
                ))
            }
        </div >
    );
}


// ============================================================
// Progress Bar Component
// ============================================================

interface ProgressBarProps {
    value: number;
    color: string;
}

function ProgressBar({ value, color }: ProgressBarProps) {
    return (
        <div
            style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${value}%`,
                    background: color, // Changed from backgroundColor to support gradients
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
}

// ============================================================
// Main Twin Matrix Card Component
// ============================================================

interface TwinMatrixCardProps {
    data: TwinMatrixData;
    onExplore?: () => void;
}

export const TwinMatrixCard: React.FC<TwinMatrixCardProps> = ({ data, onExplore }) => {
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
            className="card animate-fade-in-scale"
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
                    <Tooltip
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
                    </Tooltip>
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
                    {/* Quadrant order: Physical (top-left), Digital (top-right), Social (bottom-left), Spiritual (bottom-right) */}
                    {(['physical', 'digital', 'social', 'spiritual'] as const).map((key) => {
                        const dim = data.dimensions[key];
                        const color = dimensionColors[key];
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        const percentage = Math.round((dim.discovered / dim.total) * 100);
                        const score255 = Math.round((dim.discovered / dim.total) * 255);

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
                            width: '100%', // 填满容器宽度
                            padding: '12px 16px', // 稍微增加垂直 padding
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
                        Explore My Matrix
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
