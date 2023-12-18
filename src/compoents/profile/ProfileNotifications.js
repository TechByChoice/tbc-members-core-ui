import {
    Button, Checkbox,
    FormControl, FormControlLabel,
    Grid,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
import {useAuth} from "../../providers/AuthProvider";
import {useStatus} from "../../providers/MsgStatusProvider";

const filter = createFilterOptions();

export default function ProfileNotifications() {
    const {user} = useAuth();
    const {statusType, setStatusMessage, setIsAlertOpen, setStatusType} = useStatus();
    const userDetails = user[0];
    const [notificationsFormData, setNotificationsFormData] = useState({
        marketing_jobs: false,
        marketing_events: false,
        marketing_org_updates: false,
        marketing_identity_based_programing: false,
        marketing_monthly_newsletter: false,
    });

    const extractDefaultValues = () => {
        // Extract the skills and roles from userDetails and map them to the corresponding objects in questions.
        // The method to do this depends on the structure of userDetails and questions.
        // Assuming that userDetails contains an array of strings like "role: 20"

        const defaults = {
            marketing_jobs: false,
            marketing_events: false,
            marketing_org_updates: false,
            marketing_identity_based_programing: false,
            marketing_monthly_newsletter: false,
        };

    defaults.marketing_jobs = userDetails.user_info.userprofile.marketing_jobs || false;
    defaults.marketing_events = userDetails.user_info.userprofile.marketing_events || false;
    defaults.marketing_org_updates = userDetails.user_info.userprofile.marketing_org_updates || false;
    defaults.marketing_identity_based_programing = userDetails.user_info.userprofile.marketing_identity_based_programing || false;
    defaults.marketing_monthly_newsletter = userDetails.user_info.userprofile.marketing_monthly_newsletter || false;

        return defaults;
    };

    useEffect(() => {
        if (userDetails) {
            const defaultValues = extractDefaultValues()
            setNotificationsFormData({
                marketing_jobs: defaultValues.marketing_jobs || false,
                marketing_events: defaultValues.marketing_events || false,
                marketing_org_updates: defaultValues.marketing_org_updates || false,
                marketing_identity_based_programing: defaultValues.marketing_identity_based_programing || false,
                marketing_monthly_newsletter: defaultValues.marketing_monthly_newsletter || false,
            });
        }
    }, [userDetails]);

    const handleChange = (event) => {
        const {name, checked} = event.target;
        console.log(`Changing ${name} to ${checked}`);
        setNotificationsFormData((prevFormData) => ({...prevFormData, [name]: checked}));
    };

    function handleSave(e) {
        e.preventDefault()
        const url = process.env.REACT_APP_API_BASE_URL + 'user/profile/update/notifications';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
                // 'credentials': 'include',
            },
            body: JSON.stringify(notificationsFormData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsAlertOpen(true);
                    setStatusType('success');
                    setStatusMessage('Updates have been saved');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Notifications</Typography>
                    <hr/>
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update how and when we reach out to you</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        {/* Checkbox for Our Monthly Newsletter */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange}
                                                       checked={notificationsFormData.marketing_monthly_newsletter}

                                                       name="marketing_monthly_newsletter"/>}
                                    label="Our Monthly Newsletter"
                                />
                            </FormControl>
                        </Grid>

                        {/* Checkbox for Community Events */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange}
                                                       checked={notificationsFormData.marketing_events}
                                                       name="marketing_events"/>}
                                    label="Community Events"
                                />
                            </FormControl>
                        </Grid>

                        {/* Checkbox for Interest Based Programing */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange}
                                                       checked={notificationsFormData.marketing_identity_based_programing}

                                                       name="marketing_identity_based_programing"/>}
                                    label="Interest Based Programing"
                                />
                            </FormControl>
                        </Grid>

                        {/* Checkbox for Open Jobs & Job Hunting Tips */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange}
                                                       checked={notificationsFormData.marketing_jobs}
                                                       name="marketing_jobs"/>}
                                    label="Open Jobs & Job Hunting Tips"
                                />
                            </FormControl>
                        </Grid>

                        {/* Checkbox for Community Updates */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange}
                                                       checked={notificationsFormData.marketing_org_updates}
                                                       name="marketing_org_updates"/>}
                                    label="Community Updates"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}