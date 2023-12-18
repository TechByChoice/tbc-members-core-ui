import {Button, FormControl, FormHelperText, FormLabel, Grid, OutlinedInput, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../providers/AuthProvider";


export default function AccountDetailsForm() {
    const {user} = useAuth();
    const userDetails = user[0]
    const [formErrors, setFormErrors] = useState({});

    const [formAccountData, setFormAccountData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        postal_code: ''
    });
    useEffect(() => {
        if (userDetails) {
            setFormAccountData({
                first_name: userDetails?.user_info?.first_name,
                last_name: userDetails?.user_info?.last_name,
                email: userDetails?.user_info?.email,
                postal_code: userDetails?.user_info?.userprofile?.postal_code
            });
        }
    }, [userDetails]);

    const handelAccountDetails = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API_BASE_URL + 'user/profile/update/account-details';
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsAlertOpen(true);
                    setStatusType('success');
                    setStatusMessage('Updates have been saved');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAccountChange = (e) => {
        const {name, value} = e.target;
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
                    <hr/>
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update your account details here</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel required htmlFor="first_name">
                                    First Name
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="first_name"
                                    value={formAccountData.first_name}
                                    onChange={handleAccountChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel required htmlFor="last_name">
                                    Last Name
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="last_name"
                                    value={formAccountData.last_name}
                                    onChange={handleAccountChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel required htmlFor="email">
                                    Email
                                </FormLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    name="email"
                                    value={formAccountData.email}
                                    onChange={handleAccountChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.postal_code}>
                                <FormLabel required htmlFor="postal_code">What's your postal code?</FormLabel>
                                <OutlinedInput onChange={handleAccountChange}
                                               value={formAccountData.postal_code}
                                               name="postal_code"/>
                                {!!formErrors.postal_code && <FormHelperText>{formErrors.postal_code}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item mt={3} xs={12} sm={8}>
                            <Button variant="contained"
                                    type="submit"
                                    color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

