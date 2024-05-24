import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import React from 'react';

import TipTapEditor from '../TipTapEditor';
import { useAuth } from '@/providers/AuthProvider';

export default function FormMentorProfile({
    questions, formErrors, formData, setFormData, defaultData 
}) {
    const { user } = useAuth();
    const handleQuillChange = (editorId, content) => {
        const updatedProfile = { ...formData.profile, [editorId]: content };
        const newFormData = { ...formData, profile: updatedProfile };

        setFormData(newFormData);
    };

    const isMentor = user[0]?.account_info?.is_mentor;
    const isMentee = user[0]?.account_info?.is_mentee;

    return (
        <>
            <Grid container>
                {isMentor && (
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h6">Your Mentor Profile</Typography>
                            <hr />
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={10} sm={10}>
                                    <Typography variant="body">The following questions will be displayed on your mentor profile.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentorship_goals">
                                            What goals do you have as a mentor and how do you see yourself making a positive impact?
                                        </FormLabel>
                                        <TipTapEditor value={defaultData?.mentorship_goals} id="mentorship_goals" onFormDataChange={handleQuillChange} />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentor_how_to_help">
                                            In what ways would you like to contribute and support your mentee&apos;s growth and development?
                                        </FormLabel>
                                        <TipTapEditor value={defaultData?.mentor_how_to_help} id="mentor_how_to_help" onFormDataChange={handleQuillChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
                {isMentee && (
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h6">Your Mentee Profile</Typography>
                            <hr />
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={10} sm={10}>
                                    <Typography variant="body1">
                                        The following questions will be displayed on your mentee profile that will only be viewable to active mentors on our platform.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentorship_goals">What are some of your long-term career goals?</FormLabel>
                                        <TipTapEditor value={defaultData?.long_term_career_goals} id="long_term_career_goals" onFormDataChange={handleQuillChange} />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentor_how_to_help">What keeps you motivated at work?</FormLabel>
                                        <TipTapEditor value={defaultData?.what_motivated_at_work} id="what_motivated_at_work" onFormDataChange={handleQuillChange} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
}
