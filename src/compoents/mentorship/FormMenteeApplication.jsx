import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import TipTapEditor from '@/compoents/TipTapEditor';

const filter = createFilterOptions();

export default function FormMenteeApplication({
    questions, formErrors, formData, setFormData, defaultData 
}) {
    const handleQuillChange = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
        setFormData(newFormData);
    };
    function handleSave() {
        console.log('saved');
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Your Mentee Profile</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body1">The following questions will be displayed on your mentee profile.</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        {/* Checkbox for Community Updates */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="mentorship_goals">What goals do you have as a mentor and how do you see yourself making a positive impact?</FormLabel>
                                <TipTapEditor error={false} value={defaultData?.mentorship_goals} id="mentorship_goals" onFormDataChange={handleQuillChange} />
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
    );
}
