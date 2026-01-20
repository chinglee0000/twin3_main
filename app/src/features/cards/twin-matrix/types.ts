/**
 * Twin Matrix Type Definitions
 */

export type MatrixDimension = 'physical' | 'social' | 'digital' | 'spiritual';

export interface MatrixTrait {
    id: string; // Hex code: "00", "01", "4E", "FF" etc.
    dimension: MatrixDimension;
    discovered: boolean;
    strength?: number; // 0-100, trait strength (affects color intensity)
    position: {
        row: number; // 0-15
        col: number; // 0-15
    };
    // Extended info
    name?: string;
    description?: string;
    unlockedAt?: string; // ISO date string
    unlockedBy?: string; // Quest ID that unlocked this trait
}

export interface MatrixDimensionStats {
    discovered: number;
    total: number;
    percentage: number;
}

export interface TwinMatrixData {
    // Overall statistics
    totalTraits: number; // 256
    discoveredTraits: number;
    journeyProgress: number; // Percentage
    avgStrength: number; // Percentage
    humanityIndex: number;

    // 4 Dimensions
    dimensions: {
        physical: MatrixDimensionStats;
        digital: MatrixDimensionStats;
        social: MatrixDimensionStats;
        spiritual: MatrixDimensionStats;
    };

    // Hex Grid data
    traits: MatrixTrait[]; // 256 traits
    recentlyUnlockedTrait?: string; // Recently unlocked trait ID
}
