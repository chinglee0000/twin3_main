/**
 * Twin Matrix Card Component
 * 
 * A 16x16 grid visualization showing user's trait matrix across 4 dimensions:
 * - Physical (rows 0-3): Blue #137cec
 * - Social (rows 4-7): Green #21c45d  
 * - Digital (rows 8-11): Purple #8a2ce2
 * - Spiritual (rows 12-15): Orange #f08228
 */
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Info, Lock } from 'lucide-react';
import type { TwinMatrixData } from './twin-matrix/types';

// ============================================================
// Color Utility Functions
// ============================================================

const DIMENSION_COLORS = {
    physical: '#137cec',
    social: '#21c45d',
    digital: '#8a2ce2',
    spiritual: '#f08228',
    undiscoveredFill: 'transparent',
    undiscoveredStroke: '#374151', // Gray 700 stroke
};


// ============================================================
// Tooltip Components (inline for simplicity)
// ============================================================

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
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
}

function TwinMatrixGrid({ data }: TwinMatrixGridProps) {
    /**
     * Quadrant Layout:
     * ┌─────────────┬─────────────┐
     * │  Physical   │   Social    │
     * │  (rows 0-7) │  (rows 0-7) │
     * │  cols 0-7   │  cols 8-15  │
     * ├─────────────┼─────────────┤
     * │  Spiritual  │   Digital   │
     * │  (rows 8-15)│  (rows 8-15)│
     * │  cols 0-7   │  cols 8-15  │
     * └─────────────┴─────────────┘
     */

    // Reorganize traits into quadrant layout
    const getQuadrantDimension = (row: number, col: number): 'physical' | 'social' | 'digital' | 'spiritual' => {
        if (row < 8 && col < 8) return 'physical';      // Top-left
        if (row < 8 && col >= 8) return 'social';       // Top-right
        if (row >= 8 && col < 8) return 'spiritual';    // Bottom-left
        return 'digital';                                // Bottom-right
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
                gap: '4px', // Increased gap to 4px
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md, 12px)',
                marginBottom: '10px', // Add some safety margin
            }}
        >
            {
                gridCells.map((trait, index) => (
                    <Tooltip
                        key={`${trait.id}-${index}`}
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
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            background: DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff',
                                            color: 'white',
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
    const dimensionColors = {
        physical: '#137cec',
        social: '#21c45d',
        digital: '#8a2ce2',
        spiritual: '#f08228',
    };

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
                <TwinMatrixGrid data={data} />

                {/* Dimension Progress Bars - Quadrant Order */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginTop: '16px',
                    }}
                >
                    {/* Quadrant order: Physical (top-left), Social (top-right), Spiritual (bottom-left), Digital (bottom-right) */}
                    {(['physical', 'social', 'spiritual', 'digital'] as const).map((key) => {
                        const dim = data.dimensions[key];
                        const color = dimensionColors[key];
                        const label = key.charAt(0).toUpperCase() + key.slice(1);
                        const percentage = Math.round((dim.discovered / dim.total) * 100);

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
                                        {dim.discovered}/{dim.total}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1 }}>
                                        <ProgressBar value={percentage} color={color} />
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
        </div>
    );
};

export default TwinMatrixCard;
