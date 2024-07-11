import React, { Suspense, useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, styled, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import EventCard from '../../compoents/EventCard';
import JobCard from '../../compoents/JobCard';
import MentorCard from '../../compoents/MentorCard';
import SlackMessage from '../../compoents/SlackMessage';
import { routes } from '@/lib/routes';
import ErrorBoundary from '@/compoents/ErrorBoundary';
import { useAuth } from '@/providers/AuthProvider';
import { FeatureCard } from '@/compoents/FeatuerCards';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { useApiCancellation } from '@/hooks/useCancelAPI';
import { useApiCall } from '@/hooks/useApiCall';
import BasicCardComonent from '../../compoents/BasicCardComonent/BasicCardComonent';

const StyledContainer = styled(Grid)(({ theme: { breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    [breakpoints.down('md')]: { flexDirection: 'column' },
}));
const StyledCard = styled(Card)(({ theme: { breakpoints, spacing } }) => ({
    minHeight: '450px',
    margin: spacing(2),
    [breakpoints.down('md')]: {
        minHeight: 'inherit',
        minWidth: '100%',
    },
}));

export default function MemberDashboard() {
    const [ event, setEvent ] = useState(null);
    /** @type {any} job */
    const [ job, setJob ] = useState(null);
    const [ mentor, setMentor ] = useState(null);
    const [ announcement, setAnnouncement ] = useState({
        elements: [],
        ts: '',
    });
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useAuth();
    const reviewAccess = user[0]?.account_info?.is_company_review_access_active;
    const isMentorshipProgram = user[0]?.account_info?.is_mentee || user[0]?.account_info?.is_mentor;
    const isNeedsToSubmitMentorshipApplication = !user[0]?.account_info?.is_mentor_application_submitted && isMentorshipProgram;
    const makeApiCall = useApiCall();
    const { navigate } = useApiCancellation();

    useEffect(() => {
        fetch(routes.api.events.list(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEvent(data.events[0]);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });

        fetch(routes.api.jobs.match(), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJob(data.matching_job);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });

        fetch(routes.api.mentors.match(), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMentor(data.matching_mentor);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });

        fetch(routes.api.announcements.list(), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAnnouncement({
                    elements: data.announcement[0].blocks[0].elements[0].elements,
                    ts: data.announcement[0].ts.replace('.', ''),
                });
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);
    return (
        <>
            <Grid container spacing={3}>
                {/* Top three items */}
                {isNeedsToSubmitMentorshipApplication && (
                    <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                        <FeatureCard
                            image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6671cc4505016af9986993cc_Paperwork%20Icon.svg"
                            subTitle="Mentorship Program"
                            linkEndpoint="/mentor/create"
                            btnText="Apply"
                            title="Apply to Today"
                        />
                    </Grid>
                )}
                <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                    <FeatureCard
                        image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608a822eef4f37b6097e8e8_Event%20Icon%20(1).png"
                        subTitle="Join an Event"
                        linkEndpoint="/event/all"
                        btnText="View Events"
                        title="RSVP to Today"
                    />
                </Grid>

                <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                    <FeatureCard
                        image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608bc162a64b123bebe0fdd_Job%20Board%20Icon.png"
                        subTitle="Community Job Board"
                        linkEndpoint="/job/new/referral"
                        btnText="Add Job"
                        title="Add Job Referral"
                    />
                </Grid>

                {reviewAccess && (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Grid item xs={12} sm={4}>
                                <FeatureCard
                                    image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608a8228b913bba42d50c39_Reviews%20Icon.png"
                                    subTitle="TBC: Open Doors"
                                    linkEndpoint="/reviews"
                                    btnText="Add a Review"
                                    title="Company Reviews"
                                />
                            </Grid>
                        </Suspense>
                    </ErrorBoundary>
                )}

                {/* Announcement */}
                <Grid item xs={12} mt={4} mb={4}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: isTablet ? 'column' : 'row',
                            pl: 5,
                            pr: 5,
                            pt: 2,
                        }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: isTablet ? '18%' : '18%',
                                margin: isTablet ? 'auto' : '35px 25px 0px 25px',
                            }}
                            image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608c2d3d10b78c4b310fa34_Group%20234%20(1).png"
                            alt="icon depicts a white megaphone centered within concentric red circles on a red
                            square background, giving a target-like appearance"
                        />
                        <Box
                            sx={{
                                width: isTablet ? '100%' : 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignSelf: 'center',
                            }}>
                            <CardContent sx={{ flex: '1 auto' }}>
                                <Typography component="h1" variant="h4">
                                    Latest Announcement!
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" component="div">
                                    <SlackMessage elements={announcement.elements} />
                                </Typography>
                                <Box sx={{ pl: 0, pt: 1 }}>
                                    <MuiLink target="_blank" variant="h6" underline="none" href={`https://techbychoice.slack.com/archives/CELK4L5FW/p${announcement.ts}`}>
                                        View In Slack
                                    </MuiLink>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>

                {/* Bottom items */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container display="flex" direction="row" justifyContent="space-between">
                            <Typography variant="h6">Top Job</Typography>
                            <Link to="/job/all">
                                <Button variant="text">View More</Button>
                            </Link>
                        </Grid>
                        <Grid container display="flex" direction="row" justifyContent="center">
                            <StyledCard>
                                <CardContent>
                                    {job ? (
                                        <JobCard
                                            match={false}
                                            companyId={job?.parent_company?.id}
                                            companyLogo={job?.parent_company?.logo_url}
                                            companyName={job?.parent_company?.name}
                                            jobType={job?.role?.name}
                                            jobTitle={job?.job_title}
                                            jobId={job?.id}
                                            location={job?.location}
                                            salary={`${job?.max_compensation?.range} - ${job?.max_compensation?.range}`}
                                            description={null}
                                        />
                                    ) : (
                                        <Typography variant="body1">We currently don&apos;t have a match at this time. Please check back later.</Typography>
                                    )}
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container display="flex" direction="row" justifyContent="space-between">
                            <Typography variant="h6">Next Event</Typography>
                            <Link to="/event/all">
                                <Button variant="text">View More</Button>
                            </Link>
                        </Grid>
                        <Grid container display="flex" direction="row" justifyContent="center">
                            <StyledCard>
                                <CardContent>{event ? <EventCard event={event} /> : <p>Loading events...</p>}</CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container display="flex" direction="row" justifyContent="space-between">
                            <Typography variant="h6">Top Mentor</Typography>
                            <Link to="/mentor/all">
                                <Button variant="text">View More Andre</Button>
                            </Link>
                        </Grid>
                        <Grid container display="flex" direction="row" justifyContent="center">
                            <StyledCard>
                                <CardContent>
                                    {mentor ? (
                                        <MentorCard mentor={mentor} />
                                    ) : (
                                        <Typography variant="body1">We currently don&apos;t have a match at this time. Please check back later.</Typography>
                                    )}
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div>
                        <BasicCardComonent
                            imageUrl="path_to_your_image.jpg"
                            headerText="Software Developer"
                            bodyText={job?.role?.name}
                            icon={job?.role?.name}
                            hourlyRate={20} // Example hourly rate
                            buttonText="Click Me"
                            // companyName={job?.parent_company?.name}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
