/**
 * Twin Matrix Grid Component
 * 
 * 16x16 grid visualization with quadrant layout
 */

import React from 'react';
import { Lock } from 'lucide-react';
import type { TwinMatrixData, MatrixTrait } from '../types';
import { MatrixTooltip } from './MatrixTooltip';

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
                        <div style={{ width: '240px', padding: '4px' }}>
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
                                        padding: '1px 5px',
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
