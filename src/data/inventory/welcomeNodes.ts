/**
 * Welcome Flow Nodes
 * 
 * Initial user journey: welcome, how it works, twin matrix intro
 */

import type { InteractionNode } from '../../types/a2ui';

export const welcomeNodes: InteractionNode[] = [
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
    }
];
