import React, { useState, useCallback, useEffect } from 'react';
import { Wallet, Bot, AlertTriangle, CheckCircle, Loader2, ArrowLeft, Smartphone, ExternalLink, X, HelpCircle, ChevronDown, ChevronUp, Briefcase, Key } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────
type BindingStep = 'choose' | 'connecting' | 'conflict' | 'success';
type BindingType = 'self-custody' | 'no-wallet';

interface WalletBindingWidgetProps {
    onBindingComplete?: (walletAddress: string, bindingType: BindingType) => void;
    onClose?: () => void;
    /** Force conflict for demo/dev purposes */
    forceConflict?: boolean;
}

// ─── Mock Data ─────────────────────────────────────────────
const MOCK_WALLET_ADDRESS = '0x1a2B...9cDe';
const MOCK_FULL_ADDRESS = '0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9cDe';
const MOCK_TG_WALLET = 'twin3_sbt_0xAb...Ef12';
const MOCK_CONFLICT_ADDRESS = '0x9fE...3bA1';

// ─── Component ─────────────────────────────────────────────
export const WalletBindingWidget: React.FC<WalletBindingWidgetProps> = ({
    onBindingComplete,
    onClose,
    forceConflict = false,
}) => {
    const [step, setStep] = useState<BindingStep>('choose');
    const [bindingType, setBindingType] = useState<BindingType | null>(null);
    const [progress, setProgress] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [showWhyWallet, setShowWhyWallet] = useState(false);

    // Simulate connection progress
    useEffect(() => {
        if (step !== 'connecting') return;

        const duration = bindingType === 'self-custody' ? 2000 : 3000;
        const startTime = Date.now();
        let raf: number;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);

            if (pct < 100) {
                raf = requestAnimationFrame(animate);
            } else {
                // Decide: conflict or success (only conflict if explicitly forced)
                const shouldConflict = forceConflict;
                setTimeout(() => {
                    if (shouldConflict) {
                        setStep('conflict');
                    } else {
                        const addr = bindingType === 'self-custody' ? MOCK_WALLET_ADDRESS : MOCK_TG_WALLET;
                        setWalletAddress(addr);
                        setStep('success');
                    }
                }, 300);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [step, bindingType, forceConflict]);

    // After success, notify parent after brief display (guarded to prevent re-triggers)
    const hasNotifiedParent = React.useRef(false);
    useEffect(() => {
        if (step !== 'success') {
            hasNotifiedParent.current = false;
            return;
        }
        if (hasNotifiedParent.current) return;
        hasNotifiedParent.current = true;
        const timer = setTimeout(() => {
            onBindingComplete?.(walletAddress, bindingType!);
        }, 2500);
        return () => clearTimeout(timer);
    }, [step, walletAddress, bindingType, onBindingComplete]);

    const handleChoose = useCallback((type: BindingType) => {
        setBindingType(type);
        setProgress(0);
        setStep('connecting');
    }, []);

    const handleRetry = useCallback(() => {
        setProgress(0);
        setStep('connecting');
    }, []);

    const handleSwitchWallet = useCallback(() => {
        setStep('choose');
        setBindingType(null);
        setProgress(0);
    }, []);

    // ─── Shared card style ────────────────────────────────
    const cardStyle: React.CSSProperties = {
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '400px',
        margin: window.innerWidth < 768 ? '0 auto' : '0',
    };

    const headerStyle: React.CSSProperties = {
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'linear-gradient(135deg, rgba(40, 40, 45, 0.5), rgba(30, 30, 35, 0.5))',
    };

    // ─── Wallet Connect Modal ─────────────────────────────
    const walletModal = showWalletModal ? (
        <div
            onClick={() => setShowWalletModal(false)}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                animation: 'fade-in 0.2s ease-out',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(40px)',
                    borderRadius: 'var(--radius-lg)',
                    width: window.innerWidth < 768 ? '92%' : '90%',
                    maxWidth: window.innerWidth < 768 ? '360px' : '680px',
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                    overflow: 'hidden',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                }}
            >
                {/* Close button */}
                <button
                    onClick={() => setShowWalletModal(false)}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                >
                    <X size={16} />
                </button>

                {/* Left Panel — Wallet List */}
                <div style={{
                    width: window.innerWidth < 768 ? '100%' : '240px',
                    borderRight: window.innerWidth < 768 ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                    borderBottom: window.innerWidth < 768 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                    padding: window.innerWidth < 768 ? '20px 20px 16px' : '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Connect Wallet
                    </div>

                    {/* Installed */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            Installed
                        </div>
                        <button
                            onClick={() => {
                                setShowWalletModal(false);
                                handleChoose('self-custody');
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                cursor: 'pointer',
                                color: 'inherit',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'none',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                flexShrink: 0,
                                padding: '6px',
                            }}>
                                <img src="/brands/MetaMask-icon-fox.svg" alt="MetaMask" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>MetaMask</div>
                                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Recent</div>
                            </div>
                        </button>
                    </div>

                    {/* Recommended */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            Recommended
                        </div>
                        <button
                            onClick={() => {
                                setShowWalletModal(false);
                                handleChoose('self-custody');
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '10px',
                                background: 'transparent',
                                border: '1px solid transparent',
                                cursor: 'pointer',
                                color: 'inherit',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'none',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                padding: '6px',
                            }}>
                                <svg width="20" height="13" viewBox="0 0 300 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M61.4 36.3C115.2-15.5 184.8-15.5 238.6 36.3L245.2 42.7C247.9 45.3 247.9 49.5 245.2 52.1L225.1 71.5C223.8 72.8 221.6 72.8 220.3 71.5L211.4 62.8C173.6 26 126.4 26 88.6 62.8L79 72.1C77.7 73.4 75.5 73.4 74.2 72.1L54.1 52.7C51.4 50.1 51.4 45.9 54.1 43.3L61.4 36.3ZM285.7 82.1L303.6 99.5C306.3 102.1 306.3 106.3 303.6 108.9L221.3 188.7C218.6 191.3 214.2 191.3 211.5 188.7L153.5 132.4C152.85 131.75 151.75 131.75 151.1 132.4L93.1 188.7C90.4 191.3 86 191.3 83.3 188.7L0.4 108.9C-2.3 106.3 -2.3 102.1 0.4 99.5L18.3 82.1C21 79.5 25.4 79.5 28.1 82.1L86.1 138.4C86.75 139.05 87.85 139.05 88.5 138.4L146.5 82.1C149.2 79.5 153.6 79.5 156.3 82.1L214.3 138.4C214.95 139.05 216.05 139.05 216.7 138.4L274.7 82.1C277.4 79.5 281.8 79.5 284.5 82.1L285.7 82.1Z" fill="white" />
                                </svg>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                WalletConnect
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile footer */}
                {window.innerWidth < 768 && (
                    <div style={{
                        padding: '12px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: 'var(--color-text-dim)',
                    }}>
                        <span>New to wallets?</span>
                        <a
                            href="https://ethereum.org/wallets"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
                        >
                            Learn More
                        </a>
                    </div>
                )}

                {/* Right Panel — What is a Wallet? (Desktop only) */}
                {window.innerWidth >= 768 && (
                    <div style={{
                        flex: 1,
                        padding: '32px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                    }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            What is a Wallet?
                        </div>

                        {/* Info block 1 */}
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: 'var(--radius-md)',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                flexShrink: 0,
                            }}><Briefcase size={24} color="white" /></div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                    Your Digital Asset Home
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                    A wallet stores, sends, and displays digital assets like crypto and NFTs.
                                </div>
                            </div>
                        </div>

                        {/* Info block 2 */}
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: 'var(--radius-md)',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                flexShrink: 0,
                            }}><Key size={24} color="white" /></div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                    A New Way to Log In
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                    No more creating accounts and passwords for every site — just connect your wallet.
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '240px', marginTop: '8px' }}>
                            <button
                                onClick={() => {
                                    setShowWalletModal(false);
                                    handleChoose('self-custody');
                                }}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    background: 'var(--color-primary)',
                                    border: 'none',
                                    color: '#000000',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                            >
                                Get a Wallet
                            </button>
                            <button
                                onClick={() => window.open('https://ethereum.org/wallets', '_blank')}
                                style={{
                                    padding: '8px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    ) : null;

    // ─── Step 1: Choose Binding Type ─────────────────────
    if (step === 'choose') {
        return (
            <>
                {walletModal}
                <div className="card animate-fade-in" style={cardStyle}>
                    <div style={headerStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Wallet size={20} color="var(--color-text-primary)" />
                            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                Connect Your Identity
                            </span>
                        </div>
                        <p style={{
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            marginTop: '8px',
                            lineHeight: 1.5,
                        }}>
                            Choose how to bind your account to proceed with verification.
                        </p>
                    </div>

                    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Self-Custody Option */}
                        <button
                            onClick={() => setShowWalletModal(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: 'inherit',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: 'none',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                padding: '8px',
                            }}>
                                <img src="/brands/MetaMask-icon-fox.svg" alt="MetaMask" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                    Self-Custody Wallet
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                    Connect MetaMask or compatible wallet
                                </div>
                            </div>
                            <ExternalLink size={16} color="var(--color-text-dim)" />
                        </button>

                        {/* No Wallet Option */}
                        <button
                            onClick={() => {
                                window.open('https://t.me/twin3_ai', '_blank', 'noopener,noreferrer');
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: 'inherit',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: 'none',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                padding: '8px',
                            }}>
                                <img src="/brands/telegram_logo.svg" alt="Telegram" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                                    No Wallet? No Problem
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                    Create SBT Wallet via Telegram Bot
                                </div>
                            </div>
                            <Smartphone size={16} color="var(--color-text-dim)" />
                        </button>
                    </div>

                    {/* Why do I need a wallet? */}
                    <div style={{
                        padding: '12px 20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}>
                        <button
                            onClick={() => setShowWhyWallet(!showWhyWallet)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: 'var(--radius-md)',
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'var(--color-text-secondary)',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <HelpCircle size={14} />
                            Why do I need a wallet?
                            {showWhyWallet ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {showWhyWallet && (
                            <div className="animate-fade-in" style={{
                                marginTop: '12px',
                                padding: '14px',
                                borderRadius: 'var(--radius-md)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                            }}>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}>
                                    Your Twin Matrix identity is stored as a <strong style={{ color: 'var(--color-text-primary)' }}>Soulbound Token (SBT)</strong> on-chain. An SBT is a non-transferable NFT that represents your unique digital identity. To mint and hold this token, you need a Web3 wallet — it serves as your personal vault for your on-chain identity.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    // ─── Step 2: Connecting ──────────────────────────────
    if (step === 'connecting') {
        const label = bindingType === 'self-custody'
            ? 'Connecting to MetaMask...'
            : 'Creating SBT Wallet via TG Bot...';
        const sublabel = bindingType === 'self-custody'
            ? 'Approve the connection request in your wallet'
            : 'Setting up your custodial wallet on Telegram';

        return (
            <div className="card animate-fade-in" style={cardStyle}>
                <div style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Pulse ring loader in header */}
                        <div style={{
                            position: 'relative',
                            width: '20px',
                            height: '20px',
                            flexShrink: 0,
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: '-4px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            }} />
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                borderTopColor: '#ffffff',
                                animation: 'spin 1s linear infinite',
                            }} />
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {label}
                        </span>
                    </div>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginTop: '8px',
                    }}>
                        {sublabel}
                    </p>
                </div>

                <div style={{ padding: '32px 20px' }}>
                    {/* Connection animation - Simplified design */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '32px',
                        position: 'relative',
                    }}>
                        {/* App icon - simple spinner */}
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        }}>
                            {/* Single spinning ring */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '3px solid rgba(255, 255, 255, 0.1)',
                                borderTopColor: 'var(--color-primary)',
                                animation: 'spin 1s linear infinite',
                            }} />
                        </div>

                        {/* Animated connection line */}
                        <div style={{
                            position: 'relative',
                            width: '60px',
                            height: '3px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '30px',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                                animation: 'slide-right 1.5s ease-in-out infinite',
                            }} />
                        </div>

                        {/* Wallet/TG icon */}
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px',
                        }}>
                            {bindingType === 'self-custody'
                                ? <img src="/brands/MetaMask-icon-fox.svg" alt="MetaMask" style={{ width: '100%', height: '100%' }} />
                                : <img src="/brands/telegram_logo.svg" alt="Telegram" style={{ width: '100%', height: '100%' }} />
                            }
                        </div>
                    </div>

                    {/* Progress bar with gradient */}
                    <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--color-primary), #ffffff)',
                            borderRadius: '3px',
                            transition: 'width 0.1s linear',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        }} />
                    </div>

                    <div style={{
                        textAlign: 'center',
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginTop: '12px',
                        fontWeight: 500,
                    }}>
                        {Math.round(progress)}% Complete
                    </div>
                </div>

                {/* Keyframes for animations */}
                <style>{`
                    @keyframes pulse-ring {
                        0%, 100% { 
                            transform: scale(0.95);
                            opacity: 1;
                        }
                        50% { 
                            transform: scale(1.05);
                            opacity: 0.3;
                        }
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes slide-right {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(300%); }
                    }
                `}</style>
            </div>
        );
    }

    // ─── Step 3: Conflict ────────────────────────────────
    if (step === 'conflict') {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                <div style={{
                    ...headerStyle,
                    background: 'linear-gradient(135deg, rgba(80, 30, 20, 0.5), rgba(60, 20, 15, 0.5))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={20} color="#f59e0b" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>
                            Account Already Bound
                        </span>
                    </div>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        marginTop: '8px',
                        lineHeight: 1.5,
                    }}>
                        This wallet (<span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{MOCK_CONFLICT_ADDRESS}</span>) is already linked to another account.
                    </p>
                </div>

                <div style={{
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                    <button
                        onClick={handleSwitchWallet}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: '#ffffff',
                            border: '1px solid transparent',
                            color: '#000000',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <ArrowLeft size={16} />
                        Switch Wallet
                    </button>

                    <button
                        onClick={handleRetry}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Try Again
                    </button>

                    <div style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        color: 'var(--color-text-dim)',
                        marginTop: '4px',
                    }}>
                        Or <span style={{ color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline' }}>login with existing account</span>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Step 4: Success ─────────────────────────────────
    if (step === 'success') {
        return (
            <div className="card animate-fade-in" style={cardStyle}>
                <div style={{
                    ...headerStyle,
                    background: 'linear-gradient(135deg, rgba(20, 60, 30, 0.5), rgba(15, 50, 25, 0.5))',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={20} color="#22c55e" />
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#22c55e' }}>
                            Binding Successful
                        </span>
                    </div>
                </div>

                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                    {/* Success animation */}
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        animation: 'pulse 2s ease-in-out',
                    }}>
                        <CheckCircle size={32} color="#22c55e" />
                    </div>

                    <div style={{
                        fontSize: '14px',
                        color: 'var(--color-text-primary)',
                        fontWeight: 600,
                        marginBottom: '8px',
                    }}>
                        {bindingType === 'self-custody' ? 'Wallet Connected' : 'SBT Wallet Created'}
                    </div>

                    <div style={{
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        color: 'var(--color-text-secondary)',
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                    }}>
                        {bindingType === 'self-custody'
                            ? MOCK_FULL_ADDRESS
                            : MOCK_TG_WALLET
                        }
                    </div>

                    <div style={{
                        fontSize: '13px',
                        color: 'var(--color-text-dim)',
                    }}>
                        Proceeding to verification...
                    </div>

                    {/* Loading dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '12px' }}>
                        {[0, 150, 300].map((delay, i) => (
                            <span key={i} className="animate-bounce" style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                animationDelay: `${delay}ms`,
                                display: 'inline-block',
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
