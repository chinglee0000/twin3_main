<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Twin Matrix POC - Complete Data Specification

## 📊 Travel KOL Persona - Complete Matrix Data

### Overview Statistics

| Metric | Value |
| :-- | :-- |
| **Total Discovered Traits** | 38 / 256 |
| **Journey Progress** | 14.8% |
| **Average Strength** | 171.2 / 255 (67.1%) |
| **Humanity Index** | 135 / 255 |

### Dimension Breakdown

| Dimension | Discovered | Total | Percentage | Color |
| :-- | :-- | :-- | :-- | :-- |
| **Physical** | 6 | 64 | 9% | Blue (`bg-blue-500`) |
| **Social** | 10 | 64 | 16% | Purple (`bg-purple-500`) |
| **Digital** | 10 | 64 | 16% | Green (`bg-green-500`) |
| **Spiritual** | 12 | 64 | 19% | Orange (`bg-orange-500`) |


***

## 🎯 Complete Trait Values with English Descriptions

### Physical Dimension (0000-003F)

```typescript
const physicalTraits = {
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
};
```


### Social Dimension (0040-007F)

```typescript
const socialTraits = {
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
};
```


### Digital Dimension (0080-00BF)

```typescript
const digitalTraits = {
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
    name: 'Social Media Influencer',
    strength: 192,
    description: 'Established digital presence with measurable influence on travel decisions.',
    unlockedBy: 'Impact metrics analysis'
  },
};
```


### Spiritual Dimension (00C0-00FF)

```typescript
const spiritualTraits = {
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
```


***

## 💬 Matrix Cell Tooltip Specification

### Discovered Trait Tooltip

```typescript
interface DiscoveredTooltipContent {
  // Header Section
  header: {
    traitName: string;        // e.g., "Digital Content Creation"
    hexId: string;            // e.g., "0x90"
    dimensionBadge: {
      label: string;          // e.g., "Digital"
      color: string;          // Dimension color
    };
  };
  
  // Core Stats Section
  stats: {
    strength: {
      label: "Strength";
      value: string;          // e.g., "232 / 255"
      percentage: string;     // e.g., "91%"
    };
    position: {
      label: "Position";
      value: string;          // e.g., "[9, 0]"
    };
  };
  
  // Visual Progress Bar
  progressBar: {
    fillPercentage: number;   // 0-100
    color: string;            // Dimension color
  };
  
  // Description
  description: string;        // Trait description
  
  // Unlock Metadata
  metadata: {
    discoveredDate: string;   // e.g., "Jan 15, 2026"
    unlockSource: string;     // e.g., "Content creation metrics"
  };
}
```

**Example Tooltip HTML:**

```html
<div class="tooltip-discovered" style="max-width: 280px; padding: 12px;">
  <!-- Header -->
  <div class="tooltip-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <div>
      <h4 style="font-size: 14px; font-weight: 600; margin: 0;">Digital Content Creation</h4>
      <span style="font-size: 11px; color: #9CA3AF;">Hex: 0x90</span>
    </div>
    <span class="dimension-badge" style="background: #10B981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px;">
      Digital
    </span>
  </div>
  
  <!-- Stats -->
  <div class="tooltip-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
    <div>
      <div style="font-size: 11px; color: #9CA3AF;">Strength</div>
      <div style="font-size: 13px; font-weight: 600;">232 / 255</div>
      <div style="font-size: 10px; color: #6B7280;">91%</div>
    </div>
    <div>
      <div style="font-size: 11px; color: #9CA3AF;">Position</div>
      <div style="font-size: 13px; font-weight: 600;">[9, 0]</div>
    </div>
  </div>
  
  <!-- Progress Bar -->
  <div class="progress-bar" style="height: 4px; background: #E5E7EB; border-radius: 2px; margin-bottom: 8px;">
    <div style="width: 91%; height: 100%; background: #10B981; border-radius: 2px;"></div>
  </div>
  
  <!-- Description -->
  <p style="font-size: 12px; color: #6B7280; margin: 8px 0; line-height: 1.4;">
    Prolific creator of high-quality photos, videos, and travel blog posts.
  </p>
  
  <!-- Metadata -->
  <div class="unlock-metadata" style="border-top: 1px solid #E5E7EB; padding-top: 8px; margin-top: 8px;">
    <div style="font-size: 11px; color: #9CA3AF; display: flex; justify-content: space-between;">
      <span>📅 Discovered: Jan 15, 2026</span>
    </div>
    <div style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">
      <span>🔓 Via: Content creation metrics</span>
    </div>
  </div>
</div>
```


### Locked Trait Tooltip

```typescript
interface LockedTooltipContent {
  header: {
    label: string;            // "Locked Trait"
    hexId: string;            // e.g., "0x45"
    position: string;         // e.g., "[4, 5]"
  };
  
  message: {
    primary: string;          // "This trait is locked"
    secondary: string;        // "Complete more verifications to discover"
  };
  
  hint?: {
    suggestedAction: string;  // e.g., "Link your social media account"
    relatedDimension: string; // e.g., "Social"
  };
}
```

**Example Locked Tooltip HTML:**

```html
<div class="tooltip-locked" style="max-width: 240px; padding: 12px; text-align: center;">
  <!-- Lock Icon -->
  <div style="margin-bottom: 8px;">
    <svg width="24" height="24" fill="none" stroke="#9CA3AF" stroke-width="2">
      <!-- Lock icon SVG path -->
    </svg>
  </div>
  
  <!-- Header -->
  <div style="margin-bottom: 8px;">
    <div style="font-size: 13px; font-weight: 600; color: #6B7280;">Locked Trait</div>
    <div style="font-size: 11px; color: #9CA3AF;">Hex: 0x45 | Position: [4, 5]</div>
  </div>
  
  <!-- Message -->
  <p style="font-size: 12px; color: #9CA3AF; margin: 8px 0;">
    This trait is locked
  </p>
  <p style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">
    Complete more verifications to discover
  </p>
  
  <!-- Optional Hint -->
  <div style="margin-top: 12px; padding: 8px; background: #F3F4F6; border-radius: 4px;">
    <div style="font-size: 10px; color: #6B7280;">💡 Suggested unlock:</div>
    <div style="font-size: 11px; color: #374151; margin-top: 4px;">Link your social media account</div>
  </div>
</div>
```


***

## 🎨 Complete TypeScript Implementation

```typescript
/**
 * Travel KOL Matrix Data - Complete Implementation
 * For Antigravity: Use this as the complete data source
 */

import type { TwinMatrixData, MatrixTrait } from '../twin-matrix/types';
import { getDimensionFromHexId } from '../twin-matrix/utils';

// Complete trait definitions with English descriptions
const kolTraitValues: Record<string, {
  name: string;
  strength: number;
  description: string;
  unlockedBy: string;
}> = {
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

  // Social Dimension (10 traits)
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

  // Digital Dimension (10 traits)
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
    name: 'Social Media Influencer',
    strength: 192,
    description: 'Established digital presence with measurable influence on travel decisions.',
    unlockedBy: 'Impact metrics analysis'
  },

  // Spiritual Dimension (12 traits)
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

// Generate complete 256 traits array
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
      unlockedBy: traitData?.unlockedBy,
      unlockedAt: isDiscovered 
        ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() 
        : undefined,
    });
  }
  
  return traits;
};

// Export complete KOL Matrix Data
export const travelKOLMatrixData: TwinMatrixData = {
  totalTraits: 256,
  discoveredTraits: 38,
  journeyProgress: 14.8,
  avgStrength: 67.1,
  humanityIndex: 135,
  
  dimensions: {
    physical: {
      discovered: 6,
      total: 64,
      percentage: 9,
      color: 'blue'
    },
    social: {
      discovered: 10,
      total: 64,
      percentage: 16,
      color: 'purple'
    },
    digital: {
      discovered: 10,
      total: 64,
      percentage: 16,
      color: 'green'
    },
    spiritual: {
      discovered: 12,
      total: 64,
      percentage: 19,
      color: 'orange'
    },
  },
  
  traits: generateKOLTraits(),
  recentlyUnlockedTrait: 'D4',
};
```


***

## 📋 Summary for Antigravity

**Copy this entire specification and provide it with the instruction:**

> This is the complete data specification for the Travel KOL persona in the Twin Matrix POC. Please use:
>
> 1. The `travelKOLMatrixData` object for all KOL simulation scenarios
> 2. The tooltip specifications for matrix cell hover interactions
> 3. All English descriptions and labels as provided
> 4. The exact percentages and statistics calculated above
>
> Ensure all tooltip content includes: trait name, hex ID, position, strength, description, and unlock metadata when available.
<span style="display:none">[^1][^2][^3][^4][^5][^6][^7][^8]</span>

<div align="center">⁂</div>

[^1]: About twin3.pdf

[^2]: Twin Matrix 編碼.pdf

[^3]: types.ts

[^4]: utils.ts

[^5]: mockData.ts

[^6]: index.ts

[^7]: TwinMatrixCard.tsx

[^8]: Jie-Tu-2026-01-21-03.49.10.jpg

