/**
 * Twin Matrix Utility Functions
 */

import type { MatrixTrait } from './types';

/**
 * Twin Matrix Dimension Colors
 * 
 * | Dimension    | Dark Mode  | Light Mode |
 * |--------------|------------|------------|
 * | Physical     | #137cec    | #e7f2fd    |
 * | Social       | #21c45d    | #e9fbf0    |
 * | Digital      | #8a2ce2    | #f3e9fc    |
 * | Spiritual    | #f08228    | #fdf1e7    |
 * | Undiscovered | #dedfe3    | #dedfe3    |
 */

const DIMENSION_COLORS = {
    physical: {
        dark: '#137cec',
        light: '#e7f2fd',
    },
    social: {
        dark: '#21c45d',
        light: '#e9fbf0',
    },
    digital: {
        dark: '#8a2ce2',
        light: '#f3e9fc',
    },
    spiritual: {
        dark: '#f08228',
        light: '#fdf1e7',
    },
    undiscovered: '#dedfe3',
};

/**
 * Get trait color based on dimension and discovered state
 */
export function getTraitColor(trait: MatrixTrait, mode: 'dark' | 'light' = 'dark'): string {
    if (!trait.discovered) {
        return DIMENSION_COLORS.undiscovered;
    }

    return DIMENSION_COLORS[trait.dimension][mode];
}

/**
 * Get trait background color (light version for discovered traits)
 */
export function getTraitBackgroundColor(trait: MatrixTrait): string {
    if (!trait.discovered) {
        return DIMENSION_COLORS.undiscovered;
    }

    return DIMENSION_COLORS[trait.dimension].light;
}

/**
 * Get display range (8x8) centered on a specific trait
 * Used for focused view mode
 */
export function getDisplayRange(
    recentTraitId: string,
    allTraits: MatrixTrait[],
    gridSize: number = 8
): MatrixTrait[] {
    const recentTrait = allTraits.find((t) => t.id === recentTraitId);
    if (!recentTrait) return allTraits.slice(0, 64);

    const { row, col } = recentTrait.position;

    // Calculate display range starting position
    const startRow = Math.max(0, Math.min(16 - gridSize, row - Math.floor(gridSize / 2)));
    const startCol = Math.max(0, Math.min(16 - gridSize, col - Math.floor(gridSize / 2)));

    // Extract traits in the grid range
    const displayTraits: MatrixTrait[] = [];
    for (let r = startRow; r < startRow + gridSize; r++) {
        for (let c = startCol; c < startCol + gridSize; c++) {
            const trait = allTraits.find((t) => t.position.row === r && t.position.col === c);
            if (trait) displayTraits.push(trait);
        }
    }

    return displayTraits;
}

/**
 * Get dimension from hex ID
 */
export function getDimensionFromHexId(hexId: string): 'physical' | 'social' | 'digital' | 'spiritual' {
    const decimalValue = parseInt(hexId, 16);

    if (decimalValue <= 0x3f) return 'physical';
    if (decimalValue <= 0x7f) return 'social';
    if (decimalValue <= 0xbf) return 'digital';
    return 'spiritual';
}
