import type { TwinMatrixData } from '../features/twin-matrix/types';

// Initial Twin Matrix State - After completing first verification (Google reCAPTCHA v2)
// Only trait 00 (Humanity Index) is discovered with value 135

const generateInitialTraits = () => {
    const traits = [];

    for (let i = 0; i < 256; i++) {
        const id = i.toString(16).padStart(2, '0').toUpperCase();
        let dimension: 'physical' | 'social' | 'digital' | 'spiritual' = 'physical';

        if (i < 64) dimension = 'physical';
        else if (i < 128) dimension = 'social';
        else if (i < 192) dimension = 'digital';
        else dimension = 'spiritual';

        // Only trait 00 is discovered
        if (i === 0) {
            traits.push({
                id,
                dimension,
                name: 'Humanity Index',
                discovered: true,
                strength: 135, // 0-255 range
                unlockedAt: new Date().toISOString(),
                position: { row: 0, col: 0 }
            });
        } else {
            traits.push({
                id,
                dimension,
                name: `Trait ${id}`,
                discovered: false,
                strength: 0,
                position: {
                    row: Math.floor(i / 16),
                    col: i % 16
                }
            });
        }
    }

    return traits;
};

export const initialMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 1,
    journeyProgress: 0.39, // 1/256 = 0.39%
    avgStrength: 0,
    humanityIndex: 135,
    dimensions: {
        physical: {
            discovered: 1,
            total: 64,
            percentage: 1.56 // 1/64
        },
        social: {
            discovered: 0,
            total: 64,
            percentage: 0
        },
        digital: {
            discovered: 0,
            total: 64,
            percentage: 0
        },
        spiritual: {
            discovered: 0,
            total: 64,
            percentage: 0
        }
    },
    traits: generateInitialTraits()
};
