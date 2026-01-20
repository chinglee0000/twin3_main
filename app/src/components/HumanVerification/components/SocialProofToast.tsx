import React, { useState, useEffect } from 'react';
import { Snackbar, Box, Typography, IconButton } from '@mui/material';
import { CheckCircle, X } from 'lucide-react';


interface SocialProofToastProps {
    count?: number;
    delay?: number;
}

export const SocialProofToast: React.FC<SocialProofToastProps> = ({
    count = 75321,
    delay = 1000
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                top: { xs: 24, sm: 24 },
                zIndex: 9999
            }}
        >
            <Box
                className="animate-fade-in-down"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '12px 16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    minWidth: '320px',
                    maxWidth: '90vw',
                    borderLeft: '4px solid #10B981', // Emerald 500
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Icon Container */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', // Emerald 100 equivalent
                    flexShrink: 0
                }}>
                    <CheckCircle size={18} color="#10B981" fill="currentColor" fillOpacity={0.2} />
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                        Success
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.4 }}>
                        <span style={{ fontWeight: 600, color: '#10B981' }}>{count.toLocaleString()}</span> citizens have minted SBT
                    </Typography>
                </Box>

                {/* Close Button */}
                <IconButton
                    size="small"
                    onClick={handleClose}
                    sx={{
                        color: '#9CA3AF',
                        '&:hover': { color: '#4B5563', backgroundColor: 'rgba(0,0,0,0.05)' }
                    }}
                >
                    <X size={16} />
                </IconButton>
            </Box>
        </Snackbar>
    );
};
