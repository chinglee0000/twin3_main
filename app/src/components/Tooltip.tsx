import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'bottom' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const calculatePosition = useCallback(() => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const offset = 8;

        let top = 0;
        let left = 0;

        switch (placement) {
            case 'top':
                top = rect.top - offset;
                left = rect.left + rect.width / 2;
                break;
            case 'bottom':
                top = rect.bottom + offset;
                left = rect.left + rect.width / 2;
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - offset;
                break;
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + offset;
                break;
        }

        setPosition({ top, left });
    }, [placement]);

    const handleMouseEnter = useCallback(() => {
        calculatePosition();
        setIsVisible(true);
    }, [calculatePosition]);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const handleUpdate = () => calculatePosition();
        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);

        return () => {
            window.removeEventListener('scroll', handleUpdate, true);
            window.removeEventListener('resize', handleUpdate);
        };
    }, [isVisible, calculatePosition]);

    const getTransform = () => {
        switch (placement) {
            case 'top':
                return 'translate(-50%, -100%)';
            case 'bottom':
                return 'translate(-50%, 0)';
            case 'left':
                return 'translate(-100%, -50%)';
            case 'right':
                return 'translate(0, -50%)';
        }
    };

    return (
        <>
            <div
                ref={triggerRef}
                style={{ display: 'inline-flex' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {isVisible && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        transform: getTransform(),
                        padding: '6px 12px',
                        background: 'rgba(28, 28, 30, 0.95)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'white',
                        whiteSpace: 'nowrap',
                        zIndex: 99999,
                        pointerEvents: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
};
