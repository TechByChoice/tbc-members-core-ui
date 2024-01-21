import { Button, FormControl, FormHelperText, FormLabel, Grid, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';
import { routes } from '../../lib/routes';
import { useStatusMessage } from '@/hooks/useStatusMessage';

export default function AccountDetailsForm() {
    const { user } = useAuth();
    const statusMessage = useStatusMessage();

    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        postal_code: '',
    });
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    const [ formAccountData, setFormAccountData ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        postal_code: '',
    });
    useEffect(() => {
        if (userDetails) {
            setFormAccountData({
                first_name: userDetails?.user_info?.first_name,
                last_name: userDetails?.user_info?.last_name,
                email: userDetails?.user_info?.email,
                postal_code: userDetails?.user_info?.userprofile?.postal_code,
            });
        }
    }, [ userDetails ]);

    const handelAccountDetails = e => {
        e.preventDefault();
        fetch(routes.api.users.updateAccountDetails(), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formAccountData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    statusMessage.success('Updates have been saved');
                } else {
                    console.error('Error:', data.message);
                    const newErrors = {
                        first_name: data.message.first_name ? data.message.first_name[0] : '',
                        last_name: data.message.last_name ? data.message.last_name[0] : '',
                        email: data.message.email ? data.message.email[0] : '',
                        postal_code: data.message.postal_code ? data.message.postal_code[0] : '',
                    };
                    statusMessage.error('We ran into an issue saving. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.error('We ran into an issue saving. Please try again.');
            });
    };

    const handleAccountChange = e => {
        const { name, value } = e.target;
        setFormAccountData({
            ...formAccountData,
            [name]: value,
        });
    };
    return (
        <form onSubmit={handelAccountDetails}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Account Details</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update your account details here</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.first_name}>
                                <FormLabel required htmlFor="first_name" error={!!formErrors.first_name}>
                                    First Name
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="first_name"
                                    error={!!formErrors.first_name}
                                    value={formAccountData.first_name}
                                    onChange={handleAccountChange}
                                />
                                {!!formErrors.first_name && <FormHelperText>{formErrors.first_name}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.last_name}>
                                <FormLabel required htmlFor="last_name">
                                    Last Name
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="last_name"
                                    error={!!formErrors.last_name}
                                    value={formAccountData.last_name}
                                    onChange={handleAccountChange}
                                />
                                {!!formErrors.last_name && <FormHelperText>{formErrors.last_name}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.email}>
                                <FormLabel required htmlFor="email">
                                    Email
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="email"
                                    error={!!formErrors.email}
                                    value={formAccountData.email}
                                    onChange={handleAccountChange}
                                />
                                {!!formErrors.email && <FormHelperText>{formErrors.email}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.postal_code}>
                                <FormLabel required htmlFor="postal_code">
                                    What&apos;s your postal code?
                                </FormLabel>
                                <OutlinedInput onChange={handleAccountChange} value={formAccountData.postal_code} name="postal_code" />
                                {!!formErrors.postal_code && <FormHelperText>{formErrors.postal_code}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item mt={3} xs={12} sm={8}>
                            <Button variant="contained" type="submit" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}
