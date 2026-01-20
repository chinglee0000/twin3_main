import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'light' | 'dark'; // 'light' means for light background (so dark logo), 'dark' means for dark background
    width?: string | number;
    height?: string | number;
}

export const Logo: React.FC<LogoProps> = ({
    className,
    variant = 'dark', // Default to dark mode (dark background -> light/appropriate logo)
    width = 28,
    height = 28
}) => {
    // User request:
    // light mode (light background): /brands/twin3-black-circle.png
    // dark mode (dark background): /brands/twin3-black-half.png

    // Note: The naming in the request might differ from my prop 'variant' semantics.
    // simpler interpretation: 
    // If we are in "Light Mode" (the app theme is light), we use the "light mode" logo.
    // If we are in "Dark Mode" (the app theme is dark), we use the "dark mode" logo.

    const src = variant === 'light'
        ? "/brands/twin3-black-circle.png"
        : "/brands/twin3-black-half.png";

    return (
        <img
            src={src}
            alt="twin3"
            className={className}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius: 'var(--radius-md)',
                objectFit: 'contain'
            }}
        />
    );
};
