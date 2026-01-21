/**
 * Verification Flow Type Definitions
 */

export interface VerificationMethod {
    id: string;
    name: string;
    description: string;
    icon: string; // lucide-react icon name
    estimatedTime: string;
    humanityIndexBoost: number;
}

export type FlowState =
    | 'initial'
    | 'selecting_method'
    | 'verifying'
    | 'verification_complete'
    | 'matrix_view'
    | 'simulate_kol';

export interface VerificationState {
    currentState: FlowState;
    selectedMethod: string | null;
    completedMethods: string[];
    humanityIndex: number;
}
