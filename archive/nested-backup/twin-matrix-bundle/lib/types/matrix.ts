export type MatrixDimension = 'physical' | 'social' | 'digital' | 'spiritual'

export interface MatrixTrait {
  id: string // Hex code: "00", "01", "4E", "FF" 等
  dimension: MatrixDimension
  discovered: boolean
  strength?: number // 0-100，trait 的強度（影響顏色深淺）
  position: {
    row: number // 0-15
    col: number // 0-15
  }
  // 擴展資訊
  name?: string // Trait 名稱
  description?: string // Trait 描述
  unlockedAt?: string // 解鎖日期 (ISO string)
  unlockedBy?: string // 解鎖的 Quest ID
}

export interface MatrixDimensionStats {
  discovered: number // 21
  total: number // 64
  percentage: number // 63
}

export interface TwinMatrixData {
  // 總體統計
  totalTraits: number // 256
  discoveredTraits: number // 92
  journeyProgress: number // 36 (百分比)
  avgStrength: number // 57 (百分比)
  humanityIndex: number // 78.3
  
  // 4 個維度
  dimensions: {
    physical: MatrixDimensionStats
    digital: MatrixDimensionStats
    social: MatrixDimensionStats
    spiritual: MatrixDimensionStats
  }
  
  // Hex Grid 資料
  traits: MatrixTrait[] // 256 個 traits
  recentlyUnlockedTrait?: string // 最近解鎖的 trait ID (用於定位)
}
