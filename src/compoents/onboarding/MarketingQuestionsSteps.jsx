import React from 'react';
import { Typography, Grid, FormControl, FormControlLabel, Checkbox } from '@mui/material';

const MarketingQuestionsStep = ({handleInputChange}) => {
    return (
        <Grid container spacing={3}>
            {/* Communication Settings Title */}
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Communication Settings
                </Typography>
                <Typography component="h2" variant="h6">
                    The following questions will help us understand what email and updates you want from us.
                </Typography>
            </Grid>

            {/* Header */}
            <Grid item xs={12}>
                <Typography component="h3" variant="h6">
                    Please details your would like to receive marketing about
                </Typography>
            </Grid>

            {/* Checkbox for Our Monthly Newsletter */}
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="marketing_monthly_newsletter" />}
                        label="Our Monthly Newsletter"
                    />
                </FormControl>
            </Grid>

            {/* Checkbox for Community Events */}
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="marketing_events" />}
                        label="Community Events"
                    />
                </FormControl>
            </Grid>

            {/* Checkbox for Interest Based Programing */}
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="marketing_identity_based_programing" />}
                        label="Interest Based Programing"
                    />
                </FormControl>
            </Grid>

            {/* Checkbox for Open Jobs & Job Hunting Tips */}
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="marketing_jobs" />}
                        label="Open Jobs & Job Hunting Tips"
                    />
                </FormControl>
            </Grid>

            {/* Checkbox for Community Updates */}
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="marketing_org_updates" />}
                        label="Community Updates"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default MarketingQuestionsStep;
