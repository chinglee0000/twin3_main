/**
 * Progress Bar Component
 * 
 * Simple animated progress bar
 */

import React from 'react';

interface ProgressBarProps {
    value: number;
    color: string;
}

export function ProgressBar({ value, color }: ProgressBarProps) {
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
                    background: color,
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
}
