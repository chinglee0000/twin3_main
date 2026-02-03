/**
 * App Context Store (Zustand)
 * 
 * Global state container for context-aware routing
 * Provides state and actions for managing user context
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
    AppContext,
    ContextId,
    EntrySource,
    UserStatus,
    URLContext
} from '../types/context';

interface AppStore extends AppContext {
    // Actions
    setUrlParams: (params: URLContext) => void;
    setUserStatus: (status: UserStatus, walletAddress?: string) => void;
    setHumanityScore: (score: number) => void;
    resolveContext: () => ContextId;
    completeStep: (stepId: string) => void;
    setCurrentStep: (stepId: string) => void;
    reset: () => void;
}

const initialState: AppContext = {
    entrySource: 'organic',
    urlParams: {},
    userStatus: 'anonymous',
    contextId: 'new_user_organic',
    currentStep: 'welcome',
    completedSteps: [],
};

export const useAppStore = create<AppStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                // Set URL parameters and detect entry source
                setUrlParams: (params: URLContext) => {
                    let entrySource: EntrySource = 'organic';

                    if (params.taskId) {
                        entrySource = 'task_deeplink';
                    } else if (params.ref) {
                        entrySource = 'kol_referral';
                    } else if (params.campaign || params.utm_campaign) {
                        entrySource = 'campaign';
                    }

                    set({
                        urlParams: params,
                        entrySource,
                        referrerKol: params.ref,
                        campaignId: params.campaign || params.utm_campaign,
                    });
                },

                // Set user status
                setUserStatus: (status: UserStatus, walletAddress?: string) => {
                    set({ userStatus: status, walletAddress });
                },

                // Set humanity score after verification
                setHumanityScore: (score: number) => {
                    set({ humanityScore: score });
                },

                // Resolve context based on current state
                resolveContext: () => {
                    const { urlParams, userStatus } = get();

                    let contextId: ContextId;

                    // Priority 1: Check if returning user
                    if (userStatus === 'registered' || userStatus === 'premium') {
                        contextId = 'returning_user';
                    }
                    // Priority 2: Check for task deeplink
                    else if (urlParams.taskId) {
                        contextId = 'new_user_task';
                    }
                    // Priority 3: Check for KOL referral
                    else if (urlParams.ref) {
                        contextId = 'kol_referral';
                    }
                    // Priority 4: Check for campaign
                    else if (urlParams.campaign || urlParams.utm_campaign) {
                        contextId = 'campaign_landing';
                    }
                    // Default: organic new user
                    else {
                        contextId = 'new_user_organic';
                    }

                    set({ contextId });
                    return contextId;
                },

                // Mark a step as completed
                completeStep: (stepId: string) => {
                    const { completedSteps } = get();
                    if (!completedSteps.includes(stepId)) {
                        set({ completedSteps: [...completedSteps, stepId] });
                    }
                },

                // Set current step
                setCurrentStep: (stepId: string) => {
                    set({ currentStep: stepId });
                },

                // Reset store to initial state
                reset: () => {
                    set(initialState);
                },
            }),
            {
                name: 'twin3-context',
                partialize: (state) => ({
                    userStatus: state.userStatus,
                    walletAddress: state.walletAddress,
                    humanityScore: state.humanityScore,
                    completedSteps: state.completedSteps,
                }),
            }
        ),
        { name: 'twin3-store' }
    )
);

// Selector hooks for common use cases
export const useContextId = () => useAppStore((state) => state.contextId);
export const useUserStatus = () => useAppStore((state) => state.userStatus);
export const useUrlParams = () => useAppStore((state) => state.urlParams);
export const useIsVerified = () => useAppStore((state) =>
    state.userStatus !== 'anonymous'
);
