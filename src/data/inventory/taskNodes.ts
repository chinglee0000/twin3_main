/**
 * Task Flow Nodes
 * 
 * Task browsing, acceptance, and management
 */

import type { InteractionNode } from '../../types/a2ui';

export const taskNodes: InteractionNode[] = [
    {
        id: 'browse_tasks',
        triggers: ['task', 'browse', 'jobs'],
        response: {
            text: "**📍 Recommended for You**\n\nComplete **Proof of Humanity** first to boost your score and unlock premium tasks!\n\nHere are the current brand task opportunities:",
            delay: 500,
            card: {
                type: 'task_opportunity',
                taskPayload: {
                    brand: {
                        name: "L'Oreal Paris",
                        logoUrl: 'https://placehold.co/40x40/FF0000/FFF?text=L'
                    },
                    title: 'Lipstick Filter Challenge',
                    description: 'Create 15-60s Reels using specific filter showcasing #666 shade. Mention moisturizing and color payoff.',
                    imageUrl: 'https://placehold.co/600x300/e6a6be/FFF?text=Lipstick+Campaign',
                    reward: {
                        tokens: '500 $twin3',
                        gift: 'Full PR Package (Worth $3000)'
                    },
                    status: 'open',
                    spotsLeft: 3
                },
                actions: [
                    { label: 'View Details', actionId: 'view_task_detail', variant: 'primary' },
                    { label: 'Decline', actionId: 'decline_task', variant: 'secondary' }
                ]
            }
        },
        suggestedActions: [
            { label: 'View Twin Matrix', payload: 'twin_matrix' },
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
        ]
    },

    {
        id: 'view_task_detail',
        triggers: ['detail', 'details', 'view'],
        response: {
            text: "Here is the full task description:",
            delay: 500,
            card: {
                type: 'task_detail',
                title: "L'Oreal Paris — Lipstick Filter Challenge",
                description: `
**Requirements**
• Create 15-60s Reels or TikTok
• Use designated filter
• Showcase shade #666 Rouge Signature

**Rewards**
• 500 $twin3 
• Full PR Package (Worth $3000)

**Deadline**: 2025/01/15`,
                imageUrl: 'https://placehold.co/600x400/e6a6be/FFF?text=Product+Detail',
                actions: [
                    { label: 'Accept Task', actionId: 'accept_task', variant: 'primary' },
                    { label: 'Decline', actionId: 'decline_task', variant: 'secondary' }
                ]
            }
        },
        suggestedActions: [
            { label: 'View Twin Matrix', payload: 'twin_matrix' },
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
        ]
    },

    {
        id: 'accept_task',
        triggers: ['accept', 'confirm'],
        response: {
            text: "Great! You have successfully accepted this task!\n\nUse the dashboard below to track your progress and submit your work.",
            delay: 800,
            widget: 'active_task'
        },
        suggestedActions: [
            { label: 'View More Tasks', payload: 'browse_tasks' }
        ]
    },

    {
        id: 'decline_task',
        triggers: ['decline', 'skip', 'no'],
        response: {
            text: "No problem! This task has been skipped.\n\nThere are other tasks available. Would you like to see them?",
            delay: 500
        },
        suggestedActions: [
            { label: 'View Other Tasks', payload: 'browse_tasks' }
        ]
    },

    {
        id: 'dashboard',
        triggers: ['dashboard', 'my tasks', 'status'],
        response: {
            text: "Here is your task dashboard:",
            delay: 500,
            widget: 'global_dashboard'
        },
        suggestedActions: [
            { label: 'Browse More Tasks', payload: 'browse_tasks' }
        ]
    }
];
