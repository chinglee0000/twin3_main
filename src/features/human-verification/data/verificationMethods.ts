import type { VerificationMethod } from '../components/types';

/**
 * Verification Methods Configuration - POC Version
 * 
 * For POC, we only have 2 verification methods:
 * 1. Google reCAPTCHA v3 = 0.5 score
 * 2. iOS/Android Biometric = 0.5 score
 * 
 * Total possible score = 1.0 (when both completed)
 * 
 * Weight represents the contribution to Humanity Index (0-1 scale)
 * Formula: Humanity Index = Σ(weight_i) × 255
 */
export const verificationMethods: VerificationMethod[] = [
    {
        id: 'recaptcha-v3',
        name: 'Google reCAPTCHA v3',
        icon: 'ShieldCheck',
        weight: 0.5  // 0.5 score when completed
    },
    {
        id: 'biometric-auth',
        name: 'iOS/Android Biometric',
        icon: 'Fingerprint',
        weight: 0.5  // 0.5 score when completed
    }
];

/**
 * Calculate Humanity Index from completed verification methods
 * Returns a value between 0 and 255
 */
export function calculateHumanityIndex(completedMethodIds: string[]): number {
    const totalWeight = completedMethodIds.reduce(
        (sum, id) => {
            const method = verificationMethods.find(m => m.id === id);
            return sum + (method?.weight || 0);
        },
        0
    );

    // Cap at 1.0 to prevent exceeding 255
    const normalizedWeight = Math.min(totalWeight, 1.0);
    return Math.round(normalizedWeight * 255);
}

/**
 * Default completed methods for POC demo
 */
export const defaultCompletedMethods: string[] = [];

