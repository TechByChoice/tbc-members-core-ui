import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import StatCard from '@/compoents/StatsCard';
import GenericPieChart from '@/compoents/GenericPieChart';
import GenericBarChart from '@/compoents/GenericBarChart';

const MembershipStats = ({ adminData }) => {
    const data = adminData?.membership;
    const communityData = adminData?.community_needs;
    const skillData = adminData?.skill_chart_data;
    const roleData = adminData?.roles_chart_data;
    const departmentsData = adminData?.departments_chart_data;

    const completedOnboarding = parseInt(data?.completed_onboarding, 10);
    const totalAvailableMembers = parseInt(data?.total_active_members, 10);
    const rawValue = (completedOnboarding / totalAvailableMembers) * 100;
    const percentage = rawValue.toFixed(0);

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Membership Stats
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Totla Members" value={data?.total_active_members} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Completed Onboard" value={`${percentage}%`} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Active Members" value={data?.total_active_members} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GenericBarChart title="Community Needs" dataPoints={communityData} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GenericBarChart width={400} height={400} title="Top Skills" dataPoints={skillData} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GenericBarChart title="Top Roles" dataPoints={roleData} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GenericBarChart title="Top Departments" dataPoints={departmentsData} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MembershipStats;
