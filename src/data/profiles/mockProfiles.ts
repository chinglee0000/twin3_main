/**
 * POC Flow Mock Data for HumanVerification Widget
 * 
 * Creates matrix data matching POC_FLOW.md requirements:
 * - Initial: Only trait 00 (Humanity Index = 135/255)
 * - KOL: Travel KOL with multiple traits from spec
 */

import type { MatrixTrait, TwinMatrixData } from '../../features/twin-matrix/types';
import { getDimensionFromHexId } from '../../features/twin-matrix/utils';


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

export { travelKOLMatrixData } from '../matrix/twinMatrixMockData';

// KOL Persona Info
export const travelKOLInfo = {
    name: 'TravelWithMia',
    followers: '5,000',
    niche: 'Travel Content Creator',
    gender: 'Female',
    verified: true,
};
