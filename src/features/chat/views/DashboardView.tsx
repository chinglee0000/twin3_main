/**
 * DashboardView - Dashboard full page tab view
 */

import React from 'react';
import { GlobalDashboardWidget } from '../../widgets';

export const DashboardView: React.FC = () => {
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
                Dashboard
            </h2>
            <GlobalDashboardWidget
                onViewTask={(taskId) => {
                    console.log(`Viewing task: ${taskId}`);
                }}
            />
        </div>
    );
};
