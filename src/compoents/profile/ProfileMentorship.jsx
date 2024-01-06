import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorApplication from '../mentorship/FormMentorApplication';
import ProfileMentorDetails from './ProfileMentorDetails';
import { useAuth } from '../../providers/AuthProvider';
import ProfileCalLinkForm from './ProfileCalLinkForm';

const filter = createFilterOptions();

export default function ProfileMentorship({ questions }) {
    const { user } = useAuth();
    let userData = user[0];
    const [ formData, setFormData ] = useState({
        commitment_level: userData.menor_program,
        mentee_support_areas: userData.menor_program,
        mentor_support_areas: userData.menor_program,
    });

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
                        <ProfileMentorDetails />
                        {!user[0]?.account_info?.is_mentor_profile_active && user[0]?.account_info?.is_mentor_profile_approved && (
                            <>
                                <ProfileCalLinkForm />
                            </>
                        )}
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
