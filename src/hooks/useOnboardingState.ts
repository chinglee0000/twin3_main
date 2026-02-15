import { useState, useCallback, useEffect } from 'react';

// ─── Types ─────────────────────────────────────────────────
export type OnboardingStage = 'landing' | 'binding' | 'verification' | 'growth' | 'claimed' | 'complete';

export interface OnboardingState {
    stage: OnboardingStage;
    walletAddress: string | null;
    bindingType: 'self-custody' | 'no-wallet' | null;
    score: number;
    completedWidgets: string[];
    hasClaimed: boolean;
    twinBalance: number;
    inviteCode: string;
    invitedCount: number;
}

const STORAGE_KEY = 'twin3_onboarding';

const DEFAULT_STATE: OnboardingState = {
    stage: 'landing',
    walletAddress: null,
    bindingType: null,
    score: 0,
    completedWidgets: [],
    hasClaimed: false,
    twinBalance: 0,
    inviteCode: `twin3_${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    invitedCount: 0,
};

// ─── Hook ──────────────────────────────────────────────────
export function useOnboardingState() {
    const [state, setState] = useState<OnboardingState>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch { /* ignore */ }
        return { ...DEFAULT_STATE };
    });

    // Persist to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { /* ignore */ }
    }, [state]);

    // ─── Actions ───────────────────────────────────────────
    const setStage = useCallback((stage: OnboardingStage) => {
        setState(prev => ({ ...prev, stage }));
    }, []);

    const setBinding = useCallback((walletAddress: string, bindingType: 'self-custody' | 'no-wallet') => {
        setState(prev => ({
            ...prev,
            walletAddress,
            bindingType,
            stage: 'verification',
        }));
    }, []);

    const updateScore = useCallback((score: number) => {
        setState(prev => ({ ...prev, score }));
    }, []);

    const addCompletedWidget = useCallback((widgetId: string) => {
        setState(prev => ({
            ...prev,
            completedWidgets: prev.completedWidgets.includes(widgetId)
                ? prev.completedWidgets
                : [...prev.completedWidgets, widgetId],
        }));
    }, []);

    const claimAirdrop = useCallback((amount: number = 500) => {
        setState(prev => ({
            ...prev,
            hasClaimed: true,
            twinBalance: prev.twinBalance + amount,
            stage: 'claimed',
        }));
    }, []);

    const canClaim = state.score >= 100 && !state.hasClaimed;

    const resetOnboarding = useCallback(() => {
        setState({ ...DEFAULT_STATE, inviteCode: `twin3_${Math.random().toString(36).slice(2, 8).toUpperCase()}` });
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch { /* ignore */ }
    }, []);

    return {
        ...state,
        canClaim,
        setStage,
        setBinding,
        updateScore,
        addCompletedWidget,
        claimAirdrop,
        resetOnboarding,
    };
}
