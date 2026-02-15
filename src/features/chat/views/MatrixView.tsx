/**
 * MatrixView - Twin Matrix full page tab view
 */

import React from 'react';
import { TwinMatrixCard } from '../../twin-matrix/TwinMatrixCard';

export const MatrixView: React.FC = () => {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '24px 0'
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
                letterSpacing: '-0.02em'
            }}>
                Twin Matrix
            </h2>
            <TwinMatrixCard
                onExplore={() => {
                    // Placeholder for explore action
                }}
            />
        </div>
    );
};
