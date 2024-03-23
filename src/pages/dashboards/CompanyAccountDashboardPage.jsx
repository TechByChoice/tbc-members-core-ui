import { Card, CardContent, Container, Box, Typography, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function CompanyAccountDashboard() {
    const { user, isLoading } = useAuth();
    const company = user[0]?.company_account_data;
    const jobs = company.talent_jobs;
    const talentMatch = company.talent_match;
    const account = company.company_account;

    return (
        <>
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {company?.company_profile?.company_name}
                    </Typography>
                    <Button>Add Job</Button>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Job Openings
                                    </Typography>
                                    {jobs?.length > 0 ? (
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {jobs?.map((job, index) => (
                                                <ListItem
                                                    key={index}
                                                    secondaryAction={
                                                        <Link to={`/talent-choice/job/${job.id}`}>
                                                            <IconButton edge="start" aria-label="open">
                                                                <LaunchIcon />
                                                            </IconButton>
                                                        </Link>
                                                    }>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <ImageIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={job.job_title} secondary={`Status: ${job.status}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <>
                                            <Link to="/job/new">
                                                <Button type="button">Add a Job</Button>
                                            </Link>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Top Talent Jobs
                                    </Typography>
                                    {jobs?.length > 0 ? (
                                        <>
                                            {talentMatch?.map((job, index) => (
                                                <Typography key={index}>{job}</Typography>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <p>Post a job to get a list of talent for your open roles.</p>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
