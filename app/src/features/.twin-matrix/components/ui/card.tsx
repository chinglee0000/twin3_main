/**
 * Card Component - Standalone version for Vite + React
 * Based on shadcn/ui Card component
 */
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
    return (
        <div
            className={`card ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`card-header ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({ className = '', children, ...props }: CardProps) {
    return (
        <h3 className={`card-title ${className}`} {...props}>
            {children}
        </h3>
    )
}

export function CardDescription({ className = '', children, ...props }: CardProps) {
    return (
        <p className={`card-description ${className}`} {...props}>
            {children}
        </p>
    )
}

export function CardContent({ className = '', children, ...props }: CardProps) {
    return (
        <div className={`card-content ${className}`} {...props}>
            {children}
        </div>
    )
}
