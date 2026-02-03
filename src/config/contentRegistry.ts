/**
 * Content Registry
 * 
 * Context-specific content configurations
 * Controls copy, media, and rewards for each scenario
 * 
 * This can be replaced with API calls in production
 */

import type { ContextId, ContextContent } from '../types/context';

// =============================================================
// Content Registry
// =============================================================
export const CONTENT_REGISTRY: Record<ContextId, ContextContent> = {
    // Scenario A: New user with organic link
    new_user_organic: {
        heroTitle: 'Own Your Humanity with twin3',
        heroSubtitle: 'Transform your human warmth into a 256D Twin Matrix. Let your Personal Agent work and earn for you while you focus on living.',
        videoUrl: '/videos/intro.mp4',
        ctaText: 'Mint Free SBT',
        aiPromptContext: 'User is new and arrived organically. Introduce the platform, explain Twin Matrix and SBT concepts. Be welcoming and educational.',
    },

    // Scenario B: New user with task deeplink
    new_user_task: {
        heroTitle: 'A Brand Task is Waiting for You!',
        heroSubtitle: 'Complete this task to earn tokens and start building your digital reputation.',
        rewardMultiplier: 1.0,
        ctaText: 'View Task Details',
        aiPromptContext: 'User arrived via task deeplink and is interested in earning. Focus on task benefits and guide them to complete verification quickly to accept the task.',
    },

    // Scenario C: Returning user
    returning_user: {
        heroTitle: 'Welcome Back!',
        heroSubtitle: 'Check your latest task opportunities and Twin Matrix progress.',
        ctaText: 'Go to Dashboard',
        aiPromptContext: 'Returning registered user. Skip introductions entirely. Focus on new tasks, updates to their Twin Matrix, and any pending actions. Be concise and action-oriented.',
    },

    // KOL Referral
    kol_referral: {
        heroTitle: 'You\'ve Been Invited!',
        heroSubtitle: 'Join twin3 and get bonus rewards on your first completed task.',
        rewardMultiplier: 1.2, // 20% bonus
        ctaText: 'Claim Your Bonus',
        aiPromptContext: 'User was referred by a KOL. Mention this is a special invite with bonus rewards. Create a sense of exclusivity. Reference the referrer if available.',
    },

    // Campaign Landing
    campaign_landing: {
        heroTitle: 'Limited Time Offer!',
        heroSubtitle: 'Join our special campaign and unlock exclusive rewards.',
        rewardMultiplier: 1.5, // 50% bonus
        ctaText: 'Join Campaign',
        aiPromptContext: 'User is from a marketing campaign. Emphasize urgency and limited availability. Highlight special campaign rewards and time-sensitive offers.',
    },
};

/**
 * Get content for a given context
 */
export function getContextContent(contextId: ContextId): ContextContent {
    return CONTENT_REGISTRY[contextId] || CONTENT_REGISTRY.new_user_organic;
}

/**
 * Interpolate dynamic values in content strings
 * Replaces {key} placeholders with actual values
 */
export function interpolateContent(
    template: string,
    values: Record<string, string>
): string {
    let result = template;
    for (const [key, value] of Object.entries(values)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    return result;
}

/**
 * Get AI system prompt addition for a context
 */
export function getAIContextPrompt(contextId: ContextId): string {
    const content = getContextContent(contextId);
    return content.aiPromptContext;
}
