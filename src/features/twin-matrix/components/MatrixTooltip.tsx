/**
 * Matrix Tooltip Component
 * 
 * Portal-based tooltip with position tracking and boundary detection
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
    const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0, placement: 'top' as 'top' | 'bottom' | 'left' | 'right' });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

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

    // Adjust tooltip position to stay within viewport
    useEffect(() => {
        if (open && tooltipRef.current) {
            const tooltip = tooltipRef.current;
            const tooltipRect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            let finalX = position.x;
            let finalY = position.y;
            let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

            // Check if tooltip overflows viewport
            const tooltipWidth = tooltipRect.width;
            const tooltipHeight = tooltipRect.height;

            // Horizontal adjustment
            if (finalX - tooltipWidth / 2 < 10) {
                // Too close to left edge
                finalX = tooltipWidth / 2 + 10;
            } else if (finalX + tooltipWidth / 2 > viewportWidth - 10) {
                // Too close to right edge
                finalX = viewportWidth - tooltipWidth / 2 - 10;
            }

            // Vertical adjustment
            if (finalY - tooltipHeight < 10) {
                // Not enough space on top, show below
                if (triggerRef.current) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    finalY = rect.bottom + 8;
                    placement = 'bottom';
                }
            }

            setAdjustedPosition({ x: finalX, y: finalY, placement });
        }
    }, [open, position]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const tooltipContent = open ? createPortal(
        <div
            ref={tooltipRef}
            role="tooltip"
            style={{
                position: 'fixed',
                top: adjustedPosition.y,
                left: adjustedPosition.x,
                transform: adjustedPosition.placement === 'top' 
                    ? 'translate(-50%, -100%)' 
                    : 'translate(-50%, 0)',
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
                maxWidth: '340px',
                width: 'auto',
                minWidth: '240px',
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
