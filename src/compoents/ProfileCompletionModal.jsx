import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileCompletionModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogContent>
                <Typography>
                    Open Doors power comes from our anonymous inclusive insights reports. By completing your profile you&apos;ll be able to maximize the impact of your
                    review.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Not Now</Button>
                <Button component={Link} to="/new/2" onClick={onClose} variant="contained" color="primary">
                    Complete Profile
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileCompletionModal;
