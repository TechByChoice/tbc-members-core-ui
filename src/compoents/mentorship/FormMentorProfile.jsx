import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import React from 'react';

import TipTapEditor from '../TipTapEditor';

export default function FormMentorProfile({
    questions, formErrors, formData, setFormData 
}) {
    const handleQuillChange = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
        setFormData(newFormData);
    };
    return (
        <>
            <Grid container>
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
                                <TipTapEditor id="mentorship_goals" onFormDataChange={handleQuillChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="mentor_how_to_help">
                                    In what ways would you like to contribute and support your mentee&apos;s growth and development?
                                </FormLabel>
                                <TipTapEditor id="mentor_how_to_help" onFormDataChange={handleQuillChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
