import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tooltip } from '../../../components/ui/Tooltip';

interface SidebarNavButtonProps {
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
    onClick: () => void;
}

export const SidebarNavButton: React.FC<SidebarNavButtonProps> = ({
    icon: Icon,
    label,
    isActive,
    isCollapsed,
    onClick
}) => {
    const buttonContent = (
        <button
            onClick={onClick}
            className="btn-ghost sidebar-tab-active"
            style={{
                width: isCollapsed ? '48px' : '100%',
                height: isCollapsed ? '48px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: isCollapsed ? '0' : '12px',
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : undefined,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
        >
            <Icon size={20} />
            {!isCollapsed && <span style={{ fontWeight: 500 }}>{label}</span>}
        </button>
    );

    // Wrap with tooltip only when collapsed (desktop)
    if (isCollapsed && window.innerWidth >= 1024) {
        return (
            <Tooltip content={label} placement="right">
                {buttonContent}
            </Tooltip>
        );
    }

    return buttonContent;
};
