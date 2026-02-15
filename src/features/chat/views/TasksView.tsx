/**
 * TasksView - Tasks listing full page tab view
 */

import React from 'react';
import { Coins, Clock, Users } from 'lucide-react';
import type { TaskOpportunityPayload } from '../../../types';

interface TasksViewProps {
    onTaskClick?: (task: TaskOpportunityPayload) => void;
}

const taskCardsData = [
    {
        brand: { name: "L'Oréal Paris", logoUrl: 'https://placehold.co/40x40/FF0000/FFF?text=L' },
        title: 'Lipstick Filter Challenge',
        description: 'Create 15-60s Reels using specific filter showcasing #666 shade. Mention moisturizing and color payoff.',
        imageUrl: 'https://placehold.co/600x300/e6a6be/FFF?text=Lipstick+Campaign',
        reward: { tokens: '500 $twin3', gift: 'Full PR Package (Worth $3000)' },
        status: 'open' as const,
        spotsLeft: 3,
        deadline: '2025-01-15',
        acceptedCount: 0,
        totalSpots: 3
    },
    {
        brand: { name: 'Starbucks', logoUrl: 'https://placehold.co/40x40/00704A/FFF?text=S' },
        title: 'Coffee Shop Vlog',
        description: 'Capture store atmosphere and drink close-ups, share coffee tasting experience',
        imageUrl: 'https://placehold.co/600x300/00704A/FFF?text=Coffee+Vlog',
        reward: { tokens: '300 $twin3', gift: 'Coffee Voucher $500' },
        status: 'open' as const,
        spotsLeft: 3,
        deadline: '2025-01-20',
        acceptedCount: 2,
        totalSpots: 5
    },
    {
        brand: { name: 'Dior', logoUrl: 'https://placehold.co/40x40/000000/FFF?text=D' },
        title: 'Beauty Unboxing Review',
        description: 'Try new products and create unboxing video, share usage experience',
        imageUrl: 'https://placehold.co/600x300/000000/FFF?text=Beauty+Review',
        reward: { tokens: '800 $twin3', gift: 'Makeup Gift Box (Worth $5000)' },
        status: 'open' as const,
        spotsLeft: 1,
        deadline: '2025-01-10',
        acceptedCount: 1,
        totalSpots: 2
    }
];

export const TasksView: React.FC<TasksViewProps> = ({ onTaskClick }) => {
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
                Available Tasks
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '16px'
            }}>
                {taskCardsData.map((task, i) => (
                    <div
                        key={i}
                        className="card card-hover"
                        style={{
                            padding: '24px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <div>
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                marginBottom: '6px'
                            }}>
                                {task.title}
                            </h4>
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--color-text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
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
                            <button
                                onClick={() => onTaskClick?.(task as any)}
                                className="btn btn-primary"
                                style={{ padding: '6px 14px', fontSize: '13px' }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
