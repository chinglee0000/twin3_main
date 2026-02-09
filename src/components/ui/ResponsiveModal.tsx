import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ResponsiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    fullHeight?: boolean;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    fullHeight = false
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setAnimateIn(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setAnimateIn(false), 300);
            document.body.style.overflow = '';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !animateIn) return null;

    // Mobile Bottom Sheet styles
    const mobileStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: fullHeight ? 0 : 'auto',
        maxHeight: fullHeight ? '100%' : '85vh',
        background: 'var(--glass-bg)', // Using app's glass theme
        backdropFilter: 'blur(20px) saturate(180%)',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
    };

    // Desktop Modal styles
    const desktopStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        maxWidth: '800px', // Standard width
        maxHeight: '85vh',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '16px',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.2s ease-out',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            pointerEvents: isOpen ? 'auto' : 'none',
        }}>
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* Modal Content */}
            <div style={isMobile ? mobileStyle : desktopStyle} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                }}>
                    {isMobile && (
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '4px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '2px',
                        }} />
                    )}
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: isMobile ? '12px 0 0 0' : 0 // Add margin for pull bar
                    }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="btn-ghost"
                        style={{
                            padding: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: isMobile ? '12px' : 0
                        }}
                    >
                        <X size={20} color="var(--color-text-secondary)" />
                    </button>
                </div>

                {/* Body */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px',
                    WebkitOverflowScrolling: 'touch',
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
