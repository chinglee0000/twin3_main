import React from 'react';
import * as Icons from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import type { VerificationMethod, MethodCardVariant } from '../types';

interface VerificationOptionsProps {
    methods: VerificationMethod[];
    completedMethods: string[];
    selectedMethodId?: string | null;
    onSelect: (methodId: string) => void;
}

const OptionCard: React.FC<{
    method: VerificationMethod;
    variant: MethodCardVariant;
    isComingSoon?: boolean;
    onClick?: () => void;
}> = ({ method, variant, isComingSoon, onClick }) => {
    // Dynamic Icon Rendering
    const IconComponent = (Icons[method.icon as keyof typeof Icons] || Icons.Shield) as React.ElementType;

    // Style Configurations
    const getStyles = () => {
        if (isComingSoon) {
            return {
                container: 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 cursor-not-allowed opacity-60',
                iconColor: 'var(--color-text-dim)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
            };
        }
        switch (variant) {
            case 'completed':
                return {
                    container: 'border-green-500 bg-green-50 dark:bg-green-900/10 cursor-not-allowed',
                    iconColor: '#30D158',
                    borderColor: 'rgba(48, 209, 88, 0.5)'
                };
            case 'selected':
                return {
                    container: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer ring-1 ring-blue-500',
                    iconColor: '#3B82F6',
                    borderColor: 'rgba(59, 130, 246, 0.5)'
                };
            default:
                return {
                    container: 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10',
                    iconColor: 'var(--color-text-secondary)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                };
        }
    };

    const styles = getStyles();

    return (
        <div
            onClick={!isComingSoon && variant !== 'completed' ? onClick : undefined}
            className={`
                relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
                ${!isComingSoon && variant !== 'completed' ? 'hover:scale-[1.02] active:scale-[0.98] shadow-sm' : ''}
                ${styles.container}
            `}
            style={{ borderColor: styles.borderColor }}
        >
            {/* Icon Box */}
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: variant === 'default' && !isComingSoon ? 'rgba(255,255,255,0.05)' : styles.iconColor + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                {variant === 'completed' ? (
                    <CheckCircle2 size={20} color={styles.iconColor} />
                ) : (
                    <IconComponent size={20} color={styles.iconColor} />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-start">
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: variant === 'completed' ? styles.iconColor : 'var(--color-text-primary)'
                    }} className="truncate">
                        {method.name}
                    </span>
                    {isComingSoon && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 dark:bg-white/10 dark:text-gray-500 whitespace-nowrap ml-2">
                            Soon
                        </span>
                    )}
                </div>

                <div style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '2px'
                }}>
                    +{Math.round(method.weight * 255)} points
                </div>
            </div>

            {/* Selection Check for Selected state (optional visual cue) */}
            {variant === 'selected' && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-500" />
            )}
        </div>
    );
};

export const VerificationOptions: React.FC<VerificationOptionsProps> = ({
    methods,
    completedMethods,
    selectedMethodId,
    onSelect
}) => {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-1 gap-3">
                {methods.map(method => {
                    const isCompleted = completedMethods.includes(method.id);
                    const isSelected = selectedMethodId === method.id;

                    // POC Logic: Only 'recaptcha-v3' is active
                    const isComingSoon = method.id !== 'recaptcha-v3';

                    let variant: MethodCardVariant = 'default';
                    if (isCompleted) variant = 'completed';
                    else if (isSelected) variant = 'selected';

                    return (
                        <OptionCard
                            key={method.id}
                            method={method}
                            variant={variant}
                            isComingSoon={isComingSoon}
                            onClick={() => onSelect(method.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
