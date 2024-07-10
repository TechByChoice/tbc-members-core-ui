import React, { Suspense } from 'react';
import { Box, Grid, IconButton, Link, Paper, Typography } from '@mui/material';
import { GitHub, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import JobCard from '@/compoents/JobCard';
import HtmlContentRenderer from './utils/HtmlContentRenderer';
import ErrorBoundary from '@/compoents/ErrorBoundary';

const ButtonAddReview = React.lazy(() => import('open_doors/ButtonAddReview'));

const CompanyHeader = ({ companyProfile, companyScore, companyJobs }) => {
    console.log(companyProfile);
    return (
        <>
            <Paper sx={{ padding: 2 }} elevation={4}>
                <Grid container alignItems="end" justifyContent="space-between">
                    <Grid item>
                        <img alt={companyProfile?.company_name} src={companyProfile?.logo_url} style={{ maxWidth: 100, maxHeight: 100, padding: 20 }} />
                    </Grid>
                    {companyScore?.average_rating ? (
                        <Grid item>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                TBC Approval Score: {companyScore?.average_rating} / 5
                            </Typography>
                        </Grid>
                    ) : (
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Grid item sx={{ textAlign: 'right' }}>
                                    <Typography variant="body1">Be the first to review {companyProfile?.company_name}</Typography>
                                    <ButtonAddReview />
                                </Grid>
                            </Suspense>
                        </ErrorBoundary>
                    )}
                </Grid>
            </Paper>
            <Grid container justifyContent="flex-start">
                <Grid item xs sx={{ padding: 2 }}>
                    <Box>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                            {companyProfile?.company_name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                            About the company
                        </Typography>
                        {companyProfile?.mission}
                    </Box>
                    {companyScore?.average_rating && (
                        <>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                    Who&apos;s leaving reviews
                                </Typography>
                                {companyScore?.demographics_summary}
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                    TL;DR
                                </Typography>
                                {/*<Typography variant="body2">*/}
                                <HtmlContentRenderer htmlContent={companyScore?.short_summary_text} />
                                {/*</Typography>*/}
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                    Full Summary
                                </Typography>
                                {/*<Typography variant="body2">*/}
                                <HtmlContentRenderer htmlContent={companyScore?.full_summary_text} />
                                {/*</Typography>*/}
                            </Box>
                        </>
                    )}
                    <Box>
                        <Grid container justifyContent="flex-start" sx={{ gap: '2%' }}>
                            {companyProfile?.linkedin && (
                                <Link href={companyProfile?.linkedin} underline="hover">
                                    <IconButton href={companyProfile?.linkedin} target="_blank">
                                        <LinkedIn />
                                    </IconButton>
                                </Link>
                            )}

                            {companyProfile?.instagram && (
                                <Link href={companyProfile?.instagram} underline="hover">
                                    <IconButton href={companyProfile?.instagram} target="_blank">
                                        <Instagram />
                                    </IconButton>
                                </Link>
                            )}

                            {companyProfile?.github && (
                                <Link href={companyProfile?.github} underline="hover">
                                    <IconButton href={companyProfile?.github} target="_blank">
                                        <GitHub />
                                    </IconButton>
                                </Link>
                            )}

                            {companyProfile?.twitter && (
                                <Link href={companyProfile?.twitter} underline="hover">
                                    <IconButton href={companyProfile?.twitter} target="_blank">
                                        <Twitter />
                                    </IconButton>
                                </Link>
                            )}

                            {companyProfile?.youtube && (
                                <Link href={companyProfile?.youtube} underline="hover">
                                    <IconButton href={companyProfile?.youtube} target="_blank">
                                        <YouTube />
                                    </IconButton>
                                </Link>
                            )}

                            {companyProfile?.personal && (
                                <Link href={companyProfile?.personal} underline="hover">
                                    <IconButton href={companyProfile?.personal} target="_blank">
                                        <Language />
                                    </IconButton>
                                </Link>
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {companyJobs?.length > 0 && (
                <Grid container justifyContent="flex-start">
                    <Typography variant="h3">Open Jobs</Typography>
                    <Grid container justifyContent="flex-start">
                        {companyJobs.map((job, index) => (
                            <Grid item key={index}>
                                <JobCard
                                    match={false}
                                    companyId={companyProfile?.id}
                                    companyLogo={companyProfile?.logo_url}
                                    companyName={companyProfile?.company_name}
                                    jobType={job?.role?.name}
                                    jobTitle={job?.job_title}
                                    jobId={job?.id}
                                    location={job?.location}
                                    salary={`${job?.max_compensation?.range} - ${job?.max_compensation?.range}`}
                                    description={null}></JobCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default CompanyHeader;
