import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent, FormControlLabel, Checkbox } from '@mui/material';

function ConfirmAccountPage() {
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'I agree to the service agreement.' } };

    useEffect(() => {
        //     Call to validate token on load
    }, []);

    return (
        <Grid container id="top">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        Creating an account means you agree to our service agreement
                    </Typography>
                    <Typography variant="subtitle1" component="h2"></Typography>
                    <FormControlLabel required control={<Checkbox />} label="I agree to the service agreement" />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ConfirmAccountPage;
