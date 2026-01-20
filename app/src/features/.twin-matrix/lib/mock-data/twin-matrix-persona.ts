/**
 * Twin Matrix Mock Data - Web3 Engineer Persona
 * 
 * Persona: Alex Mercer, 35 歲 Web3 工程師
 * 背景: 
 * - 在區塊鏈產業工作 5 年
 * - 熱愛技術和創新
 * - 注重健康和工作生活平衡
 * - 活躍於開發者社群
 * - 對新興科技充滿好奇
 */

import type { MatrixTrait, TwinMatrixData } from '../types/matrix'
import { getTraitDefinition } from './trait-definitions'

// 為 35 歲 Web3 工程師設計的 Trait 分布
// 特點：Digital 和 Physical 較高，Social 中等，Spiritual 正在探索

/**
 * Physical Dimension (00-3F): 21/64 traits discovered (63% strength)
 * 
 * 特徵：
 * - 重視健康但工作繁忙
 * - 有規律運動習慣（健身、跑步）
 * - 飲食注重但偶爾外食
 * - 睡眠品質因工作壓力而波動
 */
const physicalTraits: Partial<MatrixTrait>[] = [
  // 已解鎖的 Physical Traits (21 個)
  { id: '00', dimension: 'physical', discovered: true, strength: 85, position: { row: 0, col: 0 }, unlockedAt: '2024-09-15T10:30:00Z', unlockedBy: 'quest-coding-marathon' },
  { id: '01', dimension: 'physical', discovered: true, strength: 78, position: { row: 0, col: 1 }, unlockedAt: '2024-09-20T14:20:00Z', unlockedBy: 'quest-screen-time-challenge' },
  { id: '05', dimension: 'physical', discovered: true, strength: 72, position: { row: 0, col: 5 }, unlockedAt: '2024-10-01T09:15:00Z', unlockedBy: 'quest-typing-speed' },
  { id: '08', dimension: 'physical', discovered: true, strength: 88, position: { row: 0, col: 8 }, unlockedAt: '2024-10-05T16:45:00Z', unlockedBy: 'quest-blue-light-filter' },
  { id: '0C', dimension: 'physical', discovered: true, strength: 65, position: { row: 0, col: 12 }, unlockedAt: '2024-10-10T12:00:00Z', unlockedBy: 'quest-meal-tracking' },

  { id: '10', dimension: 'physical', discovered: true, strength: 90, position: { row: 1, col: 0 }, unlockedAt: '2024-10-12T08:30:00Z', unlockedBy: 'quest-deep-work-session' },
  { id: '13', dimension: 'physical', discovered: true, strength: 75, position: { row: 1, col: 3 }, unlockedAt: '2024-10-15T11:20:00Z', unlockedBy: 'quest-ergonomic-setup' },
  { id: '18', dimension: 'physical', discovered: true, strength: 82, position: { row: 1, col: 8 }, unlockedAt: '2024-10-18T15:10:00Z', unlockedBy: 'quest-stress-management' },
  { id: '1B', dimension: 'physical', discovered: true, strength: 70, position: { row: 1, col: 11 }, unlockedAt: '2024-10-20T07:00:00Z', unlockedBy: 'quest-sleep-tracking' },

  { id: '20', dimension: 'physical', discovered: true, strength: 68, position: { row: 2, col: 0 }, unlockedAt: '2024-10-22T22:30:00Z', unlockedBy: 'quest-power-nap' },
  { id: '24', dimension: 'physical', discovered: true, strength: 92, position: { row: 2, col: 4 }, unlockedAt: '2024-10-25T09:00:00Z', unlockedBy: 'quest-coffee-optimization' },
  { id: '28', dimension: 'physical', discovered: true, strength: 77, position: { row: 2, col: 8 }, unlockedAt: '2024-10-27T14:30:00Z', unlockedBy: 'quest-workspace-audit' },

  { id: '30', dimension: 'physical', discovered: true, strength: 85, position: { row: 3, col: 0 }, unlockedAt: '2024-10-28T10:00:00Z', unlockedBy: 'quest-energy-tracking' },
  { id: '35', dimension: 'physical', discovered: true, strength: 73, position: { row: 3, col: 5 }, unlockedAt: '2024-10-30T13:15:00Z', unlockedBy: 'quest-hydration-challenge' },
  { id: '39', dimension: 'physical', discovered: true, strength: 80, position: { row: 3, col: 9 }, unlockedAt: '2024-11-01T17:00:00Z', unlockedBy: 'quest-daily-movement' },
  { id: '3C', dimension: 'physical', discovered: true, strength: 88, position: { row: 3, col: 12 }, unlockedAt: '2024-11-02T19:30:00Z', unlockedBy: 'quest-injury-prevention' },

  // 最近解鎖的 Physical Traits
  { id: '14', dimension: 'physical', discovered: true, strength: 95, position: { row: 1, col: 4 }, unlockedAt: '2024-11-04T08:00:00Z', unlockedBy: 'quest-30-day-fitness' }, // 最近解鎖
  { id: '25', dimension: 'physical', discovered: true, strength: 87, position: { row: 2, col: 5 }, unlockedAt: '2024-11-03T06:30:00Z', unlockedBy: 'quest-running-streak' },
  { id: '2A', dimension: 'physical', discovered: true, strength: 79, position: { row: 2, col: 10 }, unlockedAt: '2024-11-02T20:00:00Z', unlockedBy: 'quest-recovery-routine' },
  { id: '31', dimension: 'physical', discovered: true, strength: 84, position: { row: 3, col: 1 }, unlockedAt: '2024-11-01T18:45:00Z', unlockedBy: 'quest-flexibility-training' },
  { id: '3A', dimension: 'physical', discovered: true, strength: 76, position: { row: 3, col: 10 }, unlockedAt: '2024-10-31T21:00:00Z', unlockedBy: 'quest-health-metrics' },
]

/**
 * Social Dimension (40-7F): 26/64 traits discovered (56% strength)
 * 
 * 特徵：
 * - 活躍於開發者社群
 * - 線上互動多於線下
 * - 善於技術分享和協作
 * - 正在學習更好的溝通技巧
 */
const socialTraits: Partial<MatrixTrait>[] = [
  // 已解鎖的 Social Traits (26 個)
  { id: '40', dimension: 'social', discovered: true, strength: 70, position: { row: 4, col: 0 }, unlockedAt: '2024-08-15T10:00:00Z', unlockedBy: 'quest-community-onboarding' },
  { id: '42', dimension: 'social', discovered: true, strength: 85, position: { row: 4, col: 2 }, unlockedAt: '2024-08-20T14:30:00Z', unlockedBy: 'quest-code-review-challenge' },
  { id: '45', dimension: 'social', discovered: true, strength: 78, position: { row: 4, col: 5 }, unlockedAt: '2024-09-01T09:00:00Z', unlockedBy: 'quest-mentorship-program' },
  { id: '48', dimension: 'social', discovered: true, strength: 82, position: { row: 4, col: 8 }, unlockedAt: '2024-09-10T16:00:00Z', unlockedBy: 'quest-open-source-contribution' },
  { id: '4C', dimension: 'social', discovered: true, strength: 65, position: { row: 4, col: 12 }, unlockedAt: '2024-09-15T11:30:00Z', unlockedBy: 'quest-client-meeting' },

  { id: '50', dimension: 'social', discovered: true, strength: 88, position: { row: 5, col: 0 }, unlockedAt: '2024-09-20T08:00:00Z', unlockedBy: 'quest-remote-collaboration' },
  { id: '53', dimension: 'social', discovered: true, strength: 72, position: { row: 5, col: 3 }, unlockedAt: '2024-09-25T13:00:00Z', unlockedBy: 'quest-technical-writing' },
  { id: '56', dimension: 'social', discovered: true, strength: 90, position: { row: 5, col: 6 }, unlockedAt: '2024-10-01T15:00:00Z', unlockedBy: 'quest-conference-speaking' },
  { id: '5A', dimension: 'social', discovered: true, strength: 68, position: { row: 5, col: 10 } },
  { id: '5D', dimension: 'social', discovered: true, strength: 75, position: { row: 5, col: 13 } },

  { id: '60', dimension: 'social', discovered: true, strength: 80, position: { row: 6, col: 0 } },
  { id: '63', dimension: 'social', discovered: true, strength: 77, position: { row: 6, col: 3 } },
  { id: '67', dimension: 'social', discovered: true, strength: 85, position: { row: 6, col: 7 } },
  { id: '6B', dimension: 'social', discovered: true, strength: 70, position: { row: 6, col: 11 } },

  { id: '70', dimension: 'social', discovered: true, strength: 73, position: { row: 7, col: 0 } },
  { id: '74', dimension: 'social', discovered: true, strength: 88, position: { row: 7, col: 4 } },
  { id: '78', dimension: 'social', discovered: true, strength: 65, position: { row: 7, col: 8 } },
  { id: '7C', dimension: 'social', discovered: true, strength: 92, position: { row: 7, col: 12 } },

  // 中等強度的 Social Traits
  { id: '44', dimension: 'social', discovered: true, strength: 60, position: { row: 4, col: 4 } },
  { id: '49', dimension: 'social', discovered: true, strength: 55, position: { row: 4, col: 9 } },
  { id: '51', dimension: 'social', discovered: true, strength: 58, position: { row: 5, col: 1 } },
  { id: '58', dimension: 'social', discovered: true, strength: 62, position: { row: 5, col: 8 } },
  { id: '64', dimension: 'social', discovered: true, strength: 67, position: { row: 6, col: 4 } },
  { id: '6C', dimension: 'social', discovered: true, strength: 72, position: { row: 6, col: 12 } },
  { id: '71', dimension: 'social', discovered: true, strength: 68, position: { row: 7, col: 1 } },
  { id: '7A', dimension: 'social', discovered: true, strength: 75, position: { row: 7, col: 10 } },
]

/**
 * Digital Dimension (80-BF): 21/64 traits discovered (55% strength)
 * 
 * 特徵：
 * - Web3 專業技能強
 * - 熟悉區塊鏈技術
 * - 持續學習新技術
 * - 數位原生世代
 */
const digitalTraits: Partial<MatrixTrait>[] = [
  // 已解鎖的 Digital Traits (21 個) - 高強度
  { id: '80', dimension: 'digital', discovered: true, strength: 95, position: { row: 8, col: 0 } },
  { id: '82', dimension: 'digital', discovered: true, strength: 92, position: { row: 8, col: 2 } },
  { id: '85', dimension: 'digital', discovered: true, strength: 88, position: { row: 8, col: 5 } },
  { id: '89', dimension: 'digital', discovered: true, strength: 90, position: { row: 8, col: 9 } },
  { id: '8D', dimension: 'digital', discovered: true, strength: 85, position: { row: 8, col: 13 } },

  { id: '90', dimension: 'digital', discovered: true, strength: 93, position: { row: 9, col: 0 } },
  { id: '94', dimension: 'digital', discovered: true, strength: 87, position: { row: 9, col: 4 } },
  { id: '98', dimension: 'digital', discovered: true, strength: 91, position: { row: 9, col: 8 } },
  { id: '9C', dimension: 'digital', discovered: true, strength: 89, position: { row: 9, col: 12 } },

  { id: 'A0', dimension: 'digital', discovered: true, strength: 86, position: { row: 10, col: 0 } },
  { id: 'A3', dimension: 'digital', discovered: true, strength: 94, position: { row: 10, col: 3 } },
  { id: 'A7', dimension: 'digital', discovered: true, strength: 88, position: { row: 10, col: 7 } },
  { id: 'AB', dimension: 'digital', discovered: true, strength: 90, position: { row: 10, col: 11 } },

  { id: 'B0', dimension: 'digital', discovered: true, strength: 92, position: { row: 11, col: 0 } },
  { id: 'B4', dimension: 'digital', discovered: true, strength: 87, position: { row: 11, col: 4 } },
  { id: 'B8', dimension: 'digital', discovered: true, strength: 85, position: { row: 11, col: 8 } },
  { id: 'BC', dimension: 'digital', discovered: true, strength: 91, position: { row: 11, col: 12 } },

  // Web3 相關的高強度 Traits
  { id: '86', dimension: 'digital', discovered: true, strength: 96, position: { row: 8, col: 6 } },
  { id: '91', dimension: 'digital', discovered: true, strength: 94, position: { row: 9, col: 1 } },
  { id: 'A5', dimension: 'digital', discovered: true, strength: 93, position: { row: 10, col: 5 } },
  { id: 'B2', dimension: 'digital', discovered: true, strength: 95, position: { row: 11, col: 2 } },
]

/**
 * Spiritual Dimension (C0-FF): 24/64 traits discovered (54% strength)
 * 
 * 特徵：
 * - 開始探索內在成長
 * - 對哲學和人生意義感興趣
 * - 嘗試冥想和正念練習
 * - 尋找工作與生活的平衡
 */
const spiritualTraits: Partial<MatrixTrait>[] = [
  // 已解鎖的 Spiritual Traits (24 個)
  { id: 'C0', dimension: 'spiritual', discovered: true, strength: 65, position: { row: 12, col: 0 } },
  { id: 'C3', dimension: 'spiritual', discovered: true, strength: 58, position: { row: 12, col: 3 } },
  { id: 'C6', dimension: 'spiritual', discovered: true, strength: 72, position: { row: 12, col: 6 } },
  { id: 'CA', dimension: 'spiritual', discovered: true, strength: 55, position: { row: 12, col: 10 } },

  { id: 'D0', dimension: 'spiritual', discovered: true, strength: 68, position: { row: 13, col: 0 } },
  { id: 'D4', dimension: 'spiritual', discovered: true, strength: 62, position: { row: 13, col: 4 } },
  { id: 'D8', dimension: 'spiritual', discovered: true, strength: 70, position: { row: 13, col: 8 } },
  { id: 'DC', dimension: 'spiritual', discovered: true, strength: 58, position: { row: 13, col: 12 } },

  { id: 'E0', dimension: 'spiritual', discovered: true, strength: 75, position: { row: 14, col: 0 } },
  { id: 'E3', dimension: 'spiritual', discovered: true, strength: 60, position: { row: 14, col: 3 } },
  { id: 'E7', dimension: 'spiritual', discovered: true, strength: 67, position: { row: 14, col: 7 } },
  { id: 'EB', dimension: 'spiritual', discovered: true, strength: 72, position: { row: 14, col: 11 } },

  { id: 'F0', dimension: 'spiritual', discovered: true, strength: 55, position: { row: 15, col: 0 } },
  { id: 'F4', dimension: 'spiritual', discovered: true, strength: 63, position: { row: 15, col: 4 } },
  { id: 'F8', dimension: 'spiritual', discovered: true, strength: 68, position: { row: 15, col: 8 } },
  { id: 'FC', dimension: 'spiritual', discovered: true, strength: 70, position: { row: 15, col: 12 } },

  // 正在探索的 Spiritual Traits
  { id: 'C8', dimension: 'spiritual', discovered: true, strength: 50, position: { row: 12, col: 8 } },
  { id: 'CD', dimension: 'spiritual', discovered: true, strength: 48, position: { row: 12, col: 13 } },
  { id: 'D2', dimension: 'spiritual', discovered: true, strength: 52, position: { row: 13, col: 2 } },
  { id: 'D9', dimension: 'spiritual', discovered: true, strength: 55, position: { row: 13, col: 9 } },
  { id: 'E5', dimension: 'spiritual', discovered: true, strength: 58, position: { row: 14, col: 5 } },
  { id: 'EA', dimension: 'spiritual', discovered: true, strength: 62, position: { row: 14, col: 10 } },
  { id: 'F2', dimension: 'spiritual', discovered: true, strength: 60, position: { row: 15, col: 2 } },
  { id: 'FA', dimension: 'spiritual', discovered: true, strength: 65, position: { row: 15, col: 10 } },
]

// 生成完整的 256 個 Traits（包含未解鎖的）
function generateFullTraitMatrix(): MatrixTrait[] {
  const allTraits: MatrixTrait[] = []
  const discoveredTraits = [
    ...physicalTraits,
    ...socialTraits,
    ...digitalTraits,
    ...spiritualTraits,
  ]

  // 創建已解鎖 traits 的 Map
  const discoveredMap = new Map(discoveredTraits.map(t => [t.id, t]))

  // 生成所有 256 個 traits
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const hexId = (row * 16 + col).toString(16).toUpperCase().padStart(2, '0')
      const definition = getTraitDefinition(hexId)

      if (discoveredMap.has(hexId)) {
        // 已解鎖的 trait，合併定義資訊
        const discovered = discoveredMap.get(hexId)!
        allTraits.push({
          ...discovered,
          name: definition?.name,
          description: definition?.description,
        } as MatrixTrait)
      } else {
        // 未解鎖的 trait
        let dimension: 'physical' | 'social' | 'digital' | 'spiritual'
        const decimalValue = parseInt(hexId, 16)

        if (decimalValue <= 0x3F) dimension = 'physical'
        else if (decimalValue <= 0x7F) dimension = 'social'
        else if (decimalValue <= 0xBF) dimension = 'digital'
        else dimension = 'spiritual'

        allTraits.push({
          id: hexId,
          dimension,
          discovered: false,
          strength: 0,
          position: { row, col },
          name: definition?.name,
          description: definition?.description,
        })
      }
    }
  }

  return allTraits
}

// 完整的 Twin Matrix 資料
export const web3EngineerMatrixData: TwinMatrixData = {
  totalTraits: 256,
  discoveredTraits: 92, // 21 + 26 + 21 + 24
  journeyProgress: 36, // 92/256 ≈ 36%
  avgStrength: 57, // 加權平均
  humanityIndex: 78.3,

  dimensions: {
    physical: {
      discovered: 21,
      total: 64,
      percentage: 63, // 平均 strength
    },
    social: {
      discovered: 26,
      total: 64,
      percentage: 56,
    },
    digital: {
      discovered: 21,
      total: 64,
      percentage: 55, // 實際上 digital 強度最高，但發現的少
    },
    spiritual: {
      discovered: 24,
      total: 64,
      percentage: 54,
    },
  },

  traits: generateFullTraitMatrix(),
  recentlyUnlockedTrait: '14', // Physical trait，最近通過健身 quest 解鎖
}

// 輔助函數：獲取顯示範圍（8x8）
export function getDisplayRange(
  recentTraitId: string,
  allTraits: MatrixTrait[],
  gridSize: number = 8
): MatrixTrait[] {
  const recentTrait = allTraits.find(t => t.id === recentTraitId)
  if (!recentTrait) return allTraits.slice(0, 64) // 默認顯示左上角

  const { row, col } = recentTrait.position

  // 計算顯示範圍的起始位置
  let startRow = Math.max(0, Math.min(16 - gridSize, row - Math.floor(gridSize / 2)))
  let startCol = Math.max(0, Math.min(16 - gridSize, col - Math.floor(gridSize / 2)))

  // 提取 8x8 範圍的 traits
  const displayTraits: MatrixTrait[] = []
  for (let r = startRow; r < startRow + gridSize; r++) {
    for (let c = startCol; c < startCol + gridSize; c++) {
      const trait = allTraits.find(t => t.position.row === r && t.position.col === c)
      if (trait) displayTraits.push(trait)
    }
  }

  return displayTraits
}

// 輔助函數：獲取 trait 顏色
export function getTraitColor(trait: MatrixTrait): string {
  if (!trait.discovered) {
    return 'hsl(var(--matrix-undiscovered))'
  }

  const colorMap = {
    physical: 'hsl(var(--matrix-physical))',
    social: 'hsl(var(--matrix-social))',
    digital: 'hsl(var(--matrix-digital))',
    spiritual: 'hsl(var(--matrix-spiritual))',
  }

  return colorMap[trait.dimension]
}

// 輔助函數：獲取 trait 背景顏色（淺色版本）
export function getTraitBackgroundColor(trait: MatrixTrait): string {
  if (!trait.discovered) {
    return 'hsl(var(--matrix-undiscovered))'
  }

  const colorMap = {
    physical: 'hsl(var(--matrix-physical-light))',
    social: 'hsl(var(--matrix-social-light))',
    digital: 'hsl(var(--matrix-digital-light))',
    spiritual: 'hsl(var(--matrix-spiritual-light))',
  }

  return colorMap[trait.dimension]
}
