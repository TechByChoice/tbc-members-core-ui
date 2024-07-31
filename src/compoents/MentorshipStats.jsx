import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StatCard from '@/compoents/StatsCard';

const MentorshipStats = ({ adminData }) => {
    const stats = adminData?.mentorship;

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Mentorship Statistics
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="New Events" value={stats.newEvents} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="RSVPs" value={stats.rsvps} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Attendees" value={stats.attendees} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MentorshipStats;
