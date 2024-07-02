import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Card, CardContent, FormControlLabel, Checkbox, Button } from '@mui/material';
import { routes } from '@/lib/routes';
import { useAuth } from '@/providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import TextField from '@mui/material/TextField';
import { validatePassword } from '@/utils/passwordValidationUtil';

function CreateNewPasswordPage() {
    const [ isSetPasswordActive, setIsSetPasswordActive ] = useState(true);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const { id, token } = useParams();
    const navigate = useNavigate();
    const statusMessage = useStatusMessage();
    const [ passwordErrors, setPasswordErrors ] = useState([]);
    const label = { inputProps: { 'aria-label': 'I agree to the service agreement.' } };
    const { setToken } = useAuth();

    useEffect(() => {
        setPasswordErrors(validatePassword(password, confirmPassword));
    }, [ password, confirmPassword ]);
    const handleSubmit = () => {
        fetch(routes.api.auth.confirmPasswordReset(id, token), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, id: id, token: token }),
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.status === 'success') {
                    console.log(data);
                    if (data.message === 'Email already confirmed!') {
                        statusMessage.success(`${data.message} Please login.`);
                        setIsSetPasswordActive(false);
                        navigate('/');
                    } else {
                        setIsSetPasswordActive(true);
                        statusMessage.success(data.message);
                        navigate('/');
                    }
                } else {
                    statusMessage.error(data.detail || data.message);
                    setIsSetPasswordActive(false);
                    console.error('Error:', data.detail);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.error(error.message);
            });
    };

    return (
        <Card>
            {!isSetPasswordActive ? (
                <>
                    <CardContent>
                        <Typography variant="h5" component="h1" align="center">
                            This link is no longer active
                        </Typography>
                        <Typography variant="subtitle1" component="h2">
                            If you need to reset your password,
                            <Link to="/password-reset">
                                <Button variant="text" size="small">
                                    please use this link
                                </Button>
                            </Link>
                        </Typography>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            Choose a new password
                        </Typography>
                        {passwordErrors.length > 0 && (
                            <ul>
                                {passwordErrors.map((error, index) => (
                                    <li key={index} style={{ color: 'red' }}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Typography variant="subtitle1" component="h2"></Typography>
                        <TextField
                            required
                            variant="outlined"
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            required
                            variant="outlined"
                            autoComplete="current-password"
                            id="password"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <Button disabled={passwordErrors.length > 0} variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
                            Update Password
                        </Button>
                    </CardContent>
                </>
            )}
        </Card>
    );
}

export default CreateNewPasswordPage;
