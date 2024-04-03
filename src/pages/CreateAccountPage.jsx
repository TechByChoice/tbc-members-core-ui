import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useStatus } from '@/providers/MsgStatusProvider';
import styled from '@emotion/styled';
import { Box, Tab, Tabs } from '@mui/material';
import CompanySignupPage from '@/pages/CompanySignupPage';
import MemberSignupPage from '@/pages/MemberSignupPage';
import { useStatusMessage } from '@/hooks/useStatusMessage';

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

function CustomTabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CreateAccountPage() {
    const {
        login, user, isAuthenticated, errorMessage 
    } = useAuth();
    const { statusType } = useStatus();
    const statusMessage = useStatusMessage();
    const [ value, setValue ] = React.useState(0);
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, []);

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
            <Grid item xs={12} sm={8} id="left">
                {/* Left side */}
                <CenteredContent>
                    <FormContainer>
                        {isAuthenticated ? (
                            <Typography variant="h3" align="center">
                                You are already logged in
                            </Typography>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Member Account" />
                                    <Tab label="Company Account" />
                                </Tabs>
                                <CustomTabPanel value={value} index={0}>
                                    <MemberSignupPage />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <CompanySignupPage />
                                </CustomTabPanel>
                            </div>
                        )}
                    </FormContainer>
                </CenteredContent>

                {/*    */}
            </Grid>
            <Grid item xs={12} sm={4}>
                <ImageBG
                    id="right"
                    style={{ backgroundImage: 'https://uploads-ssl.webflow.com/5fc4802f4edc553647330622/5fd04d6d1ea5ad04a37db102_pexels-jopwell-2422290-p-1600.jpeg' }}
                />
            </Grid>
        </Grid>
    );
}

export default CreateAccountPage;
