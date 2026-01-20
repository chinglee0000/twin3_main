import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VerificationLoaderProps {
    methodName: string;
    onComplete: () => void;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({
    methodName,
    onComplete
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 2500;
        const interval = 50; // Update every 50ms
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Small delay before completing to show 100% state
            const timeout = setTimeout(() => {
                onComplete();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 w-full max-w-md mx-auto min-h-[200px] text-center animate-fade-in">
            {/* Icon */}
            <div className="mb-6 relative">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Loader2 size={32} className="text-blue-500 animate-spin" />
                </div>
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Verifying...
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                {methodName}
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-[240px] h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-2 text-xs font-medium text-gray-400">
                {Math.round(progress)}%
            </div>
        </div>
    );
};
