// Interaction Inventory - The "Script" for Twin3

import type { InteractionInventory } from '../types/a2ui';

export const INTERACTION_INVENTORY: InteractionInventory = [
    // ============================================================
    // 1. WELCOME FLOW - HERO + FEATURE CARDS
    // ============================================================
    {
        id: 'welcome',
        triggers: ['start', 'hi', 'hello', 'menu'],
        response: {
            text: "Own Your Humanity with twin3\n\nTransform your human warmth into a 256D Twin Matrix. Let your Personal Agent work and earn for you while you focus on living.\n\nClick the suggestions below or ask me anything about twin3!",
            delay: 800,
            card: {
                type: 'feature_grid',
                features: [
                    {
                        icon: 'verification',
                        title: 'Universal Human Passport',
                        description: 'Verify once and gain seamless access to any platform requiring human proof. No more repetitive captchas—just your digital key to a bot-free internet.'
                    },
                    {
                        icon: 'matrix',
                        title: 'Your 256D Digital Twin',
                        description: 'Construct your evolving identity by lighting up the 16x16 Twin Matrix. Across physical, mental, social, and digital dimensions—ensure you stay you in the digital world.'
                    },
                    {
                        icon: 'agent',
                        title: '24/7 Personal Agent',
                        description: 'Empower an agent that carries your preferences to work, earn, and filter noise. Your twin manages the digital clutter while you reclaim your time to live.'
                    }
                ]
            }
        },
        suggestedActions: [
            { label: 'Verify My Humanity', payload: 'verify_human' },
            { label: 'Explore Twin Matrix', payload: 'twin_matrix' },
            { label: 'View Sample Tasks', payload: 'browse_tasks' }
        ]
    },

    // ============================================================
    // 1.2 HOW IT WORKS - PLATFORM EXPLAINER
    // ============================================================
    {
        id: 'how_it_works',
        triggers: ['how', 'how it works', 'explain', 'what is'],
        response: {
            text: "**How twin3 Works**\n\n**1. Connect** — Link your social accounts to verify your identity\n\n**2. Analyze** — AI generates your Twin Matrix Score (0-255) based on your content and engagement\n\n**3. Match** — Get matched with brand tasks tailored to your style and influence level\n\n**4. Earn** — Complete tasks to earn tokens and build your digital reputation\n\nReady to discover your value?",
            delay: 600
        },
        suggestedActions: [
            { label: 'Get Started', payload: 'verify_human' },
            { label: 'View Sample Tasks', payload: 'browse_tasks' }
        ]
    },

    // ============================================================
    // 1.5 TWIN MATRIX - 256D VISUALIZATION
    // ============================================================
    {
        id: 'twin_matrix',
        triggers: ['matrix', 'twin matrix', '256d', 'profile'],
        response: {
            text: "Here's your Twin Matrix — a 256-dimensional representation of your authentic self across 6 core dimensions. This forms the foundation of your soulbound identity in the AI era.",
            delay: 600,
            widget: 'twin_matrix'
        },
        suggestedActions: [
            { label: 'Mint SBT', payload: 'mint_sbt' },
            { label: 'Verify Account', payload: 'verify_human' },
            { label: 'Browse Tasks', payload: 'browse_tasks' }
        ]
    },

    // ============================================================
    // 1.6 VERIFICATION FLOW (User initiated)
    // ============================================================
    {
        id: 'verify_human',
        triggers: ['verify', 'verification', 'prove', 'human'],
        response: {
            text: "**Verify Humanity**\nSelect a verification method to prove you are human and unlock the Twin Matrix.",
            delay: 500,
            widget: 'human_verification'
        },
        suggestedActions: []
    },

    // ============================================================
    // 1.7 VERIFICATION REQUIRED (Task acceptance gate)
    // ============================================================
    {
        id: 'verification_required',
        triggers: [],
        response: {
            text: "**Verification Required**\nPlease complete a humanity check to proceed with this task.",
            delay: 600,
            widget: 'human_verification'
        },
        suggestedActions: []
    },

    // ============================================================
    // 1.8 VERIFICATION SUCCESS
    // ============================================================
    {
        id: 'verification_success',
        triggers: ['verified', 'success'],
        response: {
            text: "✅ **Verification Complete!**\n\nYour Instagram is now linked. Let's see your Twin Matrix Score!",
            delay: 500,
            widget: 'twin_matrix'
        },
        suggestedActions: [
            { label: 'Browse Tasks', payload: 'browse_tasks' },
            { label: 'View Dashboard', payload: 'dashboard' }
        ]
    },

    // ============================================================
    // 2. TASK OPPORTUNITY
    // ============================================================
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
            { label: 'Complete Verification', payload: 'verify_human' },
            { label: 'Browse Tasks', payload: 'browse_tasks' }
        ]
    },

    // ============================================================
    // 3. TASK DETAIL
    // ============================================================
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
            { label: 'Complete Verification', payload: 'verify_human' },
            { label: 'Browse Tasks', payload: 'browse_tasks' }
        ]
    },

    // ============================================================
    // 4. ACCEPT TASK CONFIRMATION
    // ============================================================
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

    // ============================================================
    // 5. DECLINE TASK
    // ============================================================
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

    // ============================================================
    // 6. DASHBOARD
    // ============================================================
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
    },

    // ============================================================
    // FALLBACK
    // ============================================================
    {
        id: 'fallback',
        triggers: [],
        response: {
            text: "Sorry, I don't quite understand.\n\nPlease try the options below:",
            delay: 300
        },
        suggestedActions: [
            { label: 'View Tasks', payload: 'browse_tasks' },
            { label: 'Dashboard', payload: 'dashboard' }
        ]
    }
];
