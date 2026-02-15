/**
 * Twin Matrix Mock Data - Travel KOL Persona
 * 
 * Persona: Ching Lee, Travel Content Creator
 * Background:
 * - 5000+ followers on social media
 * - Full-time travel content creator
 * - Experiences diverse cultures and destinations
 * - High engagement with audience
 *
 * Data source: kol-mockup-data.md
 */

import type { MatrixTrait, TwinMatrixData } from '../../features/twin-matrix/types';
import { getDimensionFromHexId } from '../../features/twin-matrix/utils';


// Complete trait definitions with descriptions and unlock sources
interface TraitValue {
    name: string;
    strength: number;
    description: string;
    unlockedBy: string;
}

const kolTraitValues: Record<string, TraitValue> = {
    // Physical Dimension (6 traits)
    '00': {
        name: 'Humanity Index',
        strength: 135,
        description: 'Measures the authenticity and trustworthiness of user identity, indicating whether the user is a real human rather than a bot or fake identity.',
        unlockedBy: 'Google reCAPTCHA v3'
    },
    '01': {
        name: 'Physical Fitness Score',
        strength: 168,
        description: 'Above-average fitness level required for frequent travel and outdoor activities.',
        unlockedBy: 'Activity tracking data'
    },
    '03': {
        name: 'Earth Coordinates',
        strength: 198,
        description: 'Extensive geographic footprint from frequent travel to diverse locations.',
        unlockedBy: 'Location history analysis'
    },
    '07': {
        name: 'Sleep Patterns',
        strength: 95,
        description: 'Irregular sleep quality affected by frequent timezone changes and jet lag.',
        unlockedBy: 'Sleep tracking data'
    },
    '08': {
        name: 'Dietary Habits',
        strength: 122,
        description: 'Inconsistent eating patterns due to travel lifestyle and trying diverse cuisines.',
        unlockedBy: 'Food diary and social posts'
    },
    '33': {
        name: 'Physical Activity Level',
        strength: 185,
        description: 'High activity level from hiking, walking tours, and adventure activities.',
        unlockedBy: 'Fitness tracker integration'
    },

    // Social Dimension (10 traits) - Hex range 40-7F
    '40': {
        name: 'Social Frequency',
        strength: 215,
        description: 'Highly active on social platforms with daily posts and engagement.',
        unlockedBy: 'Social media analytics'
    },
    '41': {
        name: 'Social Media Influencer',
        strength: 192,
        description: 'Mid-tier influencer with 5000 followers and consistent engagement rate.',
        unlockedBy: 'Influencer profile verification'
    },
    '42': {
        name: 'Relationship Network',
        strength: 178,
        description: 'Extensive network built through travel collaborations and meetups.',
        unlockedBy: 'Connection graph analysis'
    },
    '44': {
        name: 'Friendship Level',
        strength: 155,
        description: 'Moderate depth of close friendships balanced with wide acquaintance network.',
        unlockedBy: 'Interaction frequency data'
    },
    '47': {
        name: 'Social Skills',
        strength: 188,
        description: 'Strong interpersonal skills demonstrated through community engagement.',
        unlockedBy: 'Communication pattern analysis'
    },
    '4C': {
        name: 'Humor Sense',
        strength: 172,
        description: 'Witty and entertaining content creation style that resonates with audience.',
        unlockedBy: 'Content sentiment analysis'
    },
    '4D': {
        name: 'Extroversion',
        strength: 205,
        description: 'Highly extroverted personality, energized by social interactions and new experiences.',
        unlockedBy: 'Behavioral pattern assessment'
    },
    '4E': {
        name: 'Openness',
        strength: 218,
        description: 'Extremely open to new experiences, cultures, and unconventional ideas.',
        unlockedBy: 'Interest diversity mapping'
    },
    '53': {
        name: 'Public Expression',
        strength: 195,
        description: 'Comfortable and confident in public speaking and content creation.',
        unlockedBy: 'Video content analysis'
    },
    '54': {
        name: 'Social Participation',
        strength: 182,
        description: 'Actively participates in community events, meetups, and collaborative projects.',
        unlockedBy: 'Event attendance tracking'
    },

    // Digital Dimension (10 traits) - Hex range 80-BF
    '80': {
        name: 'Internet OG Sharing',
        strength: 208,
        description: 'Frequently shares original travel content including photos, videos, and guides.',
        unlockedBy: 'Content posting frequency'
    },
    '81': {
        name: 'Digital Literacy',
        strength: 165,
        description: 'Above-average proficiency in digital tools and social media platforms.',
        unlockedBy: 'Platform usage assessment'
    },
    '87': {
        name: 'Cybersecurity Awareness',
        strength: 118,
        description: 'Basic security practices but could improve awareness of advanced threats.',
        unlockedBy: 'Security behavior analysis'
    },
    '8C': {
        name: 'Digital Content Consumption',
        strength: 225,
        description: 'Heavy consumer of travel content for inspiration and research.',
        unlockedBy: 'Browse history and engagement'
    },
    '8E': {
        name: 'Online Learning Engagement',
        strength: 88,
        description: 'Limited participation in formal online courses, prefers experiential learning.',
        unlockedBy: 'Education platform activity'
    },
    '90': {
        name: 'Digital Content Creation',
        strength: 232,
        description: 'Prolific creator of high-quality photos, videos, and travel blog posts.',
        unlockedBy: 'Content creation metrics'
    },
    '91': {
        name: 'E-Commerce Expertise',
        strength: 145,
        description: 'Moderate experience with affiliate marketing and sponsored content.',
        unlockedBy: 'Monetization analysis'
    },
    '92': {
        name: 'User Experience Empathy',
        strength: 175,
        description: 'Strong understanding of audience needs and preferences.',
        unlockedBy: 'Engagement analytics'
    },
    'AC': {
        name: 'Communication Skills',
        strength: 198,
        description: 'Excellent written and visual communication across digital platforms.',
        unlockedBy: 'Content quality assessment'
    },
    'AD': {
        name: 'Digital Influencer Impact',
        strength: 192,
        description: 'Established digital presence with measurable influence on travel decisions.',
        unlockedBy: 'Impact metrics analysis'
    },

    // Spiritual Dimension (12 traits) - Hex range C0-FF
    'C1': {
        name: 'MBTI',
        strength: 68,
        description: 'ENFP personality type - enthusiastic, creative, and spontaneous.',
        unlockedBy: 'Personality assessment'
    },
    'C2': {
        name: 'Lifestyle Attitudes',
        strength: 210,
        description: 'Positive and adventurous life philosophy focused on experiences over possessions.',
        unlockedBy: 'Value system analysis'
    },
    'C3': {
        name: 'Astrology',
        strength: 132,
        description: 'Moderate interest in astrology and spiritual practices.',
        unlockedBy: 'Interest profile'
    },
    'C4': {
        name: 'Intelligence Quotient',
        strength: 148,
        description: 'Above-average cognitive abilities with strong creative intelligence.',
        unlockedBy: 'Cognitive assessment'
    },
    'C5': {
        name: 'Personality Traits',
        strength: 195,
        description: 'Cheerful, outgoing, and optimistic personality that attracts followers.',
        unlockedBy: 'Behavioral analysis'
    },
    'C6': {
        name: 'Emotional Intelligence',
        strength: 178,
        description: 'High emotional awareness and ability to connect with diverse audiences.',
        unlockedBy: 'EQ assessment'
    },
    'C8': {
        name: 'Mindfulness',
        strength: 72,
        description: 'Limited formal mindfulness practice but naturally present-oriented.',
        unlockedBy: 'Wellness tracking'
    },
    'C9': {
        name: 'Gratitude Level',
        strength: 188,
        description: 'Strong sense of gratitude cultivated through travel experiences.',
        unlockedBy: 'Sentiment analysis'
    },
    'CA': {
        name: 'Purpose in Life',
        strength: 162,
        description: 'Clear sense of purpose in inspiring others to explore the world.',
        unlockedBy: 'Goal assessment'
    },
    'D1': {
        name: 'Hope',
        strength: 202,
        description: 'High levels of hope and optimism about future possibilities.',
        unlockedBy: 'Psychological profile'
    },
    'D2': {
        name: 'Optimism',
        strength: 215,
        description: 'Exceptionally optimistic outlook even in challenging travel situations.',
        unlockedBy: 'Attitude assessment'
    },
    'D4': {
        name: 'Life Satisfaction',
        strength: 185,
        description: 'High overall satisfaction with lifestyle choices and career path.',
        unlockedBy: 'Well-being survey'
    },
};

/**
 * Generate full 256-trait matrix for Travel KOL
 */
function generateKOLTraits(): MatrixTrait[] {
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
            dimension,
            discovered: isDiscovered,
            strength: traitData?.strength,
            position: { row, col },
            name: traitData?.name,
            description: traitData?.description,
            unlockedBy: traitData?.unlockedBy,
            unlockedAt: isDiscovered
                ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
        });
    }

    return traits;
}

/**
 * Travel KOL Matrix Data (Primary Export)
 */
export const travelKOLMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 38, // 6 + 10 + 10 + 12
    journeyProgress: 14.8, // 38/256 ≈ 14.8%
    avgStrength: 67.1,
    humanityIndex: 135,

    dimensions: {
        physical: { discovered: 6, total: 64, percentage: 9 },
        digital: { discovered: 10, total: 64, percentage: 16 },
        social: { discovered: 10, total: 64, percentage: 16 },
        spiritual: { discovered: 12, total: 64, percentage: 19 },
    },

    traits: generateKOLTraits(),
    recentlyUnlockedTrait: 'D4',
};

// Re-export for backward compatibility
export const web3EngineerMatrixData = travelKOLMatrixData;

/**
 * Generate completely empty "Just Born" Matrix (No traits unlocked)
 */
function generateEmptyTraits(): MatrixTrait[] {
    const traits: MatrixTrait[] = [];

    for (let i = 0; i < 256; i++) {
        const hexId = i.toString(16).toUpperCase().padStart(2, '0');
        const dimension = getDimensionFromHexId(hexId);
        const row = Math.floor(i / 16);
        const col = i % 16;

        traits.push({
            id: hexId,
            dimension,
            discovered: false,
            strength: undefined,
            position: { row, col },
            name: undefined,
            description: undefined,
            unlockedBy: undefined,
            unlockedAt: undefined,
        });
    }

    return traits;
}

export const emptyMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 0,
    journeyProgress: 0,
    avgStrength: 0,
    humanityIndex: 0,

    dimensions: {
        physical: { 
            discovered: 0, 
            total: 64, 
            percentage: 0
        },
        social: { discovered: 0, total: 64, percentage: 0 },
        digital: { discovered: 0, total: 64, percentage: 0 },
        spiritual: { discovered: 0, total: 64, percentage: 0 },
    },

    traits: generateEmptyTraits(),
    recentlyUnlockedTrait: undefined,
};

/**
 * Generate Initial "Just Born" Matrix (Only Humanity Index)
 */
function generateInitialTraits(): MatrixTrait[] {
    const traits: MatrixTrait[] = [];

    for (let i = 0; i < 256; i++) {
        const hexId = i.toString(16).toUpperCase().padStart(2, '0');
        const dimension = getDimensionFromHexId(hexId);
        const row = Math.floor(i / 16);
        const col = i % 16;

        // Only unlock ID '00' (Humanity Index)
        const isHumanityIndex = hexId === '00';
        const traitData = isHumanityIndex ? kolTraitValues['00'] : undefined;

        traits.push({
            id: hexId,
            dimension,
            discovered: isHumanityIndex,
            strength: isHumanityIndex ? 38 : undefined, // Total Humanity Index = 38
            position: { row, col },
            name: traitData?.name,
            description: traitData?.description,
            unlockedBy: traitData?.unlockedBy,
            unlockedAt: isHumanityIndex ? new Date(Date.now() - 60000).toISOString() : undefined, // Set to 1 minute ago to avoid animation on page load
        });
    }

    return traits;
}

export const initialMatrixData: TwinMatrixData = {
    totalTraits: 256,
    discoveredTraits: 1,
    journeyProgress: 0.5, // 1/256 ≈ 0.4%, rounded to user preference
    avgStrength: 15, // 38/255 * 100 ≈ 15%
    humanityIndex: 38, // 0.5 verification × 76.5 (30% of 255) = 38.25 ≈ 38

    dimensions: {
        physical: { 
            discovered: 1, 
            total: 64, 
            percentage: 0 // 38 / (64 × 255) × 100 = 38/16320 × 100 = 0.23% ≈ 0%
        },
        social: { discovered: 0, total: 64, percentage: 0 },
        digital: { discovered: 0, total: 64, percentage: 0 },
        spiritual: { discovered: 0, total: 64, percentage: 0 },
    },

    traits: generateInitialTraits(),
    recentlyUnlockedTrait: '00',
};
