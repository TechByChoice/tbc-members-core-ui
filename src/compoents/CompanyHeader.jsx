import React from 'react';
import { Box, Card, CardContent, Divider, Grid, IconButton, Link, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GitHub, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import HtmlContentRenderer from './utils/HtmlContentRenderer';
import BasicCardComponent from '@/compoents/BasicCardComonent/BasicCardComponent';
import ErrorBoundary from './ErrorBoundary';

const CompanyHeader = ({
    companyProfile, companyScore, companyJobs, isLoading, error 
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (error) {
        return <Typography color="error">Error loading company data: {error.message}</Typography>;
    }

    return (
        <ErrorBoundary fallback={<Typography color="error">Something went wrong.</Typography>}>
            <Paper sx={{ padding: 2 }} elevation={4}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs={12} sm="auto">
                        {isLoading ? (
                            <Skeleton variant="rectangular" width={100} height={100} />
                        ) : (
                            <img alt={companyProfile?.company_name || 'Company logo'} src={companyProfile?.logo_url} style={{ maxWidth: 100, maxHeight: 100 }} />
                        )}
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        {isLoading ? (
                            <Skeleton width={200} height={40} />
                        ) : companyScore?.average_rating > 0 ? (
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                TBC Approval Score: {companyScore.average_rating.toFixed(1)} / 5
                            </Typography>
                        ) : (
                            <Box>
                                <Typography variant="body1">We don&apos;t have enough reviews to populate a rating</Typography>
                                <Link href="/reviews" aria-label={`Leave a review for ${companyProfile?.company_name}`}>
                                    Leave a review for {companyProfile?.company_name}
                                </Link>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            <Grid container justifyContent="flex-start" spacing={2}>
                <Grid item xs={12} sx={{ padding: 2 }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'inherit', fontSize: isMobile ? '2rem' : '3rem' }}>
                        {isLoading ? <Skeleton width="60%" /> : companyProfile?.company_name}
                    </Typography>

                    <Box my={2}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                            About the company
                        </Typography>
                        {isLoading ? <Skeleton variant="text" height={100} /> : <Typography>{companyProfile?.mission}</Typography>}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {companyScore?.average_rating >= 0 && (
                        <>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'inherit',
                                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                                }}>
                                Review
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h4" color="text.secondary" gutterBottom>
                                                TL;DR
                                            </Typography>
                                            {isLoading ? <Skeleton variant="text" height={80} /> : <HtmlContentRenderer htmlContent={companyScore?.short_summary_text} />}
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h4" color="text.secondary" gutterBottom>
                                                Who&apos;s leaving reviews
                                            </Typography>
                                            {isLoading ? <Skeleton variant="text" height={80} /> : <Typography>{companyScore?.demographics_summary}</Typography>}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'inherit',
                                        fontSize: isMobile ? '1.5rem' : '2.5rem',
                                    }}>
                                    Full Summary
                                </Typography>
                                {isLoading ? <Skeleton variant="text" height={200} /> : <HtmlContentRenderer htmlContent={companyScore?.full_summary_text} />}
                            </Box>
                        </>
                    )}

                    <Box mt={3}>
                        <Grid container spacing={1}>
                            {[
                                'linkedin',
                                'instagram',
                                'github',
                                'twitter',
                                'youtube',
                                'personal'
                            ].map(
                                platform =>
                                    companyProfile?.[platform] && (
                                        <Grid item key={platform}>
                                            <IconButton
                                                href={companyProfile[platform]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${companyProfile.company_name} on ${platform}`}>
                                                {platform === 'linkedin' && <LinkedIn />}
                                                {platform === 'instagram' && <Instagram />}
                                                {platform === 'github' && <GitHub />}
                                                {platform === 'twitter' && <Twitter />}
                                                {platform === 'youtube' && <YouTube />}
                                                {platform === 'personal' && <Language />}
                                            </IconButton>
                                        </Grid>
                                    ),
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            {companyJobs?.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h3" sx={{ fontSize: isMobile ? '1.5rem' : '2.5rem' }}>
                        Open Jobs
                    </Typography>
                    <Grid container spacing={2}>
                        {companyJobs.map((job, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <BasicCardComponent
                                    imageUrl={companyProfile?.logo_url}
                                    headerText={job?.role?.name}
                                    bodyText={job?.role?.name}
                                    hourlyRate={20}
                                    buttonText="View Job"
                                    job={job}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </ErrorBoundary>
    );
};

export default CompanyHeader;
