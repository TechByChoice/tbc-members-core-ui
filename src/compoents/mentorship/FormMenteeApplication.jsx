import {Autocomplete,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    OutlinedInput,
    TextField,
    Typography,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FormMenteeApplication({
    handleChange, questions, formErrors, formData 
}) {
    function handleSave() {
        console.log('saved');
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Mentee Application</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update how and when we reach out to you</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        {/* Checkbox for Community Updates */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormControlLabel control={<Checkbox onChange={handleChange} name="marketing_org_updates" />} label="Community Updates" />
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
