/**
 * Twin Matrix Feature Module
 * 
 * Export all components and utilities for the Twin Matrix feature
 */

// Main Component
export { TwinMatrixCard } from './TwinMatrixCard';

// Types
export type {
    TwinMatrixData,
    MatrixTrait,
    MatrixDimension,
    MatrixDimensionStats,
} from './types';

// Utilities
export { getTraitColor, getTraitBackgroundColor, getDisplayRange, getDimensionFromHexId } from './utils';

// Mock Data (for development/demo)
export { web3EngineerMatrixData, travelKOLMatrixData } from '../../data/matrix/twinMatrixMockData';

