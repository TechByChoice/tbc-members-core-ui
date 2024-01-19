import { Box, Button, Card, CardContent, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { useAuth } from '../providers/AuthProvider';
import TipTapEditor from './TipTapEditor';
import { routes } from '../lib/routes';

function ReviewCard({ talentDetails, setOpen }) {
    const [ formData, setFormData ] = useState({});
    const { token } = useAuth();
    const statusMessage = useStatusMessage();

    const handleQuillChange = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
        setFormData(newFormData);
    };

    const handleSubmit = () => {
        fetch(routes.api.mentors.review(talentDetails?.mentorship_program?.id), {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    statusMessage.error('Sorry, we ran into an issue, please try again');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOpen(false);
                statusMessage.success('Saved your review');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                statusMessage.error('Sorry, we ran into an issue, please try again');
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
