import React, { useState } from 'react';
import { Trophy, CheckCircle, Coins, Users, Share2, Fingerprint, Gift, ArrowRight, Lock } from 'lucide-react';
import { BiometricVerificationModal } from './BiometricVerificationModal';
import { ShareModal } from './ShareModal';

interface Task {
    id: string;
    title: string;
    description: string;
    reward: number;
    icon?: React.ElementType;
    iconUrl?: string;
    completed: boolean;
}

interface AirdropTaskDashboardProps {
    matrixScore: number;
    onAllTasksComplete: (totalScore: number, totalReward: number) => void;
}

export const AirdropTaskDashboard: React.FC<AirdropTaskDashboardProps> = ({
    matrixScore,
    onAllTasksComplete,
}) => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 'biometric',
            title: 'Boost Humanity Index',
            description: 'Complete biometric verification',
            reward: 50,
            icon: Fingerprint,
            completed: false,
        },
        {
            id: 'share',
            title: 'Share twin3',
            description: 'Share your twin Matrix on social media',
            reward: 30,
            icon: Share2,
            completed: false,
        },
        {
            id: 'follow_x',
            title: 'Follow on X',
            description: 'Follow @twin3_ai on X (Twitter)',
            reward: 20,
            iconUrl: '/brands/x-white.png',
            completed: false,
        },
        {
            id: 'join_tg',
            title: 'Join Telegram',
            description: 'Join the twin3 Telegram community',
            reward: 20,
            iconUrl: '/brands/telegram_logo.svg',
            completed: false,
        },
        {
            id: 'join_discord',
            title: 'Join Discord',
            description: 'Join the twin3 Discord server',
            reward: 20,
            iconUrl: '/brands/Discord-Symbol-White.svg',
            completed: false,
        },
        {
            id: 'invite_friends',
            title: 'Invite Friends',
            description: 'Invite 3 friends to join twin3',
            reward: 30,
            icon: Users,
            completed: false,
        },
    ]);

    const [showBiometricModal, setShowBiometricModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const completedCount = tasks.filter(t => t.completed).length;
    const totalReward = tasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0);
    const allCompleted = completedCount === tasks.length;

    // Calculate potential token share from 10,000 TWIN3 pool
    // More conservative calculation for demo credibility
    const calculateTokenShare = (score: number, tasksCompleted: number) => {
        // Base share: 10-30% of score (more realistic)
        const scoreBonus = Math.round((score / 255) * 1500); // Max 1500 from score
        // Task completion bonus: 100 tokens per task
        const taskBonus = tasksCompleted * 100;
        return scoreBonus + taskBonus;
    };

    const potentialTokens = calculateTokenShare(matrixScore + totalReward, completedCount);

    const handleTaskClick = (taskId: string) => {
        if (taskId === 'biometric') {
            setShowBiometricModal(true);
        } else if (taskId === 'share') {
            setShowShareModal(true);
        } else if (taskId === 'follow_x') {
            window.open('https://x.com/twin3_ai', '_blank');
            setTimeout(() => {
                completeTask(taskId);
            }, 1000);
        } else if (taskId === 'join_tg') {
            window.open('https://t.me/twin3_ai', '_blank');
            setTimeout(() => {
                completeTask(taskId);
            }, 1000);
        } else if (taskId === 'join_discord') {
            window.open('https://discord.gg/G9hneaBRrh', '_blank');
            setTimeout(() => {
                completeTask(taskId);
            }, 1000);
        } else if (taskId === 'invite_friends') {
            // Coming soon - do nothing for now
            return;
        }
    };

    const completeTask = (taskId: string) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, completed: true } : t
        ));

        const updatedTasks = tasks.map(t =>
            t.id === taskId ? { ...t, completed: true } : t
        );
        const newCompletedCount = updatedTasks.filter(t => t.completed).length;
        const newTotalReward = updatedTasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0);

        if (newCompletedCount === tasks.length) {
            setTimeout(() => {
                onAllTasksComplete(matrixScore + newTotalReward, calculateTokenShare(matrixScore + newTotalReward, newCompletedCount));
            }, 1000);
        }
    };

    return (
        <>
            <div 
                className="card animate-fade-in" 
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    padding: 0,
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '16px 20px 12px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Trophy size={18} color="var(--color-info)" />
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            fontFamily: 'Montserrat, sans-serif',
                            color: 'var(--color-text-primary)',
                            margin: 0,
                        }}>
                            Airdrop Missions
                        </h3>
                    </div>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: 300,
                        color: 'var(--color-text-secondary)',
                        margin: 0,
                    }}>
                        Complete tasks to maximize your share
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                    {/* Pool Info */}
                    <div style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'rgba(139, 92, 246, 0.08)',
                        border: '1px solid rgba(139, 92, 246, 0.15)',
                        marginBottom: '16px',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px',
                        }}>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 300,
                                color: 'var(--color-text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>
                                Total Airdrop Pool
                            </span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}>
                                <Coins size={16} color="var(--color-info)" />
                                <span style={{
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    color: 'var(--color-info)',
                                    fontFamily: 'var(--font-sans)',
                                }}>
                                    5,000,000
                                </span>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 300,
                                color: 'var(--color-text-secondary)',
                            }}>
                                Your Potential Share
                            </span>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    color: 'var(--color-info)',
                                    fontFamily: 'var(--font-sans)',
                                }}>
                                    ~{potentialTokens} $twin3
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            marginBottom: '8px',
                        }}>
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>
                                Mission Progress
                            </span>
                            <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                                {completedCount}/{tasks.length} Complete
                            </span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                width: `${(completedCount / tasks.length) * 100}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--color-info), #7c3aed)',
                                borderRadius: '4px',
                                transition: 'width 0.5s ease',
                            }} />
                        </div>
                    </div>

                    {/* Task List */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '8px',
                        marginBottom: '16px',
                    }}>
                        {tasks.map((task) => {
                            const TaskIcon = task.icon;
                            
                            return (
                                <div
                                    key={task.id}
                                    onClick={() => !task.completed && handleTaskClick(task.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        background: task.completed 
                                            ? 'rgba(34, 197, 94, 0.08)' 
                                            : 'rgba(255, 255, 255, 0.03)',
                                        border: task.completed
                                            ? '1px solid rgba(34, 197, 94, 0.2)'
                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '12px',
                                        cursor: task.completed ? 'default' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!task.completed) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!task.completed) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: task.completed
                                            ? 'rgba(34, 197, 94, 0.15)'
                                            : 'rgba(255, 255, 255, 0.04)',
                                        border: `1px solid ${task.completed
                                            ? 'rgba(34, 197, 94, 0.3)'
                                            : 'rgba(255, 255, 255, 0.06)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        {task.completed ? (
                                            <CheckCircle size={20} color="#22c55e" />
                                        ) : task.iconUrl ? (
                                            <img 
                                                src={task.iconUrl} 
                                                alt={task.title}
                                                style={{
                                                    width: task.id === 'follow_x' ? '20px' : '24px',
                                                    height: task.id === 'follow_x' ? '20px' : '24px',
                                                    objectFit: 'contain',
                                                    opacity: 0.9,
                                                }}
                                            />
                                        ) : TaskIcon ? (
                                            <TaskIcon size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
                                        ) : null}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: 'var(--color-text-primary)',
                                            marginBottom: '2px',
                                        }}>
                                            {task.title}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            fontWeight: 300,
                                            color: 'var(--color-text-dim)',
                                        }}>
                                            {task.description}
                                        </div>
                                    </div>

                                    <div style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: task.completed ? '#22c55e' : 'var(--color-info)',
                                        fontFamily: 'var(--font-sans)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {task.completed ? '✓' : `+${task.reward}`}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Continue Button */}
                    {allCompleted && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: 'rgba(34, 197, 94, 0.08)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                        }}>
                            <Gift size={16} color="#22c55e" />
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#22c55e',
                            }}>
                                All missions complete! Calculating rewards...
                            </span>
                        </div>
                    )}

                    {/* Preview Upcoming Tasks Button */}
                    {!showPreview && (
                        <button
                            onClick={() => setShowPreview(true)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                color: 'var(--color-text-secondary)',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                            }}
                        >
                            <ArrowRight size={16} />
                            Preview Upcoming Missions
                        </button>
                    )}

                    {/* Upcoming Tasks Preview */}
                    {showPreview && (
                        <div className="animate-slide-down" style={{
                            marginTop: '8px',
                            padding: '16px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '12px',
                            }}>
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: 'var(--color-text-primary)',
                                }}>
                                    Upcoming Missions
                                </span>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-text-dim)',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                    }}
                                >
                                    Hide
                                </button>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}>
                                {/* Upcoming Task 1 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.04)',
                                    borderRadius: '10px',
                                    opacity: 0.6,
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Lock size={18} color="var(--color-text-dim)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: 'var(--color-text-secondary)',
                                            marginBottom: '2px',
                                        }}>
                                            Complete Daily Check-in
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: 'var(--color-text-dim)',
                                        }}>
                                            Check in daily for 7 consecutive days
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        color: 'var(--color-text-dim)',
                                    }}>
                                        Coming Soon
                                    </div>
                                </div>

                                {/* Upcoming Task 2 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.04)',
                                    borderRadius: '10px',
                                    opacity: 0.6,
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Lock size={18} color="var(--color-text-dim)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: 'var(--color-text-secondary)',
                                            marginBottom: '2px',
                                        }}>
                                            Explore twin Matrix
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: 'var(--color-text-dim)',
                                        }}>
                                            Unlock 5 cells in your twin Matrix
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        color: 'var(--color-text-dim)',
                                    }}>
                                        Coming Soon
                                    </div>
                                </div>

                                {/* Upcoming Task 3 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.04)',
                                    borderRadius: '10px',
                                    opacity: 0.6,
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Lock size={18} color="var(--color-text-dim)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: 'var(--color-text-secondary)',
                                            marginBottom: '2px',
                                        }}>
                                            Participate in Community Events
                                        </div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: 'var(--color-text-dim)',
                                        }}>
                                            Join and participate in twin3 events
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        color: 'var(--color-text-dim)',
                                    }}>
                                        Coming Soon
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '12px',
                                padding: '10px',
                                borderRadius: '8px',
                                background: 'rgba(139, 92, 246, 0.06)',
                                border: '1px solid rgba(139, 92, 246, 0.1)',
                                fontSize: '11px',
                                color: 'var(--color-text-dim)',
                                textAlign: 'center',
                                lineHeight: 1.5,
                            }}>
                                More missions will be available soon. Stay tuned!
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showBiometricModal && (
                <BiometricVerificationModal
                    onComplete={() => {
                        setShowBiometricModal(false);
                        completeTask('biometric');
                    }}
                    onClose={() => setShowBiometricModal(false)}
                />
            )}

            {showShareModal && (
                <ShareModal
                    onComplete={() => {
                        setShowShareModal(false);
                        completeTask('share');
                    }}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </>
    );
};
