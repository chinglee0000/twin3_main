/**
 * useContextResolver Hook
 * 
 * Initializes application context on mount:
 * 1. Parses URL parameters
 * 2. Checks user status from localStorage
 * 3. Resolves context ID
 * 4. Sets initial flow step
 */

import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { getFlowConfig } from '../config/flowConfigs';
import type { URLContext, UserStatus } from '../types/context';

export function useContextResolver() {
    const {
        setUrlParams,
        setUserStatus,
        setHumanityScore,
        resolveContext,
        setCurrentStep,
        contextId
    } = useAppStore();

    useEffect(() => {
        // 1. Parse URL parameters
        const params = new URLSearchParams(window.location.search);
        const urlParams: URLContext = {
            taskId: params.get('task_id') || undefined,
            ref: params.get('ref') || undefined,
            campaign: params.get('campaign') || undefined,
            utm_source: params.get('utm_source') || undefined,
            utm_medium: params.get('utm_medium') || undefined,
            utm_campaign: params.get('utm_campaign') || undefined,
        };

        // Filter out undefined values
        const cleanParams = Object.fromEntries(
            Object.entries(urlParams).filter(([_, v]) => v !== undefined)
        ) as URLContext;

        setUrlParams(cleanParams);

        // 2. Check user status from localStorage
        const savedWallet = localStorage.getItem('twin3_wallet');
        const savedVerified = localStorage.getItem('twin3_verified');
        const savedHumanityScore = localStorage.getItem('twin3_humanity_score');

        let userStatus: UserStatus = 'anonymous';
        if (savedWallet) {
            userStatus = 'registered';
        } else if (savedVerified === 'true') {
            userStatus = 'verified';
        }

        setUserStatus(userStatus, savedWallet || undefined);

        if (savedHumanityScore) {
            setHumanityScore(parseInt(savedHumanityScore, 10));
        }

        // 3. Resolve context based on state
        const resolvedContextId = resolveContext();

        // 4. Set initial step from flow config
        const flowConfig = getFlowConfig(resolvedContextId);
        setCurrentStep(flowConfig.welcomeNodeId);

        // Log for debugging (remove in production)
        console.log('[ContextResolver] Initialized:', {
            urlParams: cleanParams,
            userStatus,
            contextId: resolvedContextId,
            welcomeNode: flowConfig.welcomeNodeId,
        });
    }, []);

    return { contextId };
}

/**
 * Hook to get current context content
 */
export function useContextContent() {
    const contextId = useAppStore((state) => state.contextId);
    const urlParams = useAppStore((state) => state.urlParams);

    return { contextId, urlParams };
}
