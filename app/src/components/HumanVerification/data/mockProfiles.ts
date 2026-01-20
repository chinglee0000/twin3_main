/**
 * POC Flow Mock Data for HumanVerification Widget
 * 
 * Creates matrix data matching POC_FLOW.md requirements:
 * - Initial: Only trait 00 (Humanity Index = 135/255)
 * - KOL: Travel KOL with multiple traits from spec
 */

import type { MatrixTrait, TwinMatrixData } from '../../../features/cards/twin-matrix/types';
import { getDimensionFromHexId } from '../../../features/cards/twin-matrix/utils';

// POC Trait Definitions
const pocTraitDefinitions: Record<string, { name: string; description: string }> = {
    // Physical dimension (POC_FLOW specified)
    '00': { name: 'Humanity Index', description: 'Basic human verification score' },
    '01': { name: 'Identity Strength', description: 'Identity authentication strength' },
    '03': { name: 'Presence Score', description: 'Online presence rating' },
    '21': { name: 'Engagement Rate', description: 'Interaction participation rate' },

    // Social dimension
    '40': { name: 'Community Trust', description: 'Community trust level' },
    '41': { name: 'Influence Score', description: 'Influence rating' },
    '4D': { name: 'Follower Quality', description: 'Follower quality rating' },
    '4E': { name: 'Collaboration Grade', description: 'Collaboration rating' },

    // Digital dimension
    '80': { name: 'Content Authenticity', description: 'Content authenticity level' },
    '90': { name: 'Profile Verification', description: 'Profile verification level' },
    'AC': { name: 'Platform Activity', description: 'Platform activity level' },
    'AD': { name: 'Cross-platform Score', description: 'Cross-platform verification score' },

    // Spiritual dimension
    'C2': { name: 'Value Alignment', description: 'Value consistency' },
    'D2': { name: 'Purpose Clarity', description: 'Goal clarity' },
    'D4': { name: 'Vision Strength', description: 'Vision strength' },
};

/**
 * Generate base 256-trait matrix (all undiscovered)
 */
function generateBaseTraitMatrix(): MatrixTrait[] {
    const traits: MatrixTrait[] = [];

    for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 16; col++) {
            const hexId = (row * 16 + col).toString(16).toUpperCase().padStart(2, '0');
            const dimension = getDimensionFromHexId(hexId);
            const definition = pocTraitDefinitions[hexId];

            traits.push({
                id: hexId,
                dimension,
                discovered: false,
                strength: 0,
                position: { row, col },
                name: definition?.name,
                description: definition?.description,
            });
        }
    }

    return traits;
}

/**
 * Create matrix with specific traits discovered
 */
function createMatrixWithTraits(
    discoveredTraits: Record<string, number>
): MatrixTrait[] {
    const baseTraits = generateBaseTraitMatrix();

    return baseTraits.map(trait => {
        const strength = discoveredTraits[trait.id];
        if (strength !== undefined) {
            return {
                ...trait,
                discovered: true,
                strength,
            };
        }
        return trait;
    });
}

/**
 * Calculate dimension stats from traits
 */
function calculateDimensionStats(traits: MatrixTrait[]) {
    const stats = {
        physical: { discovered: 0, total: 64, percentage: 0 },
        social: { discovered: 0, total: 64, percentage: 0 },
        digital: { discovered: 0, total: 64, percentage: 0 },
        spiritual: { discovered: 0, total: 64, percentage: 0 },
    };

    traits.forEach(trait => {
        if (trait.discovered) {
            stats[trait.dimension].discovered++;
        }
    });

    Object.keys(stats).forEach(key => {
        const dim = stats[key as keyof typeof stats];
        dim.percentage = Math.round((dim.discovered / dim.total) * 100);
    });

    return stats;
}

// ============================================================
// POC Initial Matrix Data (Only Humanity Index trait)
// ============================================================

const initialDiscoveredTraits: Record<string, number> = {
    '00': 135, // Humanity Index = 135/255 as per POC_FLOW.md
};

const initialTraits = createMatrixWithTraits(initialDiscoveredTraits);

export const initialMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 1,
    journeyProgress: 0, // 1/256 ≈ 0%
    avgStrength: 53, // 135/255 ≈ 53%
    humanityIndex: 135,

    dimensions: calculateDimensionStats(initialTraits),
    traits: initialTraits,
    recentlyUnlockedTrait: '00',
};

// ============================================================
// Travel KOL Matrix Data (Complete specification from KOL mockup data.md)
// ============================================================

const travelKOLDiscoveredTraits: Record<string, number> = {
    // Physical Dimension (6 traits)
    '00': 135, // Humanity Index
    '01': 168, // Physical Fitness Score
    '03': 198, // Earth Coordinates
    '07': 95,  // Sleep Patterns
    '08': 122, // Dietary Habits
    '33': 185, // Physical Activity Level

    // Social Dimension (10 traits)
    '40': 215, // Social Frequency
    '41': 192, // Social Media Influencer
    '42': 178, // Relationship Network
    '44': 155, // Friendship Level
    '47': 188, // Social Skills
    '4C': 172, // Humor Sense
    '4D': 205, // Extroversion
    '4E': 218, // Openness
    '53': 195, // Public Expression
    '54': 182, // Social Participation

    // Digital Dimension (10 traits)
    '80': 208, // Internet OG Sharing
    '81': 165, // Digital Literacy
    '87': 118, // Cybersecurity Awareness
    '8C': 225, // Digital Content Consumption
    '8E': 88,  // Online Learning Engagement
    '90': 232, // Digital Content Creation
    '91': 145, // E-Commerce Expertise
    '92': 175, // User Experience Empathy
    'AC': 198, // Communication Skills
    'AD': 192, // Social Media Influencer

    // Spiritual Dimension (12 traits)
    'C1': 68,  // MBTI
    'C2': 210, // Lifestyle Attitudes
    'C3': 132, // Astrology
    'C4': 148, // Intelligence Quotient
    'C5': 195, // Personality Traits
    'C6': 178, // Emotional Intelligence
    'C8': 72,  // Mindfulness
    'C9': 188, // Gratitude Level
    'CA': 162, // Purpose in Life
    'D1': 202, // Hope
    'D2': 215, // Optimism
    'D4': 185, // Life Satisfaction
};

const kolTraits = createMatrixWithTraits(travelKOLDiscoveredTraits);

export const travelKOLMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 38, // Exact count from specification
    journeyProgress: 14.8, // Exact percentage from specification
    avgStrength: 67.1, // Exact average from specification (171.2/255)
    humanityIndex: 135,

    dimensions: {
        physical: { discovered: 6, total: 64, percentage: 9 },
        social: { discovered: 10, total: 64, percentage: 16 },
        digital: { discovered: 10, total: 64, percentage: 16 },
        spiritual: { discovered: 12, total: 64, percentage: 19 },
    },
    traits: kolTraits,
    recentlyUnlockedTrait: 'D4',
};

// KOL Persona Info
export const travelKOLInfo = {
    name: 'TravelWithMia',
    followers: '5,000',
    niche: '旅遊 KOL',
    gender: '女',
    verified: true,
};
