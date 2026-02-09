import React from 'react';
import { Coins, Clock, Users } from 'lucide-react';
import { ResponsiveModal } from '../../../components/ui/ResponsiveModal';
import { TwinMatrixCard } from '../../twin-matrix/TwinMatrixCard';
import { GlobalDashboardWidget } from '../../widgets';
import { web3EngineerMatrixData } from '../../../data/matrix/twinMatrixMockData';
import type { TaskOpportunityPayload } from '../../../types';

interface ModalContainerProps {
    matrixOpen: boolean;
    tasksOpen: boolean;
    dashboardOpen: boolean;
    onMatrixClose: () => void;
    onTasksClose: () => void;
    onDashboardClose: () => void;
    onViewTaskFromDashboard: (taskId: string) => void;
}

// Mock tasks data (you can import from actual data source)
const mockTasks: TaskOpportunityPayload[] = [
    {
        title: 'Complete onboarding survey',
        description: 'Help us improve Twin3 by sharing your feedback.',
        reward: { tokens: '50' },
        brand: { name: 'Twin3', logoUrl: '' },
        deadline: '2 days',
        totalSpots: 100,
        acceptedCount: 23,
        status: 'open'
    },
    {
        title: 'Write product review',
        description: 'Share your experience with our latest features.',
        reward: { tokens: '100' },
        brand: { name: 'Twin3', logoUrl: '' },
        deadline: '5 days',
        totalSpots: 50,
        acceptedCount: 12,
        status: 'open'
    }
];

export const ModalContainer: React.FC<ModalContainerProps> = ({
    matrixOpen,
    tasksOpen,
    dashboardOpen,
    onMatrixClose,
    onTasksClose,
    onDashboardClose,
    onViewTaskFromDashboard
}) => {
    return (
        <>
            {/* Twin Matrix Modal */}
            <ResponsiveModal
                isOpen={matrixOpen}
                onClose={onMatrixClose}
                title="Your Twin Matrix"
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
                    <TwinMatrixCard data={web3EngineerMatrixData} />
                </div>
            </ResponsiveModal>

            {/* Tasks Modal */}
            <ResponsiveModal
                isOpen={tasksOpen}
                onClose={onTasksClose}
                title="Available Tasks"
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {mockTasks.map((task, index) => (
                        <div
                            key={index}
                            className="glass"
                            style={{
                                padding: '16px',
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                border: '1px solid var(--glass-border)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }}>
                                <h3 style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: 'var(--color-text-primary)',
                                    margin: 0
                                }}>
                                    {task.title}
                                </h3>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'var(--color-text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    margin: 0
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--color-primary)'
                                    }} />
                                    {task.brand.name}
                                </p>
                            </div>
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '8px',
                                lineHeight: '1.5'
                            }}>
                                {task.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '12px',
                                fontSize: '12px',
                                color: 'var(--color-text-dim)'
                            }}>
                                {task.deadline && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={14} />
                                        Due {task.deadline}
                                    </span>
                                )}
                                {task.totalSpots && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={14} />
                                        {task.acceptedCount || 0}/{task.totalSpots}
                                    </span>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '12px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                gap: '8px',
                                flexWrap: 'wrap'
                            }}>
                                <span style={{
                                    fontSize: '13px',
                                    color: 'var(--color-primary)',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <Coins size={16} />
                                    {task.reward.tokens}
                                </span>
                                <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ResponsiveModal>

            {/* Dashboard Modal */}
            <ResponsiveModal
                isOpen={dashboardOpen}
                onClose={onDashboardClose}
                title="Dashboard"
            >
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <GlobalDashboardWidget
                        onViewTask={onViewTaskFromDashboard}
                    />
                </div>
            </ResponsiveModal>
        </>
    );
};
