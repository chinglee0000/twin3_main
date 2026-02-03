/**
 * Info Nodes
 * 
 * Educational and informational content
 */

import type { InteractionNode } from '../../types/a2ui';

export const infoNodes: InteractionNode[] = [
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
    }
];

export const fallbackNode: InteractionNode = {
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
};
