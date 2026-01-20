/**
 * Travel KOL Matrix Data - 5000 followers female travel influencer
 * Persona: Active content creator, optimistic, highly social
 */

import type { TwinMatrixData, MatrixTrait } from '../features/cards/twin-matrix/types';
import { getDimensionFromHexId } from '../features/cards/twin-matrix/utils';

// Key trait definitions for Travel KOL
const kolTraitValues: Record<string, { name: string; strength: number; description: string }> = {
    // Physical Dimension
    '00': { name: 'Humanity Index', strength: 135, description: '完成 Google reCAPTCHA 驗證' },
    '01': { name: 'Physical Fitness Score', strength: 168, description: '旅遊需要中上體力' },
    '03': { name: 'Earth Coordinates', strength: 198, description: '頻繁移動的地理足跡' },
    '07': { name: 'Sleep Patterns', strength: 95, description: '時差影響睡眠品質' },
    '08': { name: 'Dietary Habits', strength: 122, description: '旅行中飲食不規律' },
    '33': { name: 'Physical Activity Level', strength: 185, description: '高旅遊活動量' },

    // Social Dimension
    '40': { name: 'Social Frequency', strength: 215, description: '社交平台高度活躍' },
    '41': { name: 'Social Media Influencer', strength: 192, description: '5000 粉中等影響力' },
    '42': { name: 'Relationship Network', strength: 178, description: '廣泛社交網絡' },
    '44': { name: 'Friendship Level', strength: 155, description: '中等親密友誼' },
    '47': { name: 'Social Skills', strength: 188, description: '良好社交能力' },
    '4C': { name: 'Humor Sense', strength: 172, description: '內容創作幽默感' },
    '4D': { name: 'Extroversion', strength: 205, description: '高度外向性格' },
    '4E': { name: 'Openness', strength: 218, description: '對新事物極度開放' },
    '53': { name: 'Public Expression', strength: 195, description: '樂於公開表達' },
    '54': { name: 'Social Participation', strength: 182, description: '積極參與活動' },

    // Digital Dimension
    '80': { name: 'Internet OG Sharing', strength: 208, description: '頻繁分享旅遊內容' },
    '81': { name: 'Digital Literacy', strength: 165, description: '中上數位素養' },
    '87': { name: 'Cybersecurity Awareness', strength: 118, description: '一般安全意識' },
    '8C': { name: 'Digital Content Consumption', strength: 225, description: '大量消費旅遊內容' },
    '8E': { name: 'Online Learning Engagement', strength: 88, description: '較少線上學習' },
    '90': { name: 'Digital Content Creation', strength: 232, description: '高頻內容創作' },
    '91': { name: 'E-Commerce Expertise', strength: 145, description: '中等電商能力' },
    '92': { name: 'User Experience Empathy', strength: 175, description: '理解受眾需求' },
    'AC': { name: 'Communication Skills', strength: 198, description: '優秀線上溝通' },
    'AD': { name: 'Social Media Influencer', strength: 192, description: 'Digital 維度影響力' },

    // Spiritual Dimension
    'C1': { name: 'MBTI', strength: 68, description: 'ENFP 性格類型' },
    'C2': { name: 'Lifestyle Attitudes', strength: 210, description: '積極樂觀生活態度' },
    'C3': { name: 'Astrology', strength: 132, description: '中等占星興趣' },
    'C4': { name: 'Intelligence Quotient', strength: 148, description: '中上智商' },
    'C5': { name: 'Personality Traits', strength: 195, description: '開朗活潑性格' },
    'C6': { name: 'Emotional Intelligence', strength: 178, description: '良好情商' },
    'C8': { name: 'Mindfulness', strength: 72, description: '較少正念練習' },
    'C9': { name: 'Gratitude Level', strength: 188, description: '旅遊培養感恩心' },
    'CA': { name: 'Purpose in Life', strength: 162, description: '明確人生目標' },
    'D1': { name: 'Hope', strength: 202, description: '高度希望感' },
    'D2': { name: 'Optimism', strength: 215, description: '極度樂觀' },
    'D4': { name: 'Life Satisfaction', strength: 185, description: '高生活滿意度' },
};

// Generate all 256 traits
const generateKOLTraits = (): MatrixTrait[] => {
    const traits: MatrixTrait[] = [];

    for (let i = 0; i < 256; i++) {
        const hexId = i.toString(16).toUpperCase().padStart(2, '0');
        const dimension = getDimensionFromHexId(hexId);
        const row = Math.floor(i / 16);
        const col = i % 16;

        const traitData = kolTraitValues[hexId];
        const isDiscovered = !!traitData;

        traits.push({
            id: hexId,
            dimension: dimension,
            discovered: isDiscovered,
            strength: traitData?.strength,
            position: { row, col },
            name: traitData?.name,
            description: traitData?.description,
            unlockedAt: isDiscovered ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        });
    }

    return traits;
};

const traits = generateKOLTraits();
const discoveredTraits = traits.filter(t => t.discovered).length;
const discoveredPhysical = traits.filter(t => t.discovered && t.dimension === 'physical').length;
const discoveredSocial = traits.filter(t => t.discovered && t.dimension === 'social').length;
const discoveredDigital = traits.filter(t => t.discovered && t.dimension === 'digital').length;
const discoveredSpiritual = traits.filter(t => t.discovered && t.dimension === 'spiritual').length;

// Calculate average strength from discovered traits
const totalStrength = traits.filter(t => t.discovered && t.strength).reduce((sum, t) => sum + (t.strength || 0), 0);
const avgStrength = discoveredTraits > 0 ? (totalStrength / discoveredTraits / 255) * 100 : 0;

export const travelKOLMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: discoveredTraits,
    journeyProgress: (discoveredTraits / 256) * 100,
    avgStrength: Math.round(avgStrength * 10) / 10,
    humanityIndex: 135,

    dimensions: {
        physical: {
            discovered: discoveredPhysical,
            total: 64,
            percentage: Math.round((discoveredPhysical / 64) * 100 * 10) / 10,
        },
        social: {
            discovered: discoveredSocial,
            total: 64,
            percentage: Math.round((discoveredSocial / 64) * 100 * 10) / 10,
        },
        digital: {
            discovered: discoveredDigital,
            total: 64,
            percentage: Math.round((discoveredDigital / 64) * 100 * 10) / 10,
        },
        spiritual: {
            discovered: discoveredSpiritual,
            total: 64,
            percentage: Math.round((discoveredSpiritual / 64) * 100 * 10) / 10,
        },
    },

    traits: traits,
    recentlyUnlockedTrait: 'D4',
};
