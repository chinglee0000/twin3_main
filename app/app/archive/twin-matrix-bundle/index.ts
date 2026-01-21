/**
 * Twin Matrix Feature Module
 * 
 * Export all components and utilities for the Twin Matrix feature
 */

// Main Component
export { TwinMatrixCard } from './components/twin-matrix-card'

// Types
export type { TwinMatrixData, MatrixTrait, MatrixDimension, MatrixDimensionStats } from './lib/types/matrix'

// Mock Data (for development/demo)
export { web3EngineerMatrixData, getDisplayRange, getTraitColor, getTraitBackgroundColor } from './lib/mock-data/twin-matrix-persona'

// Styles - import this in your main CSS or entry point
// import './styles/matrix-theme.css'
