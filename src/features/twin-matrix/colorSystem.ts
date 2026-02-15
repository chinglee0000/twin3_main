/**
 * Twin Matrix Color System
 * 
 * Provides color grading based on trait strength (0-255)
 * Each dimension has 3 levels: weak (0-85), medium (86-170), strong (171-255)
 */

export type MatrixDimension = 'physical' | 'digital' | 'social' | 'spiritual';

export interface DimensionColors {
    level1: string; // 0-85: weak
    level2: string; // 86-170: medium
    level3: string; // 171-255: strong
}

export const DIMENSION_COLOR_SYSTEM: Record<MatrixDimension, DimensionColors> = {
    physical: {
        level1: '#FF6B6B', // Light red
        level2: '#E63946', // Medium red
        level3: '#D02800', // Deep red
    },
    digital: {
        level1: '#74C0FC', // Light blue
        level2: '#4DABF7', // Medium blue
        level3: '#3F88C5', // Deep blue
    },
    social: {
        level1: '#FFE066', // Light yellow
        level2: '#FFD43B', // Medium yellow
        level3: '#FFBA08', // Deep yellow
    },
    spiritual: {
        level1: '#63E6BE', // Light teal
        level2: '#38D9A9', // Medium teal
        level3: '#1A9E8F', // Deep teal
    },
};

/**
 * Get color for a trait based on its strength
 * 
 * @param dimension - The dimension of the trait
 * @param strength - The strength value (0-255)
 * @returns Hex color code
 */
export function getTraitColor(dimension: MatrixDimension, strength: number): string {
    const colors = DIMENSION_COLOR_SYSTEM[dimension];
    
    if (strength <= 85) {
        return colors.level1;
    } else if (strength <= 170) {
        return colors.level2;
    } else {
        return colors.level3;
    }
}

/**
 * Get color level for a trait
 * 
 * @param strength - The strength value (0-255)
 * @returns Level number (1, 2, or 3)
 */
export function getColorLevel(strength: number): 1 | 2 | 3 {
    if (strength <= 85) return 1;
    if (strength <= 170) return 2;
    return 3;
}

/**
 * Check if a trait was recently unlocked (within last 30 seconds)
 * 
 * @param unlockedAt - ISO date string of when trait was unlocked
 * @returns Boolean indicating if trait is newly unlocked
 */
export function isRecentlyUnlocked(unlockedAt?: string): boolean {
    if (!unlockedAt) return false;
    
    const unlockedTime = new Date(unlockedAt).getTime();
    const now = Date.now();
    const thirtySecondsAgo = now - 30000; // Increased from 10s to 30s for better UX
    
    return unlockedTime > thirtySecondsAgo;
}
