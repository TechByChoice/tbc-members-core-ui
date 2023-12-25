import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import EventCard from "../../compoents/EventCard";
import JobCard from "../../compoents/JobCard";
import MentorCard from "../../compoents/MentorCard";

export default function MemberDashboard() {
    const [event, setEvent] = useState()
    const [job, setJob] = useState()
    const [mentor, setMentor] = useState()
    useEffect(() => {
        const url = process.env.REACT_APP_API_BASE_URL + 'event/';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setEvent(data.events[0]);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });

        // const job_match_url = process.env.REACT_APP_API_BASE_URL + 'company/job/matches';
        const job_match_url = process.env.REACT_APP_API_BASE_URL + 'company/new/jobs/job-match/';

        fetch(job_match_url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setJob(data.matching_jobs[0]);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });

        const mentor_match_url = process.env.REACT_APP_API_BASE_URL + 'mentorship/mentor-match/';

        fetch(mentor_match_url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setMentor(data.matching_mentors[0]);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);
    return (
        <>
            <Grid container spacing={3}>
                {/* Top three items */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">View Events</Typography>
                            <Grid container display="flex" alignItems="center" justifyContent="center">
                                <Link to="/event/all">
                                    <Button variant="outlined">View Events</Button>
                                </Link>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">Referral a Job</Typography>
                            <Grid container display="flex" alignItems="center" justifyContent="center">
                                <Link to="/job/new/referral">
                                    <Button variant="outlined">Add Job</Button>
                                </Link>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Announcement */}
                <Grid item xs={12}>
                    <Grid container display="flex" direction="row" justifyContent="space-around">
                        <Grid item>
                            <Typography variant="h5">
                                <span role="img" aria-label="megaphone">📣</span>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Latest's Announcement!
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas rhoncus
                                tristique.
                                Quisque leo velit, finibus et diam sit ...
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined">View In Slack</Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Bottom items */}
                <Grid item xs={12} sm={4}>
                    <Grid container display="flex" direction="row" justifyContent="space-between">
                        <Typography variant="h6">Top Job</Typography>
                        <Link to='/job/all'>
                            <Button variant="text">View More</Button>
                        </Link>
                    </Grid>
                    <Card>
                        <CardContent>
                            {job ? (
                                <JobCard
                                    match={false}
                                    companyLogo={job?.parent_company?.logo}
                                    companyName={job?.parent_company?.name}
                                    jobType={job?.role?.name}
                                    jobTitle={job?.job_title}
                                    jobId={job?.id}
                                    location={job?.location}
                                    salary={`${job?.max_compensation?.range} - ${job?.max_compensation?.range}`}
                                    description={null}
                                    applyLink={job?.url}
                                    viewNow={job?.id}/>
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
                        <CardContent>
                            {event ? (
                                <EventCard event={event}/>
                            ) : (
                                <p>Loading events...</p>
                            )}
                        </CardContent>
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
                        <CardContent>
                            {mentor ? (
                                <MentorCard mentor={mentor}/>
                            ) : (
                                <p>Loading mentor...</p>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
