import React from 'react';
import {
    Shield,
    ShieldCheck,
    Image,
    Smartphone,
    Users,
    Fingerprint,
    Calculator,
    Volume2,
    Wallet,
    Cpu,
    Type,
    Brain,
    Clock,
    CheckCircle2
} from 'lucide-react';

// ============================================================
// Types & Data
// ============================================================

export interface VerificationMethod {
    id: string;
    title: string;
    description: string;
    timeEstimate: string;
    points: number;
    icon: React.ElementType;
}

export const VERIFICATION_METHODS: VerificationMethod[] = [
    { id: 'recaptcha-v2', title: 'Google reCAPTCHA v2', description: 'Click "I\'m not a robot"', timeEstimate: '5s', points: 135, icon: Shield },
    { id: 'recaptcha-v3', title: 'Google reCAPTCHA v3', description: 'Invisible background check', timeEstimate: 'Instant', points: 150, icon: ShieldCheck },
    { id: 'image-captcha', title: 'Image CAPTCHA', description: 'Select specific objects', timeEstimate: '10s', points: 120, icon: Image },
    { id: 'sms', title: 'SMS Verification', description: 'Code via text message', timeEstimate: '30s', points: 180, icon: Smartphone },
    { id: 'social', title: 'Social Sign-In', description: 'Google / Apple / FB', timeEstimate: '15s', points: 160, icon: Users },
    { id: 'biometric', title: 'Biometric Verify', description: 'Fingerprint or Face ID', timeEstimate: '5s', points: 200, icon: Fingerprint },
    { id: 'math', title: 'Math CAPTCHA', description: 'Solve simple math', timeEstimate: '10s', points: 110, icon: Calculator },
    { id: 'audio', title: 'Audio CAPTCHA', description: 'Listen and type', timeEstimate: '20s', points: 130, icon: Volume2 },
    { id: 'wallet', title: 'Wallet Signature', description: 'Web3 Login', timeEstimate: '10s', points: 170, icon: Wallet },
    { id: 'device', title: 'Device Fingerprint', description: 'Environment check', timeEstimate: 'Instant', points: 140, icon: Cpu },
    { id: 'text', title: 'Text CAPTCHA', description: 'Type distorted text', timeEstimate: '15s', points: 100, icon: Type },
    { id: 'logic', title: 'Logic Puzzle', description: 'Simple reasoning', timeEstimate: '20s', points: 125, icon: Brain },
];

// ============================================================
// Component
// ============================================================

interface VerificationSelectionCardProps {
    onSelect?: (methodId: string) => void;
    selectedMethods?: string[];
}

export const VerificationSelectionCard: React.FC<VerificationSelectionCardProps> = ({
    onSelect,
    selectedMethods = []
}) => {
    return (
        <div className="card" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                    fontFamily: 'Montserrat, sans-serif'
                }}>
                    Select Verification Method
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Choose a method to verify your human identity and earn Humanity Index points.
                </p>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px'
            }}>
                {VERIFICATION_METHODS.map((method) => {
                    const isSelected = selectedMethods.includes(method.id);
                    return (
                        <button
                            key={method.id}
                            onClick={() => onSelect?.(method.id)}
                            className="glass-hover"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '16px',
                                background: isSelected ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: `1px solid ${isSelected ? 'var(--color-success)' : 'rgba(255, 255, 255, 0.08)'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                minHeight: '160px',
                                justifyContent: 'space-between'
                            }}
                        >
                            {isSelected && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    color: 'var(--color-success)'
                                }}>
                                    <CheckCircle2 size={16} />
                                </div>
                            )}

                            {/* Icon & Title */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '50%',
                                    background: isSelected ? 'rgba(48, 209, 88, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    color: isSelected ? 'var(--color-success)' : 'var(--color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <method.icon size={24} />
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '4px'
                                    }}>
                                        {method.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '11px',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.4'
                                    }}>
                                        {method.description}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: '12px',
                                paddingTop: '8px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                fontSize: '11px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-dim)' }}>
                                    <Clock size={10} />
                                    <span>{method.timeEstimate}</span>
                                </div>
                                <div style={{
                                    color: 'var(--color-info, #8B5CF6)',
                                    fontWeight: 600
                                }}>
                                    +{method.points}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
