import { Button, FormControl, FormLabel, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';

export default function ProfileCalLinkForm() {
    const { user, token } = useAuth();
    const userDetails = user[0];

    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    const [ socialMediaFormData, setSocialMediaFormData ] = useState({ calendar_link: '' });

    useEffect(() => {
        if (userDetails) {
            setSocialMediaFormData({ calendar_link: userDetails?.mentor_details?.calendar_link?.replace(/https:\/\//g, '') || '' });
        }
    }, [ userDetails ]);

    const handelSocialAccountSave = e => {
        e.preventDefault();
        const url = process.env.REACT_APP_API_BASE_URL + `mentorship/update/calendar-link/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'mentor-update-status': 'active',
                calendar_link: socialMediaFormData.calendar_link,
            }),
        })
            .then(response => {
                console.log(response, 'response');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data, 'saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;

        let updatedValue = value;
        // if (!value.startsWith('https://')) {
        //     updatedValue = `https://${value}`;
        // }

        setSocialMediaFormData({
            ...socialMediaFormData,
            [name]: updatedValue,
        });
        console.log(socialMediaFormData);
    };
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Calendar Link Integration</Typography>
                <hr />
            </Grid>
            <Grid item xs={12} md={4} spacing={3} mt={3}>
                <Typography variant="body">Update your Calendly link below to make sure people can book mentoring sessions with you!</Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="calendar_link">Your Calendly Link</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="calendar_link"
                                value={socialMediaFormData.calendar_link}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button variant="contained" color="primary" onClick={handelSocialAccountSave}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
