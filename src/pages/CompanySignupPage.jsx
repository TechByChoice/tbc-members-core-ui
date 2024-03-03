import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useStatus } from '../providers/MsgStatusProvider';
import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { routes } from '@/lib/routes';
import { Link } from 'react-router-dom';

const CenteredContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh;
`;

const FormContainer = styled.div`
    width: 80%;
    max-width: 500px;
`;

const ImageBG = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('https://uploads-ssl.webflow.com/5fc4802f4edc553647330622/5fd04d6d1ea5ad04a37db102_pexels-jopwell-2422290-p-1600.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

function CompanySignupPage() {
    const auth = useAuth();
    const { statusType } = useStatus();
    const statusMessage = useStatusMessage();

    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        company_name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const isAuthenticated = false;
    const { setToken, fetchUserDetails } = useAuth();

    const handleSubmit = async event => {
        event.preventDefault();

        fetch(routes.api.users.signUp(), {
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
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    fetchUserDetails();
                    statusMessage.success('Welcome to Tech by Choice');
                    navigate('/new/member/2');
                } else {
                    console.error('Error:', data.message);
                    statusMessage.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.error(error.message);
            });

        fetchUserDetails();
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    useEffect(() => {
        if (auth?.user?.length > 0) {
            navigate('/', { replace: true });
        } else {
            fetchUserDetails();
        }
    }, [ auth.user ]);

    useEffect(() => {
        if (!auth.errorMessage) {
            statusMessage.hide();
            return;
        }

        if (auth.errorMessage['non_field_errors']) {
            statusMessage.error(auth.errorMessage['non_field_errors'][0]);
        }
    }, [ auth.errorMessage ]);

    return (
        <>
            <Typography variant="h4" component="h1" align="center">
                Company Account
            </Typography>
            {auth.errorMessage?.length > 0 &&
                auth.errorMessage.map((error, index) => (
                    <Alert key={index} severity={statusType}>
                        {error} test
                    </Alert>
                ))}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="outlined"
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            type="text"
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="outlined"
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <TextField
                    required
                    variant="outlined"
                    id="email"
                    name="email"
                    label="Email"
                    type="text"
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    required
                    variant="outlined"
                    id="company_name"
                    name="company_name"
                    label="Company Name"
                    type="text"
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    required
                    variant="outlined"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />

                <Button variant="contained" color="primary" fullWidth={true} type="submit">
                    Create Account
                </Button>
                <Link to="/">Have an account? Login</Link>
            </form>
        </>
    );
}

export default CompanySignupPage;
