import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useAuth } from '../providers/AuthProvider';
import PartnershipDashboard from './dashboards/PartnershipDashboardPage';
import CompanyAccountDashboard from './dashboards/CompanyAccountDashboardPage';
import CommunityRecruiterDashboard from './dashboards/CommunityRecruiterDashboardPage';
import TeamDashboard from './dashboards/TeamDashboardPage';
import MemberDashboard from './dashboards/MemberDashboardPage';
import VolunteerDashboard from './dashboards/VolunteerDashboardPage';
import Typography from '@mui/material/Typography';
import ReviewsDashboard from '@/pages/dashboards/ReviewsDashboardPage';

function MentorDashboard() {
    return null;
}

function Dashboard() {
    const auth = useAuth();
    const { user } = useAuth();
    const accountInfo = auth.accountDetails[0];

    // if (!auth?.isLoading) {
    //     return (
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             Loading ...
    //         </div>
    //     );
    // }

    return (
        <Grid container>
            <Grid item xs={12} pt={5} pb={5}>
                <Typography variant="h2">Welcome, {user[0]?.user_info?.first_name}</Typography>
            </Grid>
            <Grid item xs={12}>
                {accountInfo?.is_member && <MemberDashboard />}
                {accountInfo?.is_open_doors && <ReviewsDashboard />}
                {accountInfo?.is_mentor && <MentorDashboard />}
                {accountInfo?.is_volunteer && <VolunteerDashboard />}
                {accountInfo?.is_team && <TeamDashboard />}
                {accountInfo?.is_community_recruiter && <CommunityRecruiterDashboard />}
                {accountInfo?.is_company_account && <CompanyAccountDashboard />}
                {accountInfo?.is_partnership && <PartnershipDashboard />}
            </Grid>
        </Grid>
    );
}

export default Dashboard;
