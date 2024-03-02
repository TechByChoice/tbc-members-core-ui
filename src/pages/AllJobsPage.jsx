import React, { Component, useEffect, useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import JobCard from '../compoents/JobCard';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';

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
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ nextUrl, setNextUrl ] = useState();
    const itemsPerPage = 100;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        let jobsUrl = null;
        if (nextUrl) {
            jobsUrl = nextUrl;
        } else {
            jobsUrl = `${routes.api.jobs.list()}?page=${currentPage}&limit=100`;
        }
        fetch(jobsUrl, {
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
                setJobs(data.all_jobs.results);
                setTotalItems(data.all_jobs.count);
                setNextUrl(data.all_jobs.next);
                setUserPostedJobs(data.posted_job);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [ currentPage, itemsPerPage ]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <JobWrapper>
            {userPostedJobs?.length > 0 ? (
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
                                companyId={job?.parent_company?.id}
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
                    <p>Loading events...</p>
                )}
            </Grid>
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </Button>
            <Button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </Button>
        </JobWrapper>
    );
}
