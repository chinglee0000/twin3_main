/**
 * Verification Progress Component
 * Simulates verification process with animated progress bar
 */

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VerificationProgressProps {
    methodName: string;
    onComplete: () => void;
    duration?: number; // in milliseconds, default 2500ms
}

export const VerificationProgress: React.FC<VerificationProgressProps> = ({
    methodName,
    onComplete,
    duration = 2500,
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Trigger completion after a short delay
                    setTimeout(() => onComplete(), 300);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [duration, onComplete]);

    return (
        <div className="w-full max-w-md mx-auto p-6">
            {/* Card Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
                    驗證中...
                </h3>

                {/* Method Name */}
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    {methodName}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Percentage */}
                <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {Math.round(progress)}%
                </p>

                {/* Note */}
                <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4">
                    模擬驗證流程（實際驗證已跳過）
                </p>
            </div>
        </div>
    );
};

export default VerificationProgress;
