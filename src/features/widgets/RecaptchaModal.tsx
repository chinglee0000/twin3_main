import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────
declare global {
    interface Window {
        grecaptcha?: {
            ready: (cb: () => void) => void;
            render: (container: string | HTMLElement, options: any) => number;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
            reset: (widgetId?: number) => void;
        };
        onRecaptchaLoad?: () => void;
    }
}

interface RecaptchaWidgetProps {
    onVerified?: (token: string) => void;
    onStart?: () => void;
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
const RECAPTCHA_ENABLED = SITE_KEY && SITE_KEY.length > 0;

// ─── Helper: load reCAPTCHA script (Explicit) ────────────
function loadRecaptchaScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.grecaptcha?.render) {
            resolve();
            return;
        }

        const scriptId = 'recaptcha-script-v2';
        if (document.getElementById(scriptId)) {
            const check = () => {
                if (window.grecaptcha?.render) resolve();
                else setTimeout(check, 100);
            };
            check();
            return;
        }

        window.onRecaptchaLoad = () => {
            resolve();
        };

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=en`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
        document.head.appendChild(script);

        setTimeout(() => reject(new Error('reCAPTCHA script load timed out')), 15000);
    });
}

/**
 * Real reCAPTCHA v2 checkbox widget using grecaptcha.render().
 */
export const RecaptchaWidget: React.FC<RecaptchaWidgetProps> = ({
    onVerified,
    onStart,
}) => {
    const [error, setError] = useState<string | null>(null);
    const containerId = useMemo(() => `recaptcha-${Math.random().toString(36).substr(2, 9)}`, []);
    const widgetIdRef = useRef<number | null>(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        onStart?.();

        // If reCAPTCHA is not enabled (no site key), auto-verify after a short delay
        if (!RECAPTCHA_ENABLED) {
            const timer = setTimeout(() => {
                console.warn('reCAPTCHA is disabled (no site key configured). Auto-verifying for demo purposes.');
                onVerified?.('demo-token-no-recaptcha');
            }, 1000);
            return () => clearTimeout(timer);
        }

        const initRecaptcha = async () => {
            try {
                if (!SITE_KEY) {
                    throw new Error('reCAPTCHA Site Key is missing in env');
                }

                await loadRecaptchaScript();

                if (hasRendered.current) return;

                window.grecaptcha?.ready(() => {
                    const container = document.getElementById(containerId);
                    if (!container) return;

                    const renderedId = window.grecaptcha?.render(containerId, {
                        sitekey: SITE_KEY,
                        theme: 'light',
                        callback: (token: string) => {
                            onVerified?.(token);
                        },
                        'expired-callback': () => {
                            window.grecaptcha?.reset(widgetIdRef.current!);
                        },
                        'error-callback': () => {
                            setError('reCAPTCHA encountered an error');
                        }
                    });
                    if (renderedId !== undefined) {
                        widgetIdRef.current = renderedId;
                    }
                    hasRendered.current = true;
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load reCAPTCHA');
            }
        };

        // Delay slightly to ensure DOM is ready (as suggested in guide)
        const timer = setTimeout(initRecaptcha, 200);

        return () => {
            clearTimeout(timer);
            // We don't necessarily reset on unmount if we want to preserve state, 
            // but for re-rendering clean widgets, we might need a fresh ID.
        };
    }, [containerId, onVerified, onStart]);

    return (
        <div style={{
            padding: '4px',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-secondary)',
                fontSize: '13px',
                marginBottom: '4px'
            }}>
                <Shield size={14} className="text-primary" />
                <span>
                    {RECAPTCHA_ENABLED 
                        ? 'Please complete the verification below:' 
                        : 'Demo Mode: Verification bypassed (no reCAPTCHA key configured)'}
                </span>
            </div>

            {/* reCAPTCHA Container - only show if enabled */}
            {RECAPTCHA_ENABLED && (
                <div
                    id={containerId}
                    className="recaptcha-container"
                    style={{
                        minHeight: '78px',
                        minWidth: '304px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            )}

            {/* Demo mode indicator */}
            {!RECAPTCHA_ENABLED && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#f59e0b',
                    fontSize: '13px',
                    marginTop: '4px',
                    padding: '8px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '4px'
                }}>
                    <AlertTriangle size={14} />
                    <span>Auto-verifying in demo mode...</span>
                </div>
            )}

            {error && RECAPTCHA_ENABLED && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    marginTop: '4px',
                    padding: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '4px'
                }}>
                    <AlertTriangle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export const RecaptchaModal = RecaptchaWidget;
