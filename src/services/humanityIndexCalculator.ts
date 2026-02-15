/**
 * Humanity Index Calculator
 * 
 * Calculates the Humanity Index score (0-255) based on various user behaviors
 * 
 * Formula: Humanity Index = Σ(dimension_score × weight)
 * 
 * Dimensions:
 * 1. Human Verification - 30% (76.5/255)
 * 2. Task Completion - 25% (63.75/255)
 * 3. Social Binding - 20% (51/255)
 * 4. Wallet Binding - 15% (38.25/255)
 * 5. Community Engagement - 10% (25.5/255)
 */

const MAX_SCORE = 255;

// Dimension weights (must sum to 1.0)
export const DIMENSION_WEIGHTS = {
    humanVerification: 0.30,    // 30%
    taskCompletion: 0.25,       // 25%
    socialBinding: 0.20,        // 20%
    walletBinding: 0.15,        // 15%
    communityEngagement: 0.10,  // 10%
} as const;

// Maximum scores per dimension
export const MAX_DIMENSION_SCORES = {
    humanVerification: MAX_SCORE * DIMENSION_WEIGHTS.humanVerification,      // 76.5
    taskCompletion: MAX_SCORE * DIMENSION_WEIGHTS.taskCompletion,           // 63.75
    socialBinding: MAX_SCORE * DIMENSION_WEIGHTS.socialBinding,             // 51
    walletBinding: MAX_SCORE * DIMENSION_WEIGHTS.walletBinding,             // 38.25
    communityEngagement: MAX_SCORE * DIMENSION_WEIGHTS.communityEngagement, // 25.5
} as const;

export interface HumanityIndexComponents {
    humanVerification: number;      // 0-1.0 (completion ratio)
    taskCompletion?: number;        // 0-1.0 (completion ratio)
    socialBinding?: number;         // 0-1.0 (completion ratio)
    walletBinding?: number;         // 0 or 1 (boolean)
    communityEngagement?: number;   // 0-1.0 (engagement score)
}

/**
 * Calculate Humanity Index from component scores
 * 
 * @param components - Object containing completion ratios for each dimension
 * @returns Humanity Index score (0-255)
 */
export function calculateHumanityIndex(components: HumanityIndexComponents): number {
    const {
        humanVerification = 0,
        taskCompletion = 0,
        socialBinding = 0,
        walletBinding = 0,
        communityEngagement = 0,
    } = components;

    // Calculate weighted scores
    const humanVerificationScore = humanVerification * MAX_DIMENSION_SCORES.humanVerification;
    const taskCompletionScore = taskCompletion * MAX_DIMENSION_SCORES.taskCompletion;
    const socialBindingScore = socialBinding * MAX_DIMENSION_SCORES.socialBinding;
    const walletBindingScore = walletBinding * MAX_DIMENSION_SCORES.walletBinding;
    const communityEngagementScore = communityEngagement * MAX_DIMENSION_SCORES.communityEngagement;

    // Sum all scores
    const totalScore = 
        humanVerificationScore +
        taskCompletionScore +
        socialBindingScore +
        walletBindingScore +
        communityEngagementScore;

    // Round to nearest integer and cap at MAX_SCORE
    return Math.round(Math.min(totalScore, MAX_SCORE));
}

/**
 * Calculate Human Verification component score
 * 
 * @param completedWeight - Sum of weights from completed verification methods (0-1.0)
 * @returns Human Verification score contribution (0-76.5)
 */
export function calculateHumanVerificationScore(completedWeight: number): number {
    return Math.round(completedWeight * MAX_DIMENSION_SCORES.humanVerification);
}

/**
 * Get percentage for a dimension based on its score
 * 
 * @param dimensionScore - Score for a specific dimension
 * @param maxDimensionScore - Maximum possible score for that dimension
 * @returns Percentage (0-100)
 */
export function getDimensionPercentage(dimensionScore: number, maxDimensionScore: number): number {
    return Math.round((dimensionScore / maxDimensionScore) * 100);
}

/**
 * Convert Humanity Index to percentage
 * 
 * @param humanityIndex - Humanity Index score (0-255)
 * @returns Percentage (0-100)
 */
export function humanityIndexToPercentage(humanityIndex: number): number {
    return Math.round((humanityIndex / MAX_SCORE) * 100);
}
