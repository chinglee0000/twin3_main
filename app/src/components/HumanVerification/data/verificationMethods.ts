import type { VerificationMethod } from '../types';

/**
 * Verification Methods Configuration
 * Based on humanityIndexBoost.md specification
 * 
 * Weight represents the contribution to Humanity Index (0-255)
 * Formula: Humanity Index = Σ(weight_i × completion_i) × 255
 * 
 * Note: recaptcha-v2 removed per user request
 */
export const verificationMethods: VerificationMethod[] = [
    {
        id: 'recaptcha-v3',
        name: 'Google reCAPTCHA v3',
        icon: 'ShieldCheck',
        weight: 0.20
    },
    {
        id: 'sms-verification',
        name: 'SMS Verification',
        icon: 'Smartphone',
        weight: 0.25
    },
    {
        id: 'biometric-liveness',
        name: 'Liveness Detection',
        icon: 'UserCheck',
        weight: 0.40
    },
    {
        id: 'social-auth',
        name: 'Social Identity Link',
        icon: 'Users',
        weight: 0.18
    },
    {
        id: 'wallet-signature',
        name: 'Web3 Wallet Signature',
        icon: 'Wallet',
        weight: 0.22
    },
    {
        id: 'poh-sbt',
        name: 'Proof of Humanity',
        icon: 'Award',
        weight: 0.35
    },
    {
        id: 'image-puzzle',
        name: 'Visual Puzzle',
        icon: 'Puzzle',
        weight: 0.12
    },
    {
        id: 'behavioral-biometrics',
        name: 'Behavioral Analysis',
        icon: 'Fingerprint',
        weight: 0.16
    },
    {
        id: 'hardware-key',
        name: 'Hardware Security Key',
        icon: 'Key',
        weight: 0.28
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
