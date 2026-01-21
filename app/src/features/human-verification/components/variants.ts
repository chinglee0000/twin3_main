export const WIDGET_STATES = {
    INITIAL: 'initial',
    SELECTING: 'selecting_method',
    VERIFYING: 'verifying',
    COMPLETE: 'verification_complete',
    MATRIX_VIEW: 'matrix_view',
    SIMULATE_KOL: 'simulate_kol',
} as const;

export const ANIMATION_DURATION = {
    VERIFICATION: 2500,    // 驗證進度條動畫
    FADE_OUT: 300,         // 遮罩淡出
    FADE_IN: 300,          // 卡片淡入
    PULSE: 2000,           // 按鈕脈衝
} as const;
