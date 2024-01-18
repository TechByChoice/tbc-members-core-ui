import React, { Component, useEffect, useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import JobCard from '../compoents/JobCard';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const CalloutCard = styled.section`
    border: 1px solid darkgray;
    background-color: lightgrey;
    padding: 20px;
    border-radius: 8px;
`;

const JobWrapper = styled.section`
    min-height: 80vh;
`;

export default function AllJobsPage({}) {
    const [ jobs, setJobs ] = useState([]);
    const [ userPostedJobs, setUserPostedJobs ] = useState([]);

    useEffect(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'company/new/jobs/all-jobs/';

        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJobs(data.all_jobs);
                setUserPostedJobs(data.posted_job);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    function pullJobs() {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'company/pull/remote/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    return (
        <JobWrapper>
            {userPostedJobs.length > 0 ? (
                <CalloutCard>
                    <Typography variant="h5" mb={1}>
                        Jobs You Posted
                    </Typography>
                    <Grid container spacing={4}>
                        {userPostedJobs ? (
                            userPostedJobs.map((job, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
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
                                    />
                                </Grid>
                            ))
                        ) : (
                            <p>Loading events...</p> // Or any other loading indicator
                        )}
                    </Grid>
                </CalloutCard>
            ) : (
                <CalloutCard>
                    <Typography component="h5" variant="h5">
                        Would you like to post a job?
                    </Typography>
                    <Link to="/job/new/referral">
                        <Button variant="contained">Add Job</Button>
                    </Link>
                </CalloutCard>
            )}

            <Grid container spacing={4}>
                {jobs ? (
                    jobs.map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <JobCard
                                companyLogo={job?.parent_company?.logo}
                                companyName={job?.parent_company?.name}
                                jobType={job?.role?.name}
                                jobTitle={job?.job_title}
                                jobId={job?.id}
                                location={job?.location}
                                salary={`${job?.max_compensation?.range} - ${job?.max_compensation?.range}`}
                                description={null}
                                match={false}
                            />
                        </Grid>
                    ))
                ) : (
                    <p>Loading events...</p> // Or any other loading indicator
                )}
            </Grid>
        </JobWrapper>
    );
}
