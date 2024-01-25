import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorApplication from '../mentorship/FormMentorApplication';
import ProfileMentorDetails from './ProfileMentorDetails';
import { useAuth } from '../../providers/AuthProvider';
import ProfileCalLinkForm from './ProfileCalLinkForm';
import Button from '@mui/material/Button';
import { useStatus } from '../../providers/MsgStatusProvider';
import { routes } from '@/lib/routes';
import { useStatusMessage } from '@/hooks/useStatusMessage';

const filter = createFilterOptions();

export default function ProfileMentorship({ questions }) {
    const { user } = useAuth();
    const statusMessage = useStatusMessage();

    let userData = user[0];
    const [ formData, setFormData ] = useState({
        commitment_level: [],
        mentee_support_areas: [],
        mentor_support_areas: [],
    });
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    // Update formData when userData changes
    useEffect(() => {
        // commitment_level: userData.mentor_details.commitment_level || [],
        if (userData?.mentor_details) {
            setFormData({
                commitment_level: userData.mentor_details.mentor_profile.mentor_commitment_level || [],
                mentee_support_areas: userData.mentor_details.mentee_support_areas || [],
                mentor_support_areas: userData.mentor_details.mentor_support_areas || [],

                commitment_level_id: userData.mentor_details.mentor_profile.mentor_commitment_level.map(item => item.id) || [],
                mentee_support_areas_id: userData.mentor_details.mentee_support_areas.map(item => item.id) || [],
                mentor_support_areas_id: userData.mentor_details.mentor_support_areas.map(item => item.id) || [],
            });
        }
    }, [ userData ]);

    const handelFormSubmit = e => {
        e.preventDefault();

        fetch(routes.api.mentors.signup.commitmentLevel(), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    statusMessage.success('Updates have been saved');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
        <>
            <Grid container>
                {user[0]?.account_info?.is_mentor_application_submitted ? (
                    <>
                        <FormMentorApplication
                            defaultValues={user[0]?.mentor_details}
                            formData={formData}
                            setFormData={setFormData}
                            questions={questions}
                        />
                        <Button variant="contained" color="primary" onClick={handelFormSubmit}>
                            Save
                        </Button>
                        <ProfileMentorDetails />
                        {!user[0]?.account_info?.is_mentor_profile_active ||
                            (user[0]?.account_info?.is_mentor_profile_approved && user[0].mentor_details && (
                                <>
                                    <ProfileCalLinkForm />
                                </>
                            ))}
                    </>
                ) : (
                    <>
                        <Typography variant="h6">We&apos;re currently not taking applications for our mentorship program.</Typography>
                        <Typography variant="body1">
                            We&apos;re currently at our reviewing capacity. Once we address these we will open the application back up.
                        </Typography>
                    </>
                )}
            </Grid>
        </>
    );
}
