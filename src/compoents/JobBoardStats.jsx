import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StatCard from '@/compoents/StatsCard';

const JobBoardStats = ({ adminData }) => {
    console.log(adminData);
    const stats = adminData?.job_board;

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Job Statistics
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Closed Jobs" value={stats?.closed_jobs} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="New Jobs" value={stats?.new_jobs_last_30_days} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Open Jobs" value={stats?.open_jobs} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobBoardStats;
