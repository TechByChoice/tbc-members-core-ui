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

export default function ReviewsDashboard() {
    const [ event, setEvent ] = useState();
    /** @type {any} job */
    const [ job, setJob ] = useState();
    const [ mentor, setMentor ] = useState();
    const [ announcement, setAnnouncement ] = useState({
        elements: [],
        ts: '',
    });
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useAuth();
    const reviewAccess = user[0]?.account_info?.is_company_review_access_active;

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
                setJob(data.matching_jobs[0]);
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
                setMentor(data.matching_mentors[0]);
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
                <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                    <FeatureCard
                        image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608a822eef4f37b6097e8e8_Event%20Icon%20(1).png"
                        subTitle="View Companies"
                        linkEndpoint="/company/all"
                        btnText="View Companies"
                        title="View Companies"
                    />
                </Grid>

                <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                    <FeatureCard
                        image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608bc162a64b123bebe0fdd_Job%20Board%20Icon.png"
                        subTitle="Community Job Board"
                        linkEndpoint="/job/all"
                        btnText="View Jobs"
                        title="Find a Job"
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
            </Grid>
        </>
    );
}
