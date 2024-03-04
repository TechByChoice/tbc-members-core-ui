import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent } from '@mui/material';

function CheckEmailPage() {
    const navigate = useNavigate();

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
