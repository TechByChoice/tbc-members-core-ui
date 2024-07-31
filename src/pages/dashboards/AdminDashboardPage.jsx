import React, { Suspense, useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import ErrorBoundary from '@/compoents/ErrorBoundary';
import { routes } from '@/lib/routes';

// const EventStats = React.lazy(() => import('@/compoents/EventStats'));
// const SlackStats = React.lazy(() => import('@/compoents/SlackStats'));
const JobBoardStats = React.lazy(() => import('@/compoents/JobBoardStats'));
// const MentorshipStats = React.lazy(() => import('@/compoents/MentorshipStats'));
// const CompanyReviewStats = React.lazy(() => import('@/compoents/CompanyReviewStats'));
const MembershipStats = React.lazy(() => import('@/compoents/MembershipStats'));

const AdminDashboard = () => {
    const [ adminData, setAdminData ] = useState(null);

    useEffect(() => {
        fetch(routes.api.admin.stats(), {
            method: 'GET',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    setAdminData(data.data);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                {[ MembershipStats, JobBoardStats ].map((StatComponent, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <ErrorBoundary>
                            <Suspense fallback={<CircularProgress />}>
                                <StatComponent adminData={adminData} />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
