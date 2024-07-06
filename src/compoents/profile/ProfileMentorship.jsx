import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormMentorApplication from '../mentorship/FormMentorApplication';
import ProfileMentorDetails from './ProfileMentorDetails';
import { useAuth } from '@/providers/AuthProvider';
import ProfileCalLinkForm from './ProfileCalLinkForm';
import Button from '@mui/material/Button';
import { useStatus } from '@/providers/MsgStatusProvider';
import { routes } from '@/lib/routes';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import { FeatureCard } from '@/compoents/FeatuerCards';

const filter = createFilterOptions();

export default function ProfileMentorship({ questions }) {
    const { user } = useAuth();
    let userData = user[0];
    const statusMessage = useStatusMessage();
    const accountInfo = user[0]?.account_info || {};
    const mentorDetails = user[0]?.mentor_details || {};

    const isMentorshipProgram = accountInfo.is_mentee || accountInfo.is_mentor;
    const isNeedsToSubmitMentorshipApplication = !accountInfo.is_mentor_application_submitted && isMentorshipProgram;

    const [ formData, setFormData ] = useState({
        commitment_level: [],
        mentee_support_areas: [],
        mentor_support_areas: [],
    });
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    // Update formData when userData changes
    useEffect(() => {
        // commitment_level: userData.mentor_details.commitment_level || [],
        if (userData?.mentor_data) {
            setFormData(preValue => ({
                ...preValue,
                commitmentQuestions: {
                    commitment_level: userData?.mentor_data?.mentor_profile?.mentor_commitment_level || [],
                    mentee_support_areas: userData?.mentor_data?.mentee_support_areas || [],
                    mentor_support_areas: userData?.mentor_data?.mentor_support_areas || [],
                    commitment_level_id: userData?.mentor_data?.mentor_profile?.mentor_commitment_level.map(item => item.id) || [],
                    mentee_support_areas_id: userData?.mentor_data?.mentee_support_areas?.map(item => item.id) || [],
                    mentor_support_areas_id: userData?.mentor_data?.mentor_support_areas?.map(item => item.id) || [],
                },
            }));
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

    const NonMentorContent = () => (
        <>
            <Typography variant="h6">We&apos;re currently not taking applications for our mentorship program.</Typography>
            <Typography variant="body1">We&apos;re currently at our reviewing capacity. Once we address these we will open the application back up.</Typography>
        </>
    );

    return (
        <>
            <Grid container>
                {isMentorshipProgram ? (
                    <>
                        {!isNeedsToSubmitMentorshipApplication ? (
                            <>
                                <FormMentorApplication defaultValues={mentorDetails} formData={formData} setFormData={setFormData} onFormDataChange={undefined} />
                                <Button variant="contained" color="primary" onClick={handelFormSubmit}>
                                    Save
                                </Button>
                                <ProfileMentorDetails defaultValues={mentorDetails} />
                                {!accountInfo.is_mentor_profile_active || (accountInfo.is_mentor_profile_approved && mentorDetails && <ProfileCalLinkForm />)}
                            </>
                        ) : (
                            <>
                                <h1>Finish your mentorship program application</h1>
                                <Grid item xs={12} sm={6}>
                                    <FeatureCard
                                        image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6671cc4505016af9986993cc_Paperwork%20Icon.svg"
                                        subTitle="Mentorship Program"
                                        linkEndpoint="/mentor/create"
                                        btnText="Apply"
                                        title="Apply to Today"
                                    />
                                </Grid>
                            </>
                        )}
                    </>
                ) : (
                    <NonMentorContent />
                )}
            </Grid>
        </>
    );
}
