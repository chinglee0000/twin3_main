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
    CheckCircle,
    ChevronRight,
    ChevronDown,
} from 'lucide-react';
import type { VerificationMethod, MethodCardVariant } from '../types';

// Map string icon names to components
const ICON_MAP: Record<string, React.ElementType> = {
    'ShieldCheck': ShieldCheck,
    'Shield': Shield,
    'Smartphone': Smartphone,
    'UserCheck': UserCheck,
    'Users': Users,
    'Wallet': Wallet,
    'Award': Award,
    'Puzzle': Puzzle,
    'Fingerprint': Fingerprint,
    'Key': Key,
};

interface VerificationOptionsProps {
    methods: VerificationMethod[];
    completedMethods: string[];
    selectedMethod?: string;
    onSelect: (methodId: string) => void;
}

/**
 * Get variant based on method state
 */
const getVariant = (
    methodId: string,
    completedMethods: string[],
    selectedMethod?: string
): MethodCardVariant => {
    if (completedMethods.includes(methodId)) return 'completed';
    if (selectedMethod === methodId) return 'selected';
    return 'default';
};

/**
 * Variant styles - Mobile optimized
 */
const getVariantStyles = (variant: MethodCardVariant): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '14px', // Slightly smaller gap for mobile
        padding: '14px 16px', // More compact for mobile
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        width: '100%',
        textAlign: 'left',
        position: 'relative',
    };

    switch (variant) {
        case 'default':
            return {
                ...baseStyles,
                background: 'transparent',
            };

        case 'selected':
            return {
                ...baseStyles,
                background: 'rgba(59, 130, 246, 0.1)',
                borderLeft: '3px solid #3B82F6',
                paddingLeft: '13px',
            };

        case 'completed':
            return {
                ...baseStyles,
                background: 'rgba(34, 197, 94, 0.1)',
                borderLeft: '3px solid #22C55E',
                paddingLeft: '13px',
                cursor: 'not-allowed',
            };

        default:
            return baseStyles;
    }
};

const getIconBoxStyles = (variant: MethodCardVariant): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
        width: '44px', // Slightly smaller for mobile
        height: '44px',
        minWidth: '44px', // Prevent shrinking
        minHeight: '44px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.15s ease',
    };

    switch (variant) {
        case 'default':
            return {
                ...baseStyles,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
            };

        case 'selected':
            return {
                ...baseStyles,
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
            };

        case 'completed':
            return {
                ...baseStyles,
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
            };

        default:
            return baseStyles;
    }
};

const getIconColor = (variant: MethodCardVariant): string => {
    switch (variant) {
        case 'default':
            return 'var(--color-text-secondary)';
        case 'selected':
            return '#3B82F6';
        case 'completed':
            return '#22C55E';
        default:
            return 'var(--color-text-secondary)';
    }
};

const getPointsBadgeStyles = (variant: MethodCardVariant): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
        fontSize: '12px', // Bigger for mobile readability
        fontWeight: 700,
        padding: '4px 10px', // More padding for touch targets
        borderRadius: '6px',
        whiteSpace: 'nowrap',
    };

    switch (variant) {
        case 'default':
            return {
                ...baseStyles,
                color: 'var(--color-text-secondary)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
            };

        case 'selected':
            return {
                ...baseStyles,
                color: '#3B82F6',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
            };

        case 'completed':
            return {
                ...baseStyles,
                color: '#22C55E',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
            };

        default:
            return baseStyles;
    }
};

export const VerificationOptions: React.FC<VerificationOptionsProps> = ({
    methods,
    completedMethods,
    selectedMethod,
    onSelect,
}) => {
    const [expanded, setExpanded] = useState(false);

    // Show first 3 methods by default, rest on expand
    const visibleMethods = expanded ? methods : methods.slice(0, 3);
    const hiddenCount = methods.length - 3;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {visibleMethods.map((method) => {
                const variant = getVariant(method.id, completedMethods, selectedMethod);
                const isCompleted = variant === 'completed';
                const isClickable = !isCompleted;
                const IconComponent = ICON_MAP[method.icon] || Shield;

                // Badge shows weight directly as decimal (e.g., +0.20, +0.25)
                // Weight is separate from total Humanity Index calculation
                const weightDisplay = method.weight.toFixed(2);

                return (
                    <button
                        key={method.id}
                        onClick={() => isClickable && onSelect(method.id)}
                        disabled={!isClickable}
                        style={getVariantStyles(variant)}
                        onMouseEnter={(e) => {
                            if (isClickable && variant === 'default') {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (variant === 'default') {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        {/* Icon box */}
                        <div style={getIconBoxStyles(variant)}>
                            {isCompleted ? (
                                <CheckCircle size={20} color="#22C55E" />
                            ) : (
                                <IconComponent
                                    size={20}
                                    color={getIconColor(variant)}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '8px',
                            }}>
                                <span style={{
                                    fontSize: '14px', // Good size for mobile
                                    fontWeight: 600,
                                    color: variant === 'completed'
                                        ? '#22C55E'
                                        : variant === 'selected'
                                            ? '#3B82F6'
                                            : 'var(--color-text-primary)',
                                    lineHeight: 1.3,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    flex: 1,
                                }}>
                                    {method.name}
                                </span>

                                {/* Points badge: shows weight directly */}
                                <span style={getPointsBadgeStyles(variant)}>
                                    {isCompleted ? '✓' : `+${weightDisplay}`}
                                </span>
                            </div>
                        </div>

                        {/* Chevron */}
                        {!isCompleted && (
                            <ChevronRight
                                size={18}
                                color={variant === 'selected' ? '#3B82F6' : 'var(--color-text-dim)'}
                                style={{ flexShrink: 0 }}
                            />
                        )}
                    </button>
                );
            })}

            {/* Show more button */}
            {!expanded && hiddenCount > 0 && (
                <button
                    onClick={() => setExpanded(true)}
                    style={{
                        width: '100%',
                        padding: '16px', // Bigger touch target for mobile
                        background: 'transparent',
                        border: 'none',
                        fontSize: '13px', // Bigger for mobile
                        fontWeight: 500,
                        color: 'var(--color-text-secondary)', // Changed from dim to secondary (gray-400)
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.background = 'transparent';
                    }}
                >
                    Show {hiddenCount} more options
                    <ChevronDown size={16} />
                </button>
            )}
        </div>
    );
};
