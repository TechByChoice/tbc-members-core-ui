import { Button, FormControl, FormLabel, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';

export default function ProfileCalLinkForm() {
    const { user } = useAuth();
    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({});
    const {
        statusType, setStatusMessage, setIsAlertOpen, setStatusType 
    } = useStatus();

    const [ socialMediaFormData, setSocialMediaFormData ] = useState({calendar_link: '',});

    useEffect(() => {
        if (userDetails) {
            setSocialMediaFormData({calendar_link: userDetails?.user_info?.userprofile?.calendar_link?.replace(/https:\/\//g, '') || '',});
        }
    }, [ userDetails ]);

    const handelSocialAccountSave = e => {
        e.preventDefault();
        const url = process.env.REACT_APP_API_BASE_URL + 'user/profile/update/social-accounts';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(socialMediaFormData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsAlertOpen(true);
                    setStatusType('success');
                    setStatusMessage('Updates have been saved');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsAlertOpen(true);
                setStatusType('error');
                setStatusMessage('error');
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;

        let updatedValue = value;
        if (name === 'company_url' && !value.startsWith('https://')) {
            updatedValue = `https://${value}`;
        }

        setSocialMediaFormData({
            ...socialMediaFormData,
            [name]: updatedValue,
        });
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
                            <FormLabel htmlFor="calendly_link">Your Calendly Link</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="calendly_link"
                                value={socialMediaFormData.calendly_link}
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
