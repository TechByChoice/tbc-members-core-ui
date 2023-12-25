import React, {useEffect, useState} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Hidden,
    IconButton,
    CircularProgress,
    Chip,
    CardMedia,
    Divider, DialogActions, DialogContent, DialogTitle, Dialog, useTheme, useMediaQuery, ButtonGroup
} from '@mui/material';
import {LinkedIn, Instagram, GitHub, Twitter, YouTube, Web, Language} from '@mui/icons-material';
import {useParams} from "react-router";
import {getBasicSystemInfo, getCompanyList, getJobDetails, getMemberData} from "../api-calls";
import Container from "@mui/material/Container";
import CompanyCard from "../compoents/CompanyCard";
import {Global} from "@emotion/react";
import {Link} from "react-router-dom";
import {useStatus} from "../providers/MsgStatusProvider";

const HtmlContentRenderer = ({htmlContent}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE'); // Using German locale ('de-DE') to get the date in 'dd.mm.yyyy' format
};

function ViewJobPage({userDetail, isLoading}) {
    const {id} = useParams();
    const [jobData, setJobData] = useState()
    const {setStatusMessage, setIsAlertOpen, setStatusType} = useStatus();
    const isOwnProfile = userDetail?.user_info.id === jobData?.created_by_id;


    useEffect(() => {
        async function fetchData() {
            try {
                const [jobResponse] = await Promise.all([
                    getJobDetails(id)
                ]);

                setJobData(jobResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);


    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{minHeight: '100vh'}}>
                <CircularProgress/>
            </Grid>
        );
    }

    const handelPublishJob = () => {
        if (isOwnProfile) {
            const url = `${process.env.REACT_APP_API_BASE_URL}company/new/jobs/${id}/referral/publish/`;
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            setStatusMessage("Sorry it looks like we can't publish your job");
                            setIsAlertOpen(true);
                            setStatusType('error');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setStatusMessage("We're reviewing your job now");
                    setIsAlertOpen(true);
                    setStatusType('success');
                })
                .catch(error => {
                    console.error('There was an error publish the job', error);
                });
        } else {

        }
    }
    const handelPauseJob = () => {
        if (isOwnProfile) {
            const url = `${process.env.REACT_APP_API_BASE_URL}company/new/jobs/${id}/referral/pause/`;
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            setStatusMessage("Sorry it looks like we can't pause your job");
                            setIsAlertOpen(true);
                            setStatusType('error');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setStatusMessage("We've paused your job");
                    setIsAlertOpen(true);
                    setStatusType('success');
                })
                .catch(error => {
                    console.error('There was an error publish the job', error);
                });
        } else {

        }
    }
    const handelCloseJob = () => {
        if (isOwnProfile) {
            const url = `${process.env.REACT_APP_API_BASE_URL}company/new/jobs/${id}/referral/closed/`;
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            console.log(errorData);
                            setStatusMessage("Sorry it looks like we can't close your job");
                            setIsAlertOpen(true);
                            setStatusType('error');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setStatusMessage("We've closed your job now");
                    setIsAlertOpen(true);
                    setStatusType('success');
                })
                .catch(error => {
                    console.error('There was an error publish the job', error);
                });
        } else {

        }
    }
    const handelActiveJob = () => {
        if (userDetail?.account_info?.is_staff) {
            const url = `${process.env.REACT_APP_API_BASE_URL}company/new/jobs/${id}/referral/active/`;
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            console.log(errorData);
                            setStatusMessage("Sorry it looks like we can't publish your job");
                            setIsAlertOpen(true);
                            setStatusType('error');
                        });
                    }
                    return response.json();
                })
                .then(data => {

                    setStatusMessage("Job is now active");
                    setIsAlertOpen(true);
                    setStatusType('success');
                })
                .catch(error => {
                    console.error('There was an error publish the job', error);
                });
        }
    }


    const renderPublishCard = () => (
        <CardContent>
            <Typography variant="h6">Ready to publish this job?</Typography>
            <Button variant="contained" onClick={handelPublishJob} color="primary">Publish Now</Button>
            <Button variant="contained" onClick={handelCloseJob} color="primary">Close Job</Button>
        </CardContent>
    );
    const renderCloseCard = () => (
        <CardContent>
            <Typography variant="h6">Thanks for Thinking of the community!</Typography>
        </CardContent>
    );

    const renderAdminPendingCard = () => (
        <CardContent>
            <Typography variant="h6">Admin! Do your thing!</Typography>
            <Typography variant="body1">Once you review the job, we can update this.</Typography>
            <Button variant="contained" onClick={handelActiveJob} color="primary">Mark as Active</Button>
        </CardContent>
    );

    const renderPendingCard = () => (
        <CardContent>
            <Typography variant="h6">We're reviewing your job post</Typography>
            <Typography variant="body1">You'll receive an email once the job is live.</Typography>
        </CardContent>
    );

    const renderActiveCard = () => (
        <CardContent>
            <Typography variant="h6">Your job is now live!</Typography>
            <Typography variant="body1">
                This post will be on our site for 3 months unless
                you close the opening first
            </Typography>
            <ButtonGroup
                orientation="horizontal"
                aria-label="horizontal outlined button group"
            >
                {jobData?.status === 'pause' ? (
                    <Button onClick={handelPublishJob}>Publish Job</Button>
                ) : (
                    <Button onClick={handelPauseJob}>Pause Job</Button>
                )}

                <Button onClick={handelCloseJob}>Close Job</Button>
            </ButtonGroup>
        </CardContent>
    );

    const renderJobStatusSpecificCard = () => {
        const isStaff = userDetail?.account_info?.is_staff;
        const jobStatus = jobData?.status;

        if (jobStatus === 'pending') {
            return isStaff ? renderAdminPendingCard() : renderPendingCard();
        }

        switch (jobStatus) {
            case 'closed':
                return renderCloseCard();
            case 'draft':
            case 'pause':
                return renderPublishCard();
            case 'active':
                return renderActiveCard();
            default:
                return null;
        }
    };
    const renderJobPosterCard = () => (
        <Card>
            <CardContent>
                {renderJobStatusSpecificCard()}
            </CardContent>
        </Card>
    );

    const renderApplyNowCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Ready to apply?
                </Typography>
                <Typography variant="body1">
                    Apply to the job today and don't for get to mention the Tech by Choice community!
                </Typography>
                <Button variant="contained" href={jobData?.url} color="primary">Apply Now</Button>
            </CardContent>
        </Card>
    );

    const renderAnonymousUserCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Want to apply?</Typography>
                <Typography variant="body1">
                    Learn how to apply by
                    <Link to="/new/member/1">
                        creating an account today
                    </Link>.
                </Typography>
            </CardContent>
        </Card>
    );

    const renderApplyCard = () => {
        if (userDetail) {
            return renderApplyNowCard();

        } else {
            return renderAnonymousUserCard()
        }
        return null;
    };


    return (
        <Grid container spacing={3}>
            {isOwnProfile && (
                <Grid item xs={12}>
                    {renderJobPosterCard()}
                </Grid>
            )}
            {/* 1/3 Contact Card */}
            <Hidden smUp>
                <Grid item md={3}>
                    {renderApplyCard()}
                </Grid>
            </Hidden>
            <Grid item md={9} xs={12}>
                <Card>
                    <CardContent>
                        {/* Heading Section */}
                        <Grid container display="flex" direction="row" alignItems="center" spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        src={jobData?.parent_company?.logo}
                                        alt={`${jobData?.parent_company?.company_name} Logo`}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" direction="row" alignItems="center" spacing={5}>
                            {/*Details*/}
                            <Grid item xs={12} sm={8}>
                                <Grid containe spacing={2} display="flex" alignItems="center" direction="row"
                                      justifyContent="space-between">
                                    <Grid item sm={12} md={4}>
                                        <Typography variant="h4">
                                            {jobData?.job_title}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} display="flex" direction="row"
                                      justifyContent="space-between">
                                    <Grid item>
                                        {jobData?.role?.name &&
                                            <div><Chip size="small" variant="outlined"
                                                       label={jobData?.role?.name}/></div>
                                        }
                                    </Grid>
                                    <Grid item>
                                        {jobData?.location &&
                                            <div>
                                                    <span>
                                                        📍
                                                    </span>
                                                {jobData?.location}
                                            </div>
                                        }
                                    </Grid>
                                    <Grid item>
                                        {jobData?.min_compensation?.range &&
                                            <div>
                                                    <span>
                                                        💰
                                                    </span>
                                                {jobData?.min_compensation?.range} - {jobData?.max_compensation?.range}
                                            </div>
                                        }

                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Grid container spacing={2} display="flex"
                                      direction="row"
                                      justifyContent="end" alignContent="end">
                                    <Hidden smDown>
                                        <Grid item>
                                            <Typography variant="body1" align="right">
                                                Created: {formatDate(jobData?.created_at)}
                                            </Typography>
                                        </Grid>
                                    </Hidden>
                                    <Grid item>
                                        <Button variant="contained" href={jobData?.url}>
                                            Apply Now
                                        </Button>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{m: 2}} variant="middle"/>
                        {/* Body Section */}
                        <section>
                            <Typography variant="body1">
                                {userDetail?.bio}
                            </Typography>
                            <Typography variant="body1">
                                {userDetail?.bio}
                            </Typography>
                            <Container variant="section">
                                <div>
                                    <Typography variant="h5">
                                        Job Description:
                                    </Typography>
                                    <HtmlContentRenderer htmlContent={jobData?.external_description}/>
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        Interview Process:
                                    </Typography>
                                    <HtmlContentRenderer htmlContent={jobData?.external_interview_process}/>
                                </div>
                                <div>
                                    <Typography variant="h5">
                                        Skills:
                                    </Typography>
                                    {jobData?.skills && (
                                        <>
                                            {jobData?.skills.map((skill) => {
                                                return <><Chip key={skill.name} label={skill?.name}/></>
                                            })}
                                        </>
                                    )}
                                </div>

                            </Container>
                            {jobData?.data?.current_company && (
                                <Container variant="section">
                                    <Typography variant="h5">
                                        Current Company
                                    </Typography>
                                    <CompanyCard company={jobData?.data?.current_company}/>
                                </Container>
                            )}

                        </section>
                    </CardContent>
                </Card>
            </Grid>

            {/* 1/3 Contact Card */}
            <Hidden smDown>
                <Grid item md={3}>
                    {renderApplyCard()}
                </Grid>
            </Hidden>
        </Grid>
    );
}

export default ViewJobPage;
