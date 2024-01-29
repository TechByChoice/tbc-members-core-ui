import React, { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorProfile from '../mentorship/FormMentorProfile';
import { Button, Grid } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { routes } from '../../lib/routes';

export default function ProfileMentorDetails() {
    const [ formData, setFormData ] = useState({});
    const { user, token } = useAuth();

    function handleSave() {
        fetch(routes.api.mentors.updateDetails(), {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
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
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <>
            <>
                <FormMentorProfile defaultData={user[0]?.mentor_details?.mentor_profile} formData={formData} setFormData={setFormData} />
                <Grid item xs={12} sm={8}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Grid>
            </>
        </>
    );
}
