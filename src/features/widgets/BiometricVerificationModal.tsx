import React, { useState, useEffect } from 'react';
import { Fingerprint, Smartphone, CheckCircle, X } from 'lucide-react';

interface BiometricVerificationModalProps {
    onComplete: () => void;
    onClose: () => void;
}

export const BiometricVerificationModal: React.FC<BiometricVerificationModalProps> = ({
    onComplete,
    onClose,
}) => {
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

    const handleVerify = () => {
        setStatus('verifying');
        
        // Simulate biometric verification
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onComplete();
            }, 1500);
        }, 2000);
    };

    useEffect(() => {
        if (status === 'idle') {
            // Auto-start verification after modal opens
            setTimeout(() => handleVerify(), 500);
        }
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                animation: 'fadeIn 0.15s ease-out',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '380px',
                    background: 'rgba(28, 28, 30, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {status !== 'success' && (
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        <X size={18} />
                    </button>
                )}

                {status === 'verifying' && (
                    <>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'rgba(59, 130, 246, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}>
                            <Fingerprint size={40} color="#3b82f6" />
                        </div>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 500,
                            fontFamily: 'Montserrat, sans-serif',
                            color: 'white',
                            marginBottom: '12px',
                        }}>
                            Verifying Biometrics
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.6',
                        }}>
                            Please use your device's biometric authentication (Face ID, Touch ID, or Fingerprint)
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '24px',
                        }}>
                            <Smartphone size={16} color="rgba(255, 255, 255, 0.5)" />
                            <span style={{
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.5)',
                            }}>
                                Simulating iOS/Android verification...
                            </span>
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'rgba(34, 197, 94, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                        }}>
                            <CheckCircle size={40} color="#22c55e" />
                        </div>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 500,
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#22c55e',
                            marginBottom: '12px',
                        }}>
                            Verification Complete!
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.7)',
                        }}>
                            +50 Humanity Index points earned
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
