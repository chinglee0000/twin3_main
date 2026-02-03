/**
 * Flow Configs
 * 
 * Data-driven flow configurations for different contexts
 * Each flow defines the steps and widgets to display
 */

import type { ContextId, FlowConfig, AppContext } from '../types/context';

// =============================================================
// Scenario A: New User + Organic Link
// Flow: [Intro Video] -> [reCAPTCHA/Verification] -> [Registration]
// =============================================================
const newUserOrganicFlow: FlowConfig = {
    contextId: 'new_user_organic',
    welcomeNodeId: 'welcome',
    steps: [
        {
            id: 'intro',
            widget: 'FeatureGrid',
            required: true
        },
        {
            id: 'humanity_check',
            widget: 'HumanVerification',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus !== 'anonymous'
        },
        {
            id: 'registration',
            widget: 'WalletConnect',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus === 'registered'
        },
    ],
    aiSystemPromptAddition: 'User is new to the platform. Introduce twin3 concepts and guide through verification.',
};

// =============================================================
// Scenario B: New User + Task Deeplink
// Flow: [Task Preview] -> [reCAPTCHA/Verification] -> [Registration]
// =============================================================
const newUserTaskFlow: FlowConfig = {
    contextId: 'new_user_task',
    welcomeNodeId: 'browse_tasks',
    steps: [
        {
            id: 'task_preview',
            widget: 'TaskDetailWidget',
            required: true
        },
        {
            id: 'humanity_check',
            widget: 'HumanVerification',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus !== 'anonymous'
        },
        {
            id: 'registration',
            widget: 'WalletConnect',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus === 'registered'
        },
    ],
    aiSystemPromptAddition: 'User arrived via task deeplink. Prioritize task completion and emphasize task rewards.',
};

// =============================================================
// Scenario C: Returning User
// Flow: [Auto-detect identity] -> [Dashboard]
// =============================================================
const returningUserFlow: FlowConfig = {
    contextId: 'returning_user',
    welcomeNodeId: 'dashboard',
    steps: [
        {
            id: 'dashboard',
            widget: 'GlobalDashboard',
            required: false
        },
    ],
    aiSystemPromptAddition: 'Returning user. Skip introductions, focus on actionable tasks and updates.',
};

// =============================================================
// KOL Referral Link
// Similar to organic but with referral tracking
// =============================================================
const kolReferralFlow: FlowConfig = {
    contextId: 'kol_referral',
    welcomeNodeId: 'welcome',
    steps: [
        {
            id: 'referral_intro',
            widget: 'FeatureGrid',
            required: true
        },
        {
            id: 'humanity_check',
            widget: 'HumanVerification',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus !== 'anonymous'
        },
        {
            id: 'registration',
            widget: 'WalletConnect',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus === 'registered'
        },
    ],
    aiSystemPromptAddition: 'User was referred by a KOL. Mention referral bonus and the KOL who referred them.',
};

// =============================================================
// Campaign Landing
// Special campaign-specific flow
// =============================================================
const campaignLandingFlow: FlowConfig = {
    contextId: 'campaign_landing',
    welcomeNodeId: 'welcome',
    steps: [
        {
            id: 'campaign_intro',
            widget: 'FeatureGrid',
            required: true
        },
        {
            id: 'humanity_check',
            widget: 'HumanVerification',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus !== 'anonymous'
        },
        {
            id: 'registration',
            widget: 'WalletConnect',
            required: true,
            skipCondition: (ctx: AppContext) => ctx.userStatus === 'registered'
        },
    ],
    aiSystemPromptAddition: 'Campaign user. Emphasize time-limited offers and urgency.',
};

// =============================================================
// Flow Config Registry
// =============================================================
export const FLOW_CONFIGS: Record<ContextId, FlowConfig> = {
    new_user_organic: newUserOrganicFlow,
    new_user_task: newUserTaskFlow,
    returning_user: returningUserFlow,
    kol_referral: kolReferralFlow,
    campaign_landing: campaignLandingFlow,
};

/**
 * Get flow config for a given context
 */
export function getFlowConfig(contextId: ContextId): FlowConfig {
    return FLOW_CONFIGS[contextId] || newUserOrganicFlow;
}

/**
 * Get next step in flow based on current state
 */
export function getNextStep(
    contextId: ContextId,
    completedSteps: string[],
    appContext: AppContext
): string | null {
    const flow = getFlowConfig(contextId);

    for (const step of flow.steps) {
        // Skip if already completed
        if (completedSteps.includes(step.id)) continue;

        // Check skip condition
        if (step.skipCondition && step.skipCondition(appContext)) continue;

        return step.id;
    }

    return null; // All steps completed
}
