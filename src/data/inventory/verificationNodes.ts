/**
 * Verification Flow Nodes
 * 
 * Humanity verification journey
 */

import type { InteractionNode } from '../../types/a2ui';

export const verificationNodes: InteractionNode[] = [
    {
        id: 'verify_human',
        triggers: ['verify', 'verification', 'prove', 'human'],
        response: {
            text: "**Verify Humanity**\nSelect a verification method to prove you are human and unlock the Twin Matrix. The Humanity Index measures the likelihood that you are a real person and is the fundamental building block of trust in the decentralised community.",
            delay: 500,
            widget: 'human_verification'
        },
        suggestedActions: [
            { label: 'What is SBT?', payload: 'sbt_info' },
            { label: 'Why Verify Humanity?', payload: 'why_verify' }
        ]
    },

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

    {
        id: 'verification_success',
        triggers: ['verified', 'success'],
        response: {
            text: "**Verification Complete** — You are now a Verified Human.\n\nYour Twin Matrix is being initialized...",
            delay: 500,
            widget: 'twin_matrix'
        },
        suggestedActions: [
            { label: 'View My Matrix', payload: 'twin_matrix' },
            { label: 'What is SBT?', payload: 'sbt_info' }
        ]
    }
];
