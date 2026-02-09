import React from 'react';
import { GlobalDashboardWidget } from '../../widgets';

export const DashboardView: React.FC = () => {
    return (
        <div className="dashboard-view animate-fade-in scrollbar-hide" style={{
            padding: '24px',
            overflow: 'auto',
            height: '100%',
            animation: 'fadeIn 0.3s ease-in-out'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '24px',
                    color: 'var(--color-text-primary)'
                }}>Global Dashboard</h2>

                <GlobalDashboardWidget />
            </div>
        </div>
    );
};
