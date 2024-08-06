import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';

const LoadingScreen = ({message = "Loading..."}) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                }}
            >
                <CircularProgress/>
                <Typography variant="h6" sx={{mt: 2}}>
                    {message}
                </Typography>
            </Box>
        </Box>
    );
};

export default LoadingScreen;
