import React, { Suspense, useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid } from '@mui/material';
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

export default function MemberDashboard() {
    const [ event, setEvent ] = useState();
    /** @type {any} job */
    const [ job, setJob ] = useState();
    const [ mentor, setMentor ] = useState();
    const [ announcement, setAnnouncement ] = useState({
        elements: [],
        ts: '',
    });
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
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                View Events
                            </Typography>
                            <Grid container display="flex" alignItems="center" justifyContent="center">
                                <Link to="/event/all">
                                    <Button variant="outlined">View Events</Button>
                                </Link>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={reviewAccess ? 4 : 6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                Referral a Job
                            </Typography>
                            <Grid container display="flex" alignItems="center" justifyContent="center">
                                <Link to="/job/new/referral">
                                    <Button variant="outlined">Add Job</Button>
                                </Link>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {reviewAccess && (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            Review a Company
                                        </Typography>
                                        <Grid container display="flex" alignItems="center" justifyContent="center">
                                            <Link to="/reviews">
                                                <Button variant="outlined">Add a Review</Button>
                                            </Link>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Suspense>
                    </ErrorBoundary>
                )}

                {/* Announcement */}
                <Grid item xs={12}>
                    {/*<Grid item xs={12} style={{ border: '2px solid #004085', borderRadius: '4px', padding: '10px', margin: '10px 0' }}>*/}
                    <Grid container alignItems="center" justifyContent="space-between" style={{ padding: '10px 0' }}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                }}>
                                {/* Megaphone icon here, replace with actual image/icon */}
                                <span role="img" aria-label="megaphone">
                                    📣
                                </span>
                            </div>
                        </Grid>
                        {announcement && (
                            <Grid item style={{ maxWidth: '75%', margin: '10px 0' }}>
                                <Typography variant="h5">Latest&apos;s Announcement!</Typography>
                                <SlackMessage elements={announcement.elements} />
                                <MuiLink target="_blank" href={`https://techbychoice.slack.com/archives/CELK4L5FW/p${announcement.ts}`}>
                                    View In Slack
                                </MuiLink>
                            </Grid>
                        )}
                        <Grid item></Grid>
                    </Grid>
                </Grid>

                {/* Bottom items */}
                <Grid item xs={12} sm={4}>
                    <Grid container display="flex" direction="row" justifyContent="space-between">
                        <Typography variant="h6">Top Job</Typography>
                        <Link to="/job/all">
                            <Button variant="text">View More</Button>
                        </Link>
                    </Grid>
                    <Card>
                        <CardContent>
                            {job ? (
                                <JobCard
                                    match={false}
                                    companyId={job?.parent_company?.id}
                                    companyLogo={job?.parent_company?.logo}
                                    companyName={job?.parent_company?.name}
                                    jobType={job?.role?.name}
                                    jobTitle={job?.job_title}
                                    jobId={job?.id}
                                    location={job?.location}
                                    salary={`${job?.max_compensation?.range} - ${job?.max_compensation?.range}`}
                                    description={null}
                                />
                            ) : (
                                <p>Loading events...</p>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Grid container display="flex" direction="row" justifyContent="space-between">
                        <Typography variant="h6">Next Event</Typography>
                        <Link to="/event/all">
                            <Button variant="text">View More</Button>
                        </Link>
                    </Grid>
                    <Card>
                        <CardContent>{event ? <EventCard event={event} /> : <p>Loading events...</p>}</CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card>
                        <Grid container display="flex" direction="row" justifyContent="space-between">
                            <Typography variant="h6">Top Mentor</Typography>
                            <Link to="/mentor/all">
                                <Button variant="text">View More</Button>
                            </Link>
                        </Grid>
                        <CardContent>{mentor ? <MentorCard mentor={mentor} /> : <p>Loading mentor...</p>}</CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
