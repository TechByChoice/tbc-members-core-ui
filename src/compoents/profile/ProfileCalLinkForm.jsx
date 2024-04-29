import { Button, FormControl, FormLabel, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import { routes } from '@/lib/routes';

export default function ProfileCalLinkForm() {
    const { user, token } = useAuth();
    const userDetails = user[0];

    const statusMessage = useStatusMessage();

    const [ FormData, setFormData ] = useState({ calendar_link: '' });

    useEffect(() => {
        if (userDetails) {
            setFormData({ calendar_link: userDetails?.mentor_details?.calendar_link?.replace(/https:\/\//g, '') || '' });
        }
    }, [ userDetails ]);

    const handelCalLinkSave = e => {
        e.preventDefault();
        fetch(routes.api.mentors.updateCalLink(), {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'mentor-update-status': 'active',
                calendar_link: FormData.calendar_link,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
                statusMessage.success('Updates have been saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                statusMessage.error('Sorry, it looks like we ran into an issue. Please try again.');
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;

        let updatedValue = value;

        setFormData({
            ...FormData,
            [name]: updatedValue,
        });
    };
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Calendar Link</Typography>
                <hr />
            </Grid>
            <Grid item xs={12} md={4} spacing={3} mt={3}>
                <Typography variant="body1">Update your Calendly link below to make sure people can book mentoring sessions with you!</Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="calendar_link">Your Calendly Link</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="calendar_link"
                                value={FormData.calendar_link}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button variant="contained" color="primary" onClick={handelCalLinkSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
