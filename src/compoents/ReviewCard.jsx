import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Chip, Box, Rating } from '@mui/material';

import TipTapEditor from './TipTapEditor';
import { useAuth } from '../providers/AuthProvider';
import { useStatus } from '../providers/MsgStatusProvider';

function ReviewCard({ talentDetails, setOpen }) {
    const [ formData, setFormData ] = useState({});
    const { token } = useAuth();
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    const handleQuillChange = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
        setFormData(newFormData);
    };

    const handleSubmit = () => {
        const url = process.env.REACT_APP_API_BASE_URL + `mentorship/reviews/${talentDetails?.mentorship_program?.id}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    setStatusMessage('Sorry, we ran into an issue, please try again');
                    setIsAlertOpen(true);
                    setStatusType('error');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOpen(false);
                setStatusMessage('Saved your review');
                setIsAlertOpen(true);
                setStatusType('success');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setStatusMessage('Sorry, we ran into an issue, please try again');
                setIsAlertOpen(true);
                setStatusType('error');
            });
    };

    return (
        <Card elevation={0} sx={{ position: 'relative' }}>
            <CardContent>
                <>
                    <Typography variant="h6" component="h6">
                        Rating
                    </Typography>
                    <Rating
                        name="raiting"
                        onChange={(event, newValue) => {
                            setFormData({
                                ...formData,
                                rating: newValue,
                            });
                        }}
                    />
                </>
                <>
                    <Typography gutterBottom variant="h6" component="h6">
                        Leave a note
                    </Typography>
                    <TipTapEditor id="mentorship_goals" onFormDataChange={handleQuillChange} />
                </>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" onClick={handleSubmit} size="small">
                    Submit
                </Button>
            </Box>
        </Card>
    );
}

export default ReviewCard;
