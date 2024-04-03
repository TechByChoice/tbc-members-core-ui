import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent, FormControlLabel, Checkbox, Button } from '@mui/material';
import { routes } from '@/lib/routes';
import { useAuth } from '@/providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';

function ConfirmAccountPage() {
    const [ formData, setFormData ] = useState({ confirm_service_agreement: true });
    const { id, token } = useParams();
    const navigate = useNavigate();
    const statusMessage = useStatusMessage();
    const label = { inputProps: { 'aria-label': 'I agree to the service agreement.' } };
    const { setToken } = useAuth();

    useEffect(() => {
        console.log(id, token);
        fetch(routes.api.companies.activateAccount(id, token), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    // setToken(data.token);
                    // localStorage.setItem('token', data.token);
                    // fetchUserDetails();
                    statusMessage.error(data.message);
                    navigate('/new/company/confirm-agreement/');
                } else {
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // statusMessage.error(error.message);
            });
    }, []);

    return (
        <Grid container center id="top">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        Confirming your account ...
                    </Typography>
                    <Typography variant="subtitle1" component="h2"></Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ConfirmAccountPage;
