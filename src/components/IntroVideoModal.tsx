import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface IntroVideoModalProps {
    onClose: () => void;
}

export const IntroVideoModal: React.FC<IntroVideoModalProps> = ({ onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Auto-play when modal opens
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay may be blocked, user can click to play
            });
        }
    }, []);

    const handleVideoEnd = () => {
        onClose();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out'
            }}
        >
            {/* Skip Button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    zIndex: 10000
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
            >
                Skip
                <X size={16} />
            </button>

            {/* Video Container */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <video
                    ref={videoRef}
                    src="/videos/twin3_60s_highlight ver.mp4"
                    onEnded={handleVideoEnd}
                    controls
                    playsInline
                    style={{
                        width: '100%',
                        maxHeight: '80vh',
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                />
            </div>
        </div>
    );
};
