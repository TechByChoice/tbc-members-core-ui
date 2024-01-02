import { Autocomplete, Button, FormControl, FormHelperText, FormLabel, Grid, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorApplication from '../mentorship/FormMentorApplication';
import FormMentorshipValues from '../mentorship/FormMentorshipValues';
import TipTapEditor from '../TipTapEditor';
import FormMentorCareer from '../mentorship/FormMentorCareer';
import FormMentorProfile from '../mentorship/FormMentorProfile';
import ProfileMentorDetails from './ProfileMentorDetails';
import { useAuth } from '../../providers/AuthProvider';
import ProfileCalLinkForm from './ProfileCalLinkForm';

const filter = createFilterOptions();

export default function ProfileMentorship({ questions }) {
    const { user } = useAuth();
    const [ formData, setFormData ] = useState({});

    const handleEditorUpdate = (editorId, content) => {
        formData(prevFormData => ({
            ...prevFormData,
            [editorId]: content,
        }));
    };

    return (
        <>
            <Grid container>
                {user[0]?.account_info?.is_mentor_application_submitted ? (
                    <>
                        <FormMentorApplication defaultValues={user[0]?.mentor_details} questions={questions} />
                        <ProfileMentorDetails />
                        {user[0]?.account_info?.is_mentor_application_submitted && (
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
