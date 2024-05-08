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
    const { user } = useAuth();

    useEffect(() => {
        // move user to dashboard if the user doesn't
        if (user[0]?.account_info?.is_company_onboarding_complete) {
            statusMessage.info("You've completed onboarding and no longer have access to this screen.");
            navigate('/dashboard', { replace: false });
        }
    }, [ user ]);

    useEffect(() => {
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
                    statusMessage.success(data.message);
                    navigate('/new/confirm-agreement/');
                } else {
                    statusMessage.error(data.message);
                    console.error('Error:', data.message);
                    navigate('/dashboard/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.error(error.message);
            });
    }, []);

    return (
        <Grid container center id="top">
            <Card>
                <>
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            Confirming your account ...
                        </Typography>
                        <Typography variant="subtitle1" component="h2"></Typography>
                    </CardContent>
                </>
            </Card>
        </Grid>
    );
}

export default ConfirmAccountPage;
