import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useStatus } from '@/providers/MsgStatusProvider';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const AlertStyle = styled(Alert)(({ theme: { spacing, palette } }) => ({
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2000,
    width: '90%',
    maxWidth: '600px',
}));

const StatusAlert = () => {
    const {
        statusMessage, statusType, setStatusMessage, setIsAlertOpen, isAlertOpen 
    } = useStatus();

    useEffect(() => {
        if (isAlertOpen) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    }, [ isAlertOpen ]);

    const handleClose = () => {
        setStatusMessage(''); // Clear the status message
        setIsAlertOpen(false);
    };
    return (
        isAlertOpen && (
            <AlertStyle
                tabindex={0}
                role="alert"
                severity={statusType}
                id="alerts"
                variant="filled"
                color={statusType}
                action={
                    <IconButton aria-label="Close alert" title="Close alert" color="inherit" size="small" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                }>
                {statusMessage}
            </AlertStyle>
        )
    );
};

export default StatusAlert;
