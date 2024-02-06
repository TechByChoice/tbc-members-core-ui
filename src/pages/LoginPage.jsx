import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useStatus } from '@/providers/MsgStatusProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import { useStatusMessage } from '../hooks/useStatusMessage';
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

function LoginPage() {
    const {
        login, user, isAuthenticated, errorMessage 
    } = useAuth();
    const { statusType } = useStatus();
    const statusMessage = useStatusMessage();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rememberMe, setRememberMe ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let emailLower = username.toLocaleLowerCase();
        await login(emailLower, emailLower, password, timezone);
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
            <Grid item xs={12} sm={6} id="left">
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
                                    Login
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
                                    <TextField
                                        required
                                        variant="outlined"
                                        autoComplete="current-password"
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        margin="normal"
                                        fullWidth
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} name="rememberMe" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button variant="contained" color="primary" fullWidth={true} type="submit">
                                        Log in
                                    </Button>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                    <Link to="/new/member/1">{"Don't have an account? Sign Up"}</Link>
                                </form>
                            </>
                        )}
                    </FormContainer>
                </CenteredContent>

                {/*    */}
            </Grid>
            <Grid item xs={12} sm={6}>
                <ImageBG
                    id="right"
                    style={{
                        backgroundImage:
                            'https://uploads-ssl.webflow.com/5fc4802f4edc553647330622/5fd04d6d1ea5ad04a37db102_pexels-jopwell-2422290-p-1600.jpeg',
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default LoginPage;
