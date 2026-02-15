/**
 * Twin Matrix Grid Component
 * 
 * 16x16 grid visualization with quadrant layout
 */

import { useEffect, useRef } from 'react';
import { Lock, Calendar, Unlock } from 'lucide-react';
import type { TwinMatrixData, MatrixTrait } from '../types';
import { MatrixTooltip } from './MatrixTooltip';
import { getTraitColor, isRecentlyUnlocked, type MatrixDimension } from '../colorSystem';

const DIMENSION_COLORS = {
    physical: '#D02800',
    social: '#FFBA08',
    digital: '#3F88C5',
    spiritual: '#1A9E8F',
    undiscoveredFill: 'transparent',
    undiscoveredStroke: '#374151',
};

interface TwinMatrixGridProps {
    data: TwinMatrixData;
    onCellClick?: (trait: MatrixTrait & { displayDimension: string }) => void;
    isTouchDevice?: boolean;
}

export function TwinMatrixGrid({ data, onCellClick, isTouchDevice }: TwinMatrixGridProps) {
    const cellRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    
    // Track which traits have already played their unlock animation
    const animatedTraitsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        console.log('🔍 TwinMatrixGrid: Checking for unlock animations', {
            totalTraits: data.traits.length,
            discoveredTraits: data.traits.filter(t => t.discovered).length,
            recentlyUnlockedTrait: data.recentlyUnlockedTrait
        });

        // Check for newly unlocked traits and trigger animation
        data.traits.forEach(trait => {
            if (trait.discovered && 
                trait.unlockedAt && 
                isRecentlyUnlocked(trait.unlockedAt) &&
                !animatedTraitsRef.current.has(trait.id)) {
                
                // Mark as animated immediately to prevent double trigger
                animatedTraitsRef.current.add(trait.id);
                
                const cellElement = cellRefs.current.get(trait.id);
                if (cellElement) {
                    console.log(`🎬 Triggering unlock animation for trait ${trait.id}`, {
                        unlockedAt: trait.unlockedAt,
                        isRecent: isRecentlyUnlocked(trait.unlockedAt),
                        timeDiff: Date.now() - new Date(trait.unlockedAt).getTime(),
                        element: cellElement
                    });
                    
                    // Add a pre-animation flash to draw attention
                    cellElement.style.transition = 'none';
                    cellElement.style.transform = 'scale(1.8)';
                    cellElement.style.boxShadow = '0 0 60px rgba(255, 255, 255, 1)';
                    
                    // Start the main animation after a brief delay
                    setTimeout(() => {
                        cellElement.style.transition = '';
                        cellElement.style.transform = '';
                        cellElement.style.boxShadow = '';
                        cellElement.classList.add('animate-trait-unlock');
                    }, 100);
                    
                    // Remove animation class after it completes
                    setTimeout(() => {
                        cellElement.classList.remove('animate-trait-unlock');
                        console.log(`✅ Animation completed for trait ${trait.id}`);
                    }, 3600); // 3.5s animation + 100ms delay
                } else {
                    console.warn(`⚠️ Cell element not found for trait ${trait.id}`);
                }
            }
        });
    }, [data.traits]);

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

    const getQuadrantDimension = (row: number, col: number): 'physical' | 'social' | 'digital' | 'spiritual' => {
        if (row < 8 && col < 8) return 'physical';
        if (row < 8 && col >= 8) return 'digital';
        if (row >= 8 && col < 8) return 'social';
        return 'spiritual';
    };

    const getTraitForQuadrant = (row: number, col: number) => {
        const dimension = getQuadrantDimension(row, col);
        const localRow = row < 8 ? row : row - 8;
        const localCol = col < 8 ? col : col - 8;
        const localIndex = localRow * 8 + localCol;

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
                gap: isTouchDevice ? '2px' : '4px',
                padding: 0,
                background: 'transparent',
                borderRadius: 'var(--radius-md, 12px)',
                marginBottom: '10px',
            }}
        >
            {gridCells.map((trait, index) => (
                <MatrixTooltip
                    key={`${trait.id}-${index}`}
                    disabled={isTouchDevice}
                    content={
                        trait.discovered ? (
                            // Discovered trait - match mobile modal layout
                            <div style={{ 
                                minWidth: '280px',
                                maxWidth: '320px',
                                padding: '8px'
                            }}>
                                {/* Header: Trait Name & Dimension Badge */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '12px',
                                    paddingBottom: '12px',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div>
                                        <div style={{
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: 'var(--color-text-primary)',
                                            lineHeight: '1.2',
                                            marginBottom: '4px'
                                        }}>
                                            {trait.name || `Trait ${trait.id}`}
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: 'var(--color-text-dim)',
                                            fontFamily: 'var(--font-sans)'
                                        }}>
                                            ID: 0x{trait.id}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '10px',
                                        padding: '3px 7px',
                                        borderRadius: '4px',
                                        background: 'transparent',
                                        border: `1px solid ${DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff'}`,
                                        color: DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flexShrink: 0
                                    }}>
                                        {trait.dimension?.slice(0, 3)}
                                    </div>
                                </div>

                                {/* Strength Bar */}
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '12px',
                                        marginBottom: '6px',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        <span>Strength</span>
                                        <span style={{ color: 'var(--color-text-dim)', fontSize: '11px' }}>
                                            {trait.strength || 0}/255
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '6px',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '3px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${Math.round(((trait.strength || 0) / 255) * 100)}%`,
                                                height: '100%',
                                                background: DIMENSION_COLORS[trait.displayDimension as keyof typeof DIMENSION_COLORS] || '#fff',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                        <span style={{
                                            color: 'var(--color-text-primary)',
                                            fontWeight: 600,
                                            fontSize: '12px',
                                            minWidth: '36px',
                                            textAlign: 'right'
                                        }}>
                                            {Math.round(((trait.strength || 0) / 255) * 100)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                {trait.description && (
                                    <div style={{
                                        fontSize: '13px',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.6',
                                        marginBottom: '12px',
                                        background: 'rgba(255,255,255,0.04)',
                                        padding: '10px',
                                        borderRadius: '6px'
                                    }}>
                                        {trait.description}
                                    </div>
                                )}

                                {/* Metadata */}
                                <div style={{
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    paddingTop: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    fontSize: '11px',
                                    color: 'var(--color-text-dim)'
                                }}>
                                    {trait.unlockedAt && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={12} />
                                            <span>
                                                Discovered: {new Date(trait.unlockedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {trait.unlockedBy && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Unlock size={12} />
                                            <span>Via: {trait.unlockedBy}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Locked trait
                            <div style={{ 
                                minWidth: '240px',
                                maxWidth: '280px',
                                padding: '12px', 
                                textAlign: 'center' 
                            }}>
                                <Lock size={24} style={{ color: 'var(--color-text-dim)', marginBottom: '8px', opacity: 0.5 }} />
                                <div style={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: '4px'
                                }}>
                                    Locked Trait
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: 'var(--color-text-dim)',
                                    fontFamily: 'monospace',
                                    marginBottom: '8px'
                                }}>
                                    ID: 0x{trait.id}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.5'
                                }}>
                                    This trait is undiscovered. Complete more verifications to unlock.
                                </div>
                            </div>
                        )
                    }
                >
                    <button
                        ref={(el) => {
                            if (el) cellRefs.current.set(trait.id, el);
                        }}
                        type="button"
                        style={{
                            aspectRatio: '1',
                            width: '100%',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            border: trait.discovered ? 'none' : `1px solid ${DIMENSION_COLORS.undiscoveredStroke}`,
                            backgroundColor: trait.discovered
                                ? getTraitColor(trait.displayDimension as MatrixDimension, trait.strength || 0)
                                : DIMENSION_COLORS.undiscoveredFill,
                            opacity: 1,
                            padding: 0,
                        }}
                        className="matrix-cell"
                        aria-label={trait.name || `Trait ${trait.id}`}
                        onMouseOver={(e) => {
                            if (window.innerWidth >= 1024 && !e.currentTarget.classList.contains('animate-trait-unlock')) {
                                e.currentTarget.style.transform = 'scale(1.3)';
                                e.currentTarget.style.zIndex = '10';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (window.innerWidth >= 1024 && !e.currentTarget.classList.contains('animate-trait-unlock')) {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.zIndex = '1';
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}
                        onClick={() => {
                            if (isTouchDevice && onCellClick) {
                                onCellClick(trait);
                            }
                        }}
                    />
                </MatrixTooltip>
            ))}
        </div>
    );
}
