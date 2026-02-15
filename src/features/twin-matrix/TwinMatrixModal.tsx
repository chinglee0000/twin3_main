/**
 * TwinMatrixModal - Reusable Modal for Matrix Trait Details
 * 
 * Used on mobile/tablet to show trait details (replaces hover tooltip).
 * Features: X button to close, backdrop click to close.
 */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, Calendar, Unlock } from 'lucide-react';
import type { MatrixTrait } from './types';
import { getTraitColor, type MatrixDimension } from './colorSystem';

interface TwinMatrixModalProps {
    trait: MatrixTrait | null;
    onClose: () => void;
}

export const TwinMatrixModal: React.FC<TwinMatrixModalProps> = ({ trait, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (trait) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [trait]);

    if (!trait) return null;

    const dimensionColor = getTraitColor(trait.dimension as MatrixDimension, trait.strength || 0);
    const strengthPercent = trait.strength ? Math.round((trait.strength / 255) * 100) : 0;

    return createPortal(
        <div
            onClick={onClose}
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
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '320px',
                    background: 'rgba(28, 28, 30, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '20px',
                    position: 'relative',
                    animation: 'slideUp 0.2s ease-out',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
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

                {trait.discovered ? (
                    <>
                        {/* Header: Trait Name & Dimension Badge */}
                        <div style={{ marginBottom: '16px', paddingRight: '32px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                gap: '12px',
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: 'var(--color-text-primary, #fff)',
                                        margin: 0,
                                        lineHeight: 1.3,
                                    }}>
                                        {trait.name || `Trait ${trait.id}`}
                                    </h3>
                                    <span style={{
                                        fontSize: '12px',
                                        color: 'var(--color-text-dim, #6B7280)',
                                        fontFamily: 'var(--font-sans)',
                                    }}>
                                        ID: 0x{trait.id}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: '10px',
                                    padding: '3px 7px', // Adjusted padding for border
                                    borderRadius: '4px',
                                    background: 'transparent',
                                    border: `1px solid ${dimensionColor}`,
                                    color: dimensionColor,
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    flexShrink: 0,
                                }}>
                                    {trait.dimension?.slice(0, 3)}
                                </span>
                            </div>
                        </div>

                        {/* Strength Bar */}
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '13px',
                                marginBottom: '6px',
                                color: 'var(--color-text-secondary, #9CA3AF)',
                            }}>
                                <span>Strength</span>
                                <span style={{ color: 'var(--color-text-dim, #6B7280)', fontSize: '12px' }}>
                                    {trait.strength || 0}/255
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    flex: 1,
                                    height: '6px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${strengthPercent}%`,
                                        height: '100%',
                                        background: dimensionColor,
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                                <span style={{
                                    color: 'var(--color-text-primary, #fff)',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    minWidth: '40px',
                                    textAlign: 'right'
                                }}>
                                    {strengthPercent}%
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        {trait.description && (
                            <div style={{
                                fontSize: '14px',
                                color: 'var(--color-text-secondary, #9CA3AF)',
                                lineHeight: 1.6,
                                marginBottom: '16px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                padding: '12px',
                                borderRadius: '8px',
                            }}>
                                {trait.description}
                            </div>
                        )}

                        {/* Metadata */}
                        <div style={{
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            fontSize: '12px',
                            color: 'var(--color-text-dim, #6B7280)',
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
                                    <span>
                                        Via: {trait.unlockedBy}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Locked Trait State */
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Lock size={32} style={{ color: 'var(--color-text-dim, #6B7280)', marginBottom: '12px' }} />
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--color-text-secondary, #9CA3AF)',
                            margin: '0 0 8px 0',
                        }}>
                            Locked Trait
                        </h3>
                        <p style={{
                            fontSize: '12px',
                            color: 'var(--color-text-dim, #6B7280)',
                            fontFamily: 'var(--font-sans)',
                            marginBottom: '12px',
                        }}>
                            ID: 0x{trait.id}
                        </p>
                        <p style={{
                            fontSize: '14px',
                            color: 'var(--color-text-secondary, #9CA3AF)',
                            margin: '0 0 4px 0',
                        }}>
                            This trait is undiscovered
                        </p>
                        <p style={{
                            fontSize: '12px',
                            color: 'var(--color-text-dim, #6B7280)',
                            margin: 0,
                        }}>
                            Complete more verifications to unlock
                        </p>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default TwinMatrixModal;
