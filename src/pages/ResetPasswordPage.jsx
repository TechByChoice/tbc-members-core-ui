import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useStatus } from '@/providers/MsgStatusProvider';
import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';

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
function ResetPasswordPage() {
    const {
        login, user, isAuthenticated, errorMessage 
    } = useAuth();
    const { statusType } = useStatus();
    const statusMessage = useStatusMessage();

    const [ username, setUsername ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        const url = routes.api.auth.passwordReset();
        fetch(url, {
            method: 'POST',
            headers: {
                // Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username.toLocaleLowerCase() }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    statusMessage.success('If you have an account with an email has been sent with details.');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    useEffect(() => {
        if (user?.length > 0) {
            navigate('/dashboard', { replace: true });
        }
    }, [ user ]);

    useEffect(() => {
        if (!errorMessage) {
            statusMessage.hide();
            return;
        }

        if (errorMessage['non_field_errors']) {
            statusMessage.error(errorMessage['non_field_errors'][0]);
        }
    }, [ errorMessage ]);

    function handleRememberMeChange() {}

    return (
        <Grid container id="top">
            <Grid item xs={12} id="left">
                {/* Left side */}
                <CenteredContent>
                    <FormContainer>
                        {isAuthenticated ? (
                            <Typography variant="h3" align="center">
                                You are already logged in
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="h3" component="h1" align="center">
                                    Forgot Password?
                                </Typography>
                                <Typography variant="h6" component="h2" align="left">
                                    No worries, we&apos;ll send you details on how to reset your password to your email.
                                </Typography>
                                {errorMessage?.length > 0 &&
                                    errorMessage.map((error, index) => (
                                        <Alert key={index} severity={statusType}>
                                            {error} test
                                        </Alert>
                                    ))}

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="username"
                                        label="Email"
                                        type="text"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                        margin="normal"
                                        fullWidth
                                    />

                                    <Button variant="contained" sx={{ marginBottom: 2 }} color="primary" fullWidth={true} type="submit">
                                        Reset Password
                                    </Button>
                                    <Grid display="flex" direction="column" justifyContent="start" container>
                                        <Grid item>
                                            <Button component={Link} to="/" variant="text">
                                                Login
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button component={Link} to="/new" variant="text">
                                                Don&apos;t have an account? Sign Up
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </>
                        )}
                    </FormContainer>
                </CenteredContent>

                {/*    */}
            </Grid>
        </Grid>
    );
}

export default ResetPasswordPage;
