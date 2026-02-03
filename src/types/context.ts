/**
 * Context Types for twin3 Context-Aware Routing System
 * 
 * Defines types for URL parameters, user states, and application context
 */

// Entry source types
export type EntrySource =
    | 'organic'       // Direct visit
    | 'kol_referral'  // KOL share link (?ref=xxx)
    | 'task_deeplink' // Task deep link (?task_id=xxx)
    | 'campaign';     // Marketing campaign

// User registration states
export type UserStatus =
    | 'anonymous'   // Not verified, no wallet
    | 'verified'    // Completed humanity verification
    | 'registered'  // Connected wallet
    | 'premium';    // Premium user

// Context IDs for different scenarios
export type ContextId =
    | 'new_user_organic'    // Scenario A: New user + organic link
    | 'new_user_task'       // Scenario B: New user + task deeplink
    | 'returning_user'      // Scenario C: Returning registered user
    | 'kol_referral'        // KOL referral link
    | 'campaign_landing';   // Campaign landing page

// URL parameter structure
export interface URLContext {
    taskId?: string;        // ?task_id=xxx
    ref?: string;           // ?ref=kol_name
    campaign?: string;      // ?campaign=xxx
    utm_source?: string;    // ?utm_source=xxx
    utm_medium?: string;
    utm_campaign?: string;
}

// Flow step definition
export interface FlowStep {
    id: string;
    widget: string;
    required: boolean;
    skipCondition?: (context: AppContext) => boolean;
}

// Flow configuration
export interface FlowConfig {
    contextId: ContextId;
    steps: FlowStep[];
    welcomeNodeId: string;  // ID in inventory.ts to trigger
    aiSystemPromptAddition?: string;
}

// Context-specific content
export interface ContextContent {
    heroTitle: string;
    heroSubtitle: string;
    videoUrl?: string;
    rewardMultiplier?: number;
    ctaText: string;
    aiPromptContext: string;
}

// Complete application context
export interface AppContext {
    // Entry detection
    entrySource: EntrySource;
    urlParams: URLContext;

    // User state
    userStatus: UserStatus;
    walletAddress?: string;
    humanityScore?: number;

    // Resolved context
    contextId: ContextId;

    // Flow control
    currentStep: string;
    completedSteps: string[];

    // Metadata
    referrerKol?: string;
    campaignId?: string;
}
