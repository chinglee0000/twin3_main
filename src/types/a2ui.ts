// A2UI Protocol Types (Following InstaAgent Pattern)

import type { CardData } from '../types';

// Widget Type — Controls dynamic UI rendering
export const WidgetType = {
    NONE: 'none',
    TASK_CARD: 'task_card',
    TASK_DETAIL: 'task_detail',
    WALLET_CONNECT: 'wallet_connect',
    WALLET_BINDING: 'wallet_binding',
    TWIN_MATRIX: 'twin_matrix',
    VERIFICATION: 'verification',
    FEATURE_GRID: 'feature_grid',
    INSTAGRAM_CONNECT: 'instagram_connect',
    ACTIVE_TASK: 'active_task',
    GLOBAL_DASHBOARD: 'global_dashboard',
    HUMAN_VERIFICATION: 'human_verification',
    AIRDROP_CLAIM: 'airdrop_claim',
    REWARD_DASHBOARD: 'reward_dashboard',
    INVITE_FRIENDS: 'invite_friends',
    COMMUNITY_PREVIEW: 'community_preview',
    RECAPTCHA: 'recaptcha',
    AIRDROP_TASK_DASHBOARD: 'airdrop_task_dashboard',
    FINAL_REWARD_DASHBOARD: 'final_reward_dashboard',
} as const;

export type WidgetType = typeof WidgetType[keyof typeof WidgetType];

export interface A2UIComponent {
    id: string;
    component: Record<string, any>;
}

export interface Suggestion {
    label: string;
    payload: string;
}

export interface InteractionNode {
    id: string;
    triggers: string[];
    response: {
        text: string;
        delay?: number;
        card?: CardData;
        widget?: WidgetType;  // Optional widget to render
    };
    suggestedActions?: Suggestion[];
}

export type InteractionInventory = InteractionNode[];
