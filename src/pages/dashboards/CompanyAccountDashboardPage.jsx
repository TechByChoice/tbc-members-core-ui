import { Card, CardContent, Container, Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';

export default function CompanyAccountDashboard() {
    const { user, isLoading } = useAuth();
    console.log(user);
    const postedJobs = [
        'Software Engineer',
        'Data Scientist',
        'Product Manager',
        'UX Designer'
    ];
    const topTalents = [
        'Senior Software Engineer - Jane Doe',
        'Lead Data Scientist - John Smith',
        'Product Manager Specialist - Emily White',
        'Senior UX Designer - Michael Brown',
    ];
    return (
        <>
            <div>Own Jobs</div>
            <div>Talent</div>
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Tech Innovations Inc.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Posted Jobs
                                    </Typography>
                                    {postedJobs.map((job, index) => (
                                        <Typography key={index}>{job}</Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Top Talent Jobs
                                    </Typography>
                                    {topTalents.map((talent, index) => (
                                        <Typography key={index}>{talent}</Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
