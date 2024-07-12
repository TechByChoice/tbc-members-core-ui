import React, { useEffect, useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import JobCard from '../compoents/JobCard';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';
import { useAuth } from '@/providers/AuthProvider';
import Box from '@mui/material/Box';
import BasicCardComponent from '@/compoents/BasicCardComonent/BasicCardComponent';

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
    const { isAuthenticated, user } = useAuth();
    const [ isMissingProfile, setIsMissingProfile ] = useState(false);
    const isReviewer = user && user[0]?.account_info?.is_open_doors;
    const itemsPerPage = 100;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        let jobsUrl = null;
        if (nextUrl) {
            jobsUrl = nextUrl;
        } else {
            jobsUrl = `${routes.api.jobs.list()}?page=${currentPage}&limit=10`;
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
                    return response.json().then(err => Promise.reject(err));
                }
                return response.json();
            })
            .then(data => {
                if (data.status === false && data.error === true) {
                    setIsMissingProfile(true);
                } else {
                    setJobs(data.all_jobs);
                    setTotalItems(data.all_jobs.count);
                    setNextUrl(data.all_jobs.next);
                    setUserPostedJobs(data.posted_jobs);
                }
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
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
            {userPostedJobs?.count > 0 ? (
                <CalloutCard>
                    <Typography variant="h5" mb={1}>
                        Jobs You Posted
                    </Typography>
                    <Grid container spacing={4}>
                        {userPostedJobs?.results &&
                            userPostedJobs?.results.map((job, index) => (
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
                            ))}
                    </Grid>
                </CalloutCard>
            ) : (
                <>
                    {isAuthenticated && !isReviewer && (
                        <CalloutCard>
                            <Typography component="h5" variant="h5">
                                Would you like to post a job?
                            </Typography>
                            <Link to="/job/new/referral">
                                <Button variant="contained">Add Job</Button>
                            </Link>
                        </CalloutCard>
                    )}
                </>
            )}

            <Grid container spacing={4}>
                {jobs?.length > 0 &&
                    jobs.map((job, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <BasicCardComponent
                                imageUrl={job?.parent_company?.logo_url}
                                headerText="Software Developer"
                                bodyText={job?.role?.name}
                                hourlyRate={20}
                                buttonText="View Job"
                                job={job}
                            />
                        </Grid>
                    ))}
            </Grid>
            {jobs?.length > 0 ? (
                <>
                    <Button onClick={handlePrevious} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </>
            ) : (
                <>
                    <Grid justifyContent="center" display="flex">
                        <Box display="flex" flexDirection="column" mt={4} gap={3} borderRadius={2} border="1px solid" borderColor="grey.300" maxWidth={500}>
                            <Box>
                                <Typography variant="h6" px={2} pt={2} textAlign="center">
                                    {isMissingProfile ? (
                                        <b>You have not added your skills to your profile so we can&apos;t you to any jobs</b>
                                    ) : (
                                        <b>Our job board is percolating. Please come back later.</b>
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </>
            )}
        </JobWrapper>
    );
}
