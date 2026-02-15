// Interaction Inventory - The "Script" for Twin3

import type { InteractionInventory } from '../types/a2ui';
import { FAQ_INVENTORY } from './faqData';

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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Why Verify Humanity?', payload: 'why_verify' }
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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
        ]
    },

    // ============================================================
    // 1.6 VERIFICATION FLOW (User initiated) - Now starts with wallet binding
    // ============================================================
    {
        id: 'verify_human',
        triggers: ['verify', 'verification', 'prove', 'human'],
        response: {
            text: "**Connect Your Identity**\nFirst, let's bind your account. Choose a wallet connection method to get started.",
            delay: 500,
            widget: 'wallet_binding'
        },
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Why Verify Humanity?', payload: 'why_verify' }
        ]
    },

    // ============================================================
    // 1.6b BINDING SUCCESS → reCAPTCHA verification
    // ============================================================
    {
        id: 'binding_success',
        triggers: [],
        response: {
            text: "**Verify Humanity**\nGreat! Your identity is bound. Before your SBT can be minted, we need a quick verification to confirm you're a real human.",
            delay: 500,
            widget: 'recaptcha'
        },
        suggestedActions: [
            { label: 'Why Verify Humanity?', payload: 'why_verify' },
            { label: 'What is SBT?', payload: 'sbt_info' }
        ]
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
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Mint Free SBT', payload: 'verify_human' }
        ]
    },

    // ============================================================
    // 1.8 VERIFICATION SUCCESS
    // ============================================================
    {
        id: 'verification_success',
        triggers: ['verified', 'success'],
        response: {
            text: "**Verification Complete — You are now a Verified Human.**\n\nYour Soulbound Token (SBT) has been successfully minted on the BNB Chain, marking the birth of your Digital Twin.",
            delay: 500,
            widget: 'twin_matrix'
        },
        suggestedActions: [
            { label: 'View My Matrix', payload: 'twin_matrix' },
            { label: 'Claim Airdrop', payload: 'airdrop_claim' }
        ]
    },

    // ============================================================
    // 1.9 AIRDROP CLAIM (Score gating)
    // ============================================================
    {
        id: 'airdrop_claim',
        triggers: ['claim', 'airdrop', 'token'],
        response: {
            text: "**Airdrop Status**\nLet's check if you're eligible to claim your $twin3 tokens.",
            delay: 500,
            widget: 'airdrop_claim'
        },
        suggestedActions: [
            { label: 'How to increase score?', payload: 'matrix' },
            { label: 'Check Leaderboard', payload: 'leaderboard' }
        ]
    },

    // ============================================================
    // 1.10 REWARD DASHBOARD
    // ============================================================
    {
        id: 'show_rewards',
        triggers: ['rewards', 'balance', 'dashboard'],
        response: {
            text: "**Your Rewards**\nHere's your current $twin3 balance and completed missions.",
            delay: 500,
            widget: 'reward_dashboard'
        },
        suggestedActions: [
            { label: 'Invite Friends', payload: 'invite_friends' },
            { label: 'Join Community', payload: 'community_preview' }
        ]
    },

    // ============================================================
    // 1.11 INVITE FRIENDS
    // ============================================================
    {
        id: 'invite_friends',
        triggers: ['invite', 'referral', 'share'],
        response: {
            text: "**Invite Friends**\nShare your unique invite link to earn bonus $twin3 tokens.",
            delay: 500,
            widget: 'invite_friends'
        },
        suggestedActions: [
            { label: 'View Rewards', payload: 'show_rewards' },
            { label: 'Join Community', payload: 'community_preview' }
        ]
    },

    // ============================================================
    // 1.12 COMMUNITY PREVIEW
    // ============================================================
    {
        id: 'community_preview',
        triggers: ['community', 'future', 'upcoming'],
        response: {
            text: "**Community & Upcoming Tasks**\nExplore the twin3 community and preview future earning opportunities.",
            delay: 500,
            widget: 'community_preview'
        },
        suggestedActions: [
            { label: 'View Rewards', payload: 'show_rewards' },
            { label: 'Invite Friends', payload: 'invite_friends' }
        ]
    },

    // ============================================================
    // 1.13 AIRDROP TASK DASHBOARD (Demo Flow)
    // ============================================================
    {
        id: 'airdrop_tasks',
        triggers: ['boost', 'tasks', 'missions'],
        response: {
            text: "**Complete Missions to Maximize Your Airdrop**\n\nThe total airdrop pool is 10,000 $twin3. Your share is calculated based on your Matrix score and completed missions.\n\nComplete all 4 missions below to maximize your rewards!",
            delay: 500,
            widget: 'airdrop_task_dashboard'
        },
        suggestedActions: [
            { label: 'View My Matrix', payload: 'twin_matrix' }
        ]
    },

    // ============================================================
    // 1.14 FINAL REWARD (Demo Flow)
    // ============================================================
    {
        id: 'final_reward',
        triggers: ['final', 'complete'],
        response: {
            text: "**All Missions Complete!**\n\nCalculating your airdrop share...",
            delay: 500,
            widget: 'final_reward_dashboard'
        },
        suggestedActions: [
            { label: 'Invite Friends', payload: 'invite_friends' },
            { label: 'Join Community', payload: 'community_preview' }
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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is SBT?', payload: 'sbt_info' }
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
            { label: 'Mint Free SBT', payload: 'verify_human' },
            { label: 'What is the Roadmap?', payload: 'roadmap_info' },
            { label: 'Token Allocation?', payload: 'tokenomics_info' }
        ]
    },

    // ============================================================
    // 7. ROADMAP INFO
    // ============================================================
    {
        id: 'roadmap_info',
        triggers: ['roadmap', 'milestone', 'timeline', 'future', 'plans'],
        response: {
            text: "**Twin3 Roadmap (2026-2027)**\n\n• **Q1 2026 (Foundation)**: V2.0 Core Build, Web2 Bridge\n• **Q2 2026 (Ignition)**: Public Beta, Human Agent MVP, Airdrop #1\n• **Q3 2026 (PMF)**: Agentic Marketplace Beta, Airdrop #2\n• **Q4 2026 (Hypergrowth)**: Public API, DAO Governance\n\nCurrent Phase: **Foundation** (User Target: 10,000)",
            delay: 500
        },
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Mint Free SBT', payload: 'verify_human' }
        ]
    },

    // ============================================================
    // 8. TOKENOMICS INFO
    // ============================================================
    {
        id: 'tokenomics_info',
        triggers: ['token', 'allocation', 'economics', 'supply', 'airdrop'],
        response: {
            text: "**Token Allocation ($TWIN)**\n\n• **Community Incentive**: 30% (300M) - Task rewards & growth\n• **Core Team**: 25% (250M) - Long-term commitment\n• **Ecosystem Growth**: 15% (150M) - Partnerships & integrations\n• **Liquidity**: 8% (80M) - Market stability\n• **Airdrop**: 6% (60M) - Early supporters (Q2 & Q3 2026)\n\n**Total Supply**: 1,000,000,000",
            delay: 500
        },
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Mint Free SBT', payload: 'verify_human' }
        ]
    },

    // ============================================================
    // 9. SBT INFO
    // ============================================================
    {
        id: 'sbt_info',
        triggers: ['sbt', 'soulbound', 'token', 'what is sbt'],
        response: {
            text: "**What is an SBT?**\n\n**Soulbound Token (SBT)** is a permanent, non-transferable digital identity token on the blockchain.\n\nUnlike normal NFTs, it cannot be bought, sold, or transferred. It serves as your on-chain reputation proof, certifying that 'You are a unique human' without revealing sensitive personal data.",
            delay: 500
        },
        suggestedActions: [
            { label: 'Why Verify Humanity?', payload: 'why_verify' },
            { label: 'Mint Free SBT', payload: 'verify_human' }
        ]
    },

    // ============================================================
    // 10. WHY VERIFY
    // ============================================================
    {
        id: 'why_verify',
        triggers: ['why', 'benefit', 'reason', 'why verify'],
        response: {
            text: "**Why Verify Humanity?**\n\nVerification protects the twin3 ecosystem from bots and ensures fair rewards for real humans.\n\n**Benefits:**\n• **Unlock Earning**: Access premium tasks.\n• **Boost Trust**: Higher trust score = more opportunities.\n• **Governance**: Future voting rights in the DAO.",
            delay: 500
        },
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Mint Free SBT', payload: 'verify_human' }
        ]
    },

    // ============================================================
    // 11. FAQ & KNOWLEDGE BASE (Spread at the end)
    // ============================================================
    ...FAQ_INVENTORY
];
