/**
 * Verification Method Card - PLACEHOLDER UI
 * 
 * This is a temporary implementation for POC demonstration.
 * Will be replaced with Stitch's wireframe design.
 */

import React from 'react';
import * as Icons from 'lucide-react';
import type { VerificationMethod, MethodCardVariant } from './types';

interface VerificationMethodCardProps {
    methods: VerificationMethod[];
    onSelect: (methodId: string) => void;
    selectedMethod?: string | null;
}

export const VerificationMethodCard: React.FC<VerificationMethodCardProps> = ({
    methods,
    onSelect,
    selectedMethod,
}) => {
    // Get icon component dynamically
    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent || Icons.HelpCircle;
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    選擇驗證方式
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    選擇一種方式來驗證你的人類身份
                </p>
            </div>

            {/* Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methods.map((method) => {
                    const IconComponent = getIcon(method.icon);
                    const isSelected = selectedMethod === method.id;

                    return (
                        <button
                            key={method.id}
                            onClick={() => onSelect(method.id)}
                            className={`
                p-4 rounded-lg border-2 transition-all text-left
                hover:shadow-md hover:scale-105
                ${isSelected
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                }
              `}
                        >
                            {/* Icon and Name */}
                            <div className="flex items-start gap-3 mb-2">
                                <div
                                    className={`
                    p-2 rounded-lg
                    ${isSelected
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        }
                  `}
                                >
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {method.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {method.estimatedTime}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {method.description}
                            </p>

                            {/* Humanity Index Boost Badge */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Humanity Index
                                </span>
                                <span
                                    className={`
                    text-xs font-bold px-2 py-1 rounded
                    ${isSelected
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        }
                  `}
                                >
                                    +{method.humanityIndexBoost}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Placeholder Notice */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ <strong>Placeholder UI:</strong> 此為暫時介面，等待 Stitch 提供正式 wireframe 設計
                </p>
            </div>
        </div>
    );
};

export default VerificationMethodCard;
