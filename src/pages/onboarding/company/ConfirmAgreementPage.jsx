import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent, FormControlLabel, Checkbox, Button, CardActions } from '@mui/material';
import { routes } from '@/lib/routes';

function ConfirmAccountPage() {
    const [ formData, setFormData ] = useState({ confirm_service_agreement: false });
    const { id, token } = useParams();
    const navigate = useNavigate();

    const handleCheckboxChange = event => {
        setFormData({ ...formData, confirm_service_agreement: event.target.checked });
    };

    const handleSubmit = event => {
        event.preventDefault();
        fetch(routes.api.companies.confirmAgreement(), {
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
                    navigate('/new/company/create-profile');
                } else {
                    console.error('Error:', data.message);
                    // statusMessage.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // statusMessage.error(error.message);
            });
    };

    return (
        <Grid container id="top">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h1">
                        Creating an account means you agree to our service agreement
                    </Typography>
                    <Typography variant="subtitle1" component="h2"></Typography>
                    <FormControlLabel
                        required
                        control={<Checkbox onChange={handleCheckboxChange} checked={formData.confirm_service_agreement} />}
                        label="I agree to the service agreement"
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

export default ConfirmAccountPage;
