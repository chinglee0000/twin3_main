/**
 * useSidebar Hook
 * 
 * Handles sidebar visibility state for responsive design
 */

import { useState, useEffect, useCallback } from 'react';

interface UseSidebarReturn {
    sidebarOpen: boolean;
    rightSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    setRightSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    toggleRightSidebar: () => void;
    closeSidebarOnMobile: () => void;
}

export function useSidebar(): UseSidebarReturn {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    // Auto-open sidebar on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    const toggleRightSidebar = useCallback(() => {
        setRightSidebarOpen(prev => !prev);
    }, []);

    const closeSidebarOnMobile = useCallback(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, []);

    return {
        sidebarOpen,
        rightSidebarOpen,
        setSidebarOpen,
        setRightSidebarOpen,
        toggleSidebar,
        toggleRightSidebar,
        closeSidebarOnMobile,
    };
}
