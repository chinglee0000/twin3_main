import React, { useState } from 'react';
import { Share2, Twitter, MessageCircle, Copy, CheckCircle, X } from 'lucide-react';

interface ShareModalProps {
    onComplete: () => void;
    onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
    onComplete,
    onClose,
}) => {
    const [shared, setShared] = useState(false);
    const shareText = "Just discovered my Twin Matrix on twin3! 🎯 Check out my unique human profile across 256 dimensions.";
    const shareUrl = "https://twin3.ai";

    const handleShare = (platform: 'twitter' | 'telegram' | 'copy') => {
        if (platform === 'twitter') {
            // Open X share dialog
            const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        } else if (platform === 'telegram') {
            // Open Telegram share dialog
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            window.open(telegramUrl, '_blank');
        } else if (platform === 'copy') {
            // Copy to clipboard
            navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).catch(() => {});
        }

        // Mark as shared
        setShared(true);
        
        // Complete after a short delay
        setTimeout(() => {
            onComplete();
        }, 1500);
    };

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
                    padding: '24px',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {!shared && (
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

                {!shared ? (
                    <>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '20px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'rgba(59, 130, 246, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Share2 size={24} color="#3b82f6" />
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: 'white',
                                    marginBottom: '4px',
                                }}>
                                    Share Twin3
                                </h3>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                }}>
                                    Earn +30 points
                                </p>
                            </div>
                        </div>

                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: '1.6',
                            marginBottom: '24px',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}>
                            {shareText}
                        </p>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}>
                            <button
                                onClick={() => handleShare('twitter')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    background: 'rgba(29, 161, 242, 0.15)',
                                    border: '1px solid rgba(29, 161, 242, 0.3)',
                                    color: '#1DA1F2',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Twitter size={18} />
                                Share on X (Twitter)
                            </button>

                            <button
                                onClick={() => handleShare('telegram')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    background: 'rgba(0, 136, 204, 0.15)',
                                    border: '1px solid rgba(0, 136, 204, 0.3)',
                                    color: '#0088CC',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <MessageCircle size={18} />
                                Share on Telegram
                            </button>

                            <button
                                onClick={() => handleShare('copy')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Copy size={18} />
                                Copy Link
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
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
                            Shared Successfully!
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.7)',
                        }}>
                            +30 Humanity Index points earned
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
