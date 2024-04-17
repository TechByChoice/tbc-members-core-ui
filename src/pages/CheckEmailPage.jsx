import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';
import { useAuth } from '@/providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';

function CheckEmailPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const statusMessage = useStatusMessage();

    useEffect(() => {
        // move user to dashboard if the user doesn't
        if (user[0]?.account_info?.is_company_onboarding_complete) {
            statusMessage.info("You've completed onboarding and no longer have access to this screen.");
            navigate('/dashboard', { replace: false });
        }
    }, [ user ]);

    return (
        <Grid container id="top">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        Check your email to confirm your account.
                    </Typography>
                    <Typography variant="subtitle1" component="h2">
                        We sent you an email. Please confirm your to continue
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CheckEmailPage;
