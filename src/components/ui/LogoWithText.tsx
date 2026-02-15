/**
 * LogoWithText Component
 * 
 * Twin3 logo with text, automatically switches between light and dark mode versions
 */

import React, { useEffect, useState } from 'react';

interface LogoWithTextProps {
    className?: string;
    height?: number;
}

export const LogoWithText: React.FC<LogoWithTextProps> = ({
    className,
    height = 28,
}) => {
    const [isDark, setIsDark] = useState(() => 
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        
        matcher.addEventListener('change', handler);
        return () => matcher.removeEventListener('change', handler);
    }, []);

    // Dark mode (dark background): use light mode logo
    // Light mode (light background): use dark mode logo
    const src = isDark
        ? '/brands/logo_text_dark mode.svg'
        : '/brands/logo_text_light mode.svg';

    return (
        <img
            src={src}
            alt="twin3.ai"
            className={className}
            style={{
                height: `${height}px`,
                width: 'auto',
                objectFit: 'contain',
            }}
        />
    );
};
