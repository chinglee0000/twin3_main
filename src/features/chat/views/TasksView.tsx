import React from 'react';
import { ActiveTaskWidget } from '../../widgets';

export const TasksView: React.FC = () => {
    return (
        <div className="tasks-view animate-fade-in scrollbar-hide" style={{
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
                }}>Active Tasks</h2>

                <ActiveTaskWidget />
            </div>
        </div>
    );
};
