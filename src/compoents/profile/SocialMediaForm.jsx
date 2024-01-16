import { Button, FormControl, FormLabel, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';

export default function SocialMediaForm() {
    const { user } = useAuth();
    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({});
    const {
        statusType, setStatusMessage, setIsAlertOpen, setStatusType 
    } = useStatus();

    const [ socialMediaFormData, setSocialMediaFormData ] = useState({
        linkedin: '',
        instagram: '',
        github: '',
        twitter: '',
        youtube: '',
        personal: '',
    });

    useEffect(() => {
        if (userDetails) {
            setSocialMediaFormData({
                linkedin: userDetails?.user_info?.userprofile.linkedin.replace(/https:\/\//g, '') || '',
                instagram: userDetails?.user_info?.userprofile.instagram.replace(/https:\/\//g, '') || '',
                github: userDetails?.user_info?.userprofile.github.replace(/https:\/\//g, '') || '',
                twitter: userDetails?.user_info?.userprofile.twitter.replace(/https:\/\//g, '') || '',
                youtube: userDetails?.user_info?.userprofile.youtube.replace(/https:\/\//g, '') || '',
                personal: userDetails?.user_info?.userprofile.personal.replace(/https:\/\//g, '') || '',
            });
        }
    }, [ userDetails ]);

    const handelSocialAccountSave = e => {
        e.preventDefault();
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/profile/update/social-accounts';
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
                <Typography variant="h6">Social Accounts</Typography>
                <hr />
            </Grid>
            <Grid item xs={12} md={4} spacing={3} mt={3}>
                <Typography variant="body">Update your social accounts here</Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="linkedin">Your Linkedin Profile</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="linkedin"
                                value={socialMediaFormData.linkedin}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="instagram">Instagram handle</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="instagram"
                                value={socialMediaFormData.instagram}
                                startAdornment={<InputAdornment position="start">@</InputAdornment>}
                                type="text"
                                helpertext="It should be @YourUserName"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="github">Your Github Profile</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="github"
                                value={socialMediaFormData.github}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="twitter">Your Twitter Handle</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="twitter"
                                value={socialMediaFormData.twitter}
                                startAdornment={<InputAdornment position="start">@</InputAdornment>}
                                type="text"
                                helpertext="It should be @YourUserName"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="youtube">Your Youtube Profile</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="youtube"
                                value={socialMediaFormData.youtube}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="personal">Your Personal Website</FormLabel>
                            <OutlinedInput
                                onChange={handleChange}
                                name="personal"
                                value={socialMediaFormData.personal}
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button variant="contained" color="primary" onClick={handelSocialAccountSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
