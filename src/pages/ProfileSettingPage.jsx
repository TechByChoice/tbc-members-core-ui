import React, { useState, useEffect } from 'react';
import { Avatar, Button, FormLabel, OutlinedInput, Grid, Typography, FormControl, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';
import { useAuth } from '../providers/AuthProvider';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ProfileBasicInfo from '../compoents/profile/ProfileBasicInfo';
import ProfileInterests from '../compoents/profile/ProfileInterests';
import ProfileMentorship from '../compoents/profile/ProfileMentorship';
import ProfileNotifications from '../compoents/profile/ProfileNotifications';
import ProfileIdentity from '../compoents/profile/ProfileIdentity';

const Root = styled(Box)`
    height: 100%;
`;

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    margin: 16px;
`;

const Form = styled(FormControl)`
    width: 100%;
    margin-top: 8px;
`;

const SubmitButton = styled(Button)`
    margin: 24px 0 16px;
`;

function TabPanel(props) {
    const {
        children, value, index, ...other 
    } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function ProfileSettingPage({ userDetail }) {
    const [ value, setValue ] = useState(0);
    const auth = useAuth();
    const profile_url = import.meta.env.VITE_APP_STRIPE_PPROFILE_URL;
    const formError = {};

    const [ isEditing, setIsEditing ] = useState(false);
    const [ questions, setQuestions ] = useState({});
    /** @type {any} fromData */
    const [ fromData, setFormData ] = useState();

    useEffect(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/details/new-member';
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
                // 'credentials': 'include',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setQuestions(data);
                    // setAnswers(initialAnswers);
                    if (data.detail === 'Invalid token.') {
                        auth.logout();
                    }
                } else {
                    console.error(data);
                }
            });
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...fromData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // send form data to backend API to update user profile
        setIsEditing(false);
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!questions || Object.keys(questions).length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <Root sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, minWidth: '15vw', borderColor: 'divider' }}>
                <Tab label="Account Details" {...a11yProps(0)} />
                <Tab label="Interests" {...a11yProps(1)} />
                <Tab label="Identity" {...a11yProps(2)} />
                <Tab label="Notifications" {...a11yProps(3)} />
                <Tab label="Mentorship" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileBasicInfo questions={questions} formErrors={formError} handleChange={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfileInterests questions={questions} handleChange={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProfileIdentity questions={questions} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProfileNotifications />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ProfileMentorship questions={questions} />
            </TabPanel>
        </Root>
    );
}
export default ProfileSettingPage;
