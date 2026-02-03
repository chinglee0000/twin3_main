// HumanVerification module exports

// Types
export type {
    FlowState,
    VerificationMethod,
    MethodCardVariant,
    HumanityCardVariant,
} from './components/types';

// Constants
export { WIDGET_STATES, ANIMATION_DURATION } from './components/variants';

// Data
export {
    verificationMethods,
    calculateHumanityIndex,
    defaultCompletedMethods,
} from './data/verificationMethods';

export {
    initialMatrixData,
    travelKOLMatrixData,
    travelKOLInfo,
} from '../../data/profiles/mockProfiles';


// Components
export { VerificationOptions } from './components/VerificationOptions';
export { VerificationLoader } from './components/VerificationLoader';
export { HumanityStatusCard } from './components/HumanityStatusCard';
