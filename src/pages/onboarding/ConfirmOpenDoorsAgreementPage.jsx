import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel } from '@mui/material';
import { routes } from '@/lib/routes';
import { useAuth } from '@/providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import { Link } from 'react-router-dom';

function ConfirmOpenDoorsAccountPage() {
    const [ formData, setFormData ] = useState({ confirm_service_agreement: false });
    const { id, token } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const statusMessage = useStatusMessage();

    useEffect(() => {
        // move user to dashboard if the user doesn't
        if (user[0]?.account_info?.is_open_doors_onboarding_complete) {
            statusMessage.info("You've completed onboarding and no longer have access to this screen.");
            navigate('/dashboard', { replace: false });
        }
    }, [ user ]);
    const handleCheckboxChange = event => {
        setFormData({ ...formData, confirm_service_agreement: event.target.checked });
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(routes.api.openDoors.confirmAgreement(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    // setToken(data.token);
                    // localStorage.setItem('token', data.token);
                    // fetchUserDetails();
                    navigate('/dashboard');
                } else {
                    console.error('Error:', data.message);
                    statusMessage.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.error(error.message);
            });
    };

    return (
        <Grid container id="top" justifyContent="center" alignItems="center" style={{ minHeight: '20vh' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        Creating an account means you agree to our terms and conditions
                    </Typography>
                    <Typography variant="subtitle1" component="h2"></Typography>
                    <FormControlLabel
                        required
                        control={<Checkbox onChange={handleCheckboxChange} checked={formData.confirm_service_agreement} />}
                        label={
                            <span>
                                I agree to the service agreement <Link to="/policy/terms-and-conditions">terms and conditions</Link>
                            </span>
                        }
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="outlined" onClick={handleSubmit} size="small">
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default ConfirmOpenDoorsAccountPage;
