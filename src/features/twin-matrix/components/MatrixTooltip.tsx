/**
 * Matrix Tooltip Component
 * 
 * Portal-based tooltip with position tracking
 */

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface MatrixTooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}

export function MatrixTooltip({ children, content, disabled }: MatrixTooltipProps) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 8
            });
        }
        timeoutRef.current = setTimeout(() => setOpen(true), 100);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const tooltipContent = open ? createPortal(
        <div
            role="tooltip"
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                transform: 'translate(-50%, -100%)',
                zIndex: 99999,
                background: 'rgba(28, 28, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13px',
                color: 'var(--color-text-primary, #ffffff)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                whiteSpace: 'normal',
                animation: 'fade-in 0.15s ease-out',
                pointerEvents: 'none',
                maxWidth: '280px',
            }}
        >
            {content}
        </div>,
        document.body
    ) : null;

    if (disabled) return <>{children}</>;

    return (
        <div
            ref={triggerRef}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {tooltipContent}
        </div>
    );
}
