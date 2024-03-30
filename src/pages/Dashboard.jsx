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
            <Typography variant="h2">Welcome Back,</Typography>
            <Typography variant="h2">{user[0]?.user_info?.first_name}</Typography>
            <Grid item xs={12}>
                {accountInfo?.is_member && <MemberDashboard />}
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
