export type FlowState =
    | 'initial'
    | 'selecting_method'
    | 'verifying'
    | 'verification_complete'
    | 'matrix_view'
    | 'simulate_kol';

export interface VerificationMethod {
    id: string;
    name: string;
    icon: string;  // lucide-react icon name
    weight: number; // 0-1 之間的權重
}

export type MethodCardVariant = 'default' | 'selected' | 'completed';
export type HumanityCardVariant = 'locked' | 'unlocked';
