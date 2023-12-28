import React, { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorProfile from '../mentorship/FormMentorProfile';
import { Button, Grid } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';

export default function ProfileMentorDetails() {
    const [ formData, setFormData ] = useState({});
    const { user, token } = useAuth();

    function handleSave() {
        const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/update/profile/';
        console.log(formData);
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data, 'saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <>
            {user.is_mentor_application_submitted ? (
                <>
                    <FormMentorProfile formData={formData} setFormData={setFormData} />
                    <Grid item xs={12} sm={8}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Update
                        </Button>
                    </Grid>
                </>
            ) : (
                <>
                    <h1>Would you like to build a snowman</h1>
                </>
            )}
        </>
    );
}
