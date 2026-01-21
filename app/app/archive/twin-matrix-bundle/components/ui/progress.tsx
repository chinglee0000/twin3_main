/**
 * Progress Component - Standalone version for Vite + React
 * Based on shadcn/ui Progress component
 */
import React from 'react'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
}

export function Progress({ value = 0, max = 100, className = '', ...props }: ProgressProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
        <div
            className={`progress ${className}`}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            {...props}
        >
            <div
                className="progress-bar"
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}
