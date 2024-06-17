import BookMentorForm from '../compoents/BookMentorForm';
import { getDropDrownItems, getMemberData } from '@/api-calls';
import AddMemberNoteCard from '@/compoents/AddMemberNoteCard';
import CompanyCard from '@/compoents/CompanyCard';
import ReviewCard from '@/compoents/ReviewCard';
import HtmlContentRenderer from '@/compoents/utils/HtmlContentRenderer';
import { useAuth } from '@/providers/AuthProvider';
import { GitHub, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import {Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Hidden,
    IconButton,
    Modal,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,} from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { routes } from '@/lib/routes';
import { Link } from 'react-router-dom';

function ViewMemberProfile() {
    const { id } = useParams();
    /** @type {any} memberData */
    const [ memberData, setMemberData ] = useState();
    /** @type {any} basicData */
    const [ basicData, setBasicData ] = useState();
    const [ open, setOpen ] = useState(false);
    const [ openBookMentorModal, setOpenBookMentorModal ] = useState(false);
    const [ openRejectModal, setOpenRejectModal ] = useState(false);
    const [ isUserConnectedWithMentor, setIsUserConnectedWithMentor ] = useState(false);
    const [ rejectionForm, setRejectionForm ] = useState({});
    const { user, isLoading, token } = useAuth();
    const loggedInUser = user[0];
    const mentor_roster = loggedInUser?.mentor_roster_data;

    useEffect(() => {
        async function fetchData() {
            try {
                // eslint-disable-next-line no-undef
                const [ memberResponse, basicResponse ] = await Promise.all([ getMemberData(id), getDropDrownItems('pronouns&fields=gender&fields=sexuality') ]);

                setMemberData(memberResponse);
                setBasicData(basicResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(mentor_roster)) {
            const isUserConnectedWithMentor = mentor_roster?.some(
                match => match.mentor === memberData?.data?.mentorship_program?.id && match.mentee === loggedInUser?.mentee_details?.id,
            );

            setIsUserConnectedWithMentor(isUserConnectedWithMentor);
        }
    }, [ memberData ]);

    function handelConnectWithMentor() {
        fetch(routes.api.users.connectWithMentor(id), {
            method: 'post',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }
    const isOwnProfile = loggedInUser?.user_info?.id === memberData?.data?.user?.id;

    const renderApplicationReviewCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">We&apos;re reviewing your application now!</Typography>
            </CardContent>
        </Card>
    );

    const renderCompleteAppCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Please complete the mentorship application!</Typography>
                <Typography variant="body1">
                    When you created your account you shared you wanted to be apart of the mentorship program. Please complete the application to get access to our
                    mentorship program.
                </Typography>
                <Link to="/mentor/create">
                    {' '}
                    <strong>Apply to Program </strong>
                </Link>
            </CardContent>
        </Card>
    );

    const renderSentInterviewCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Grate news! You&apos;ve moved on to the next stage!</Typography>
                <Typography variant="body1">Make sure you check you email that has all the details about setting up time for your interview!</Typography>
            </CardContent>
        </Card>
    );
    const renderSetBookingLinkCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Make sure you update your booking link to make your profile active!</Typography>
                <Typography variant="body1">
                    Head over to the
                    <Link to="/profile">
                        {' '}
                        <strong>mentorship</strong> section of the profile page
                    </Link>
                    to set your Calendly link so people can book time to chat with you!
                </Typography>
            </CardContent>
        </Card>
    );

    const renderOnboardingCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Complete your onboarding by registering for our next mentorship training?</Typography>
                <Button variant="contained" color="primary">
                    RSVP Now
                </Button>
            </CardContent>
        </Card>
    );

    const renderConnectWithMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Connect with <span style={{ textTransform: 'capitalize' }}>{memberData?.data?.user?.first_name}</span>!
                </Typography>
                <Button onClick={() => setOpenBookMentorModal(true)} variant="contained" color="primary">
                    Connect Now
                </Button>
            </CardContent>
        </Card>
    );

    const renderStaffReviewCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1">
                    Did they pass?
                </Typography>
                <Typography variant="body1" component="p">
                    After reviewing the application, either approve or reject the mentor application.
                </Typography>
                <Button onClick={handelInterviewRequest} variant="contained" color="primary">
                    Send Interview Request
                </Button>
                <Button
                    onClick={() => {
                        setOpenRejectModal(true);
                    }}
                    variant="contained"
                    color="primary">
                    Reject The Application
                </Button>
            </CardContent>
        </Card>
    );
    const renderMentorshipApplicationCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1">
                    Mentor Application
                </Typography>
                <Typography variant="body1" component="p">
                    Question
                </Typography>
                <Button onClick={handelInterviewRequest} variant="contained" color="primary">
                    Send Interview Request
                </Button>
                <Button
                    onClick={() => {
                        setOpenRejectModal(true);
                    }}
                    variant="contained"
                    color="primary">
                    Reject The Application
                </Button>
            </CardContent>
        </Card>
    );

    const renderStaffInterviewApprovalCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1">
                    Ready to Approve this Mentor?
                </Typography>
                <Typography variant="body1" component="p">
                    We&apos;ve requested an the mentor to schedule an interview on {memberData?.data?.mentorship_program?.mentor_profile?.interview_requested_at_date}.
                    Once interviewed, you can passed approve or reject them.
                </Typography>
                <Button onClick={handelApproveMentor} variant="contained" color="primary">
                    Approve Mentor
                </Button>
                <Button
                    onClick={() => {
                        setOpenRejectModal(true);
                    }}
                    variant="contained"
                    color="error">
                    Reject Mentor
                </Button>
                <Button onClick={handelSendReminderMentor} variant="contained" color="primary">
                    Send Interview Reminder
                </Button>
            </CardContent>
        </Card>
    );
    const renderPauseApplicationCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1">
                    Do you need to paused mentoring?
                </Typography>
                <Typography variant="body1" component="p">
                    We don&apos;t want you to burnout, so we make it easy for you to pause your mentoring because life happens and we get it. When you&apos;re ready you
                    can come back to your account and reactivate it later.
                </Typography>
                <Button onClick={handelPauseMentorApplication} variant="contained" color="primary">
                    Pause Mentor Application
                </Button>
            </CardContent>
        </Card>
    );

    const renderMatchedWithThisMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">You&apos;ve connected with this mentor!</Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                    }}
                    color="primary">
                    Leave a Review
                </Button>
                <Button onClick={() => setOpenBookMentorModal(true)} variant="contained" color="primary">
                    Book Time
                </Button>
            </CardContent>
        </Card>
    );
    const renderReviewingPublicMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Connect with this mentor today</Typography>
                <Button variant="contained" color="primary">
                    Connect Now
                </Button>
            </CardContent>
        </Card>
    );
    const renderPausePublicMentorCard = () => (
        <Card>
            <CardContent>
                <Typography style={{ textTransform: 'capitalize' }} variant="h6">
                    {memberData?.data?.user?.first_name} stepped away from mentoring to fill their cup.
                </Typography>
                <Typography variant="body1">Please check back later to see when they are active.</Typography>
            </CardContent>
        </Card>
    );

    const handelInterviewRequest = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'mentor-update-status': 'send-invite' }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handelApproveMentor = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'mentor-update-status': 'approve-mentor' }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handelPauseMentorApplication = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'mentor-update-status': 'paused' }),
        })
            .then(response => {
                console.log('response');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };
    const handelReactivateMentorApplication = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'mentor-update-status': 'active' }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };
    const handelSendReminderMentor = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'mentor-update-status': 'interview-reminder' }),
        })
            .then(response => {
                console.log('response');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const handelMentorAppRejection = () => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + `/mentorship/mentor/${id}/update-status/`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rejectionForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('saved');
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const renderSocialIcons = () => (
        <Grid container spacing={1}>
            {memberData?.data?.user_profile?.linkedin && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.linkedin} target="_blank">
                        <LinkedIn />
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.instagram && (
                <Grid item>
                    <IconButton href={`https://instagram.com/${memberData?.data?.user_profile?.instagram}`} target="_blank">
                        <Instagram />
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.github && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.github} target="_blank">
                        <GitHub />
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.twitter && (
                <Grid item>
                    <IconButton href={`https://twitter.com/${memberData?.data?.user_profile?.twitter}`} target="_blank">
                        <Twitter />
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.youtube && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.youtube} target="_blank">
                        <YouTube />
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.personal && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.personal} target="_blank">
                        <Language />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );

    const renderOtherBadges = () => (
        <Grid display="flex" direction="row" justifyContent="space-between" style={{ maxWidth: '458px' }}>
            {memberData?.data?.user?.is_team && (
                <div>
                    <Chip size="small" variant="outlined" label="Core Team" color="secondary" />
                </div>
            )}
            {memberData?.data?.user?.is_community_recruiter && (
                <div>
                    <Chip size="small" variant="outlined" label="Community Recruiter" color="secondary" />
                </div>
            )}
            {memberData?.data?.user?.is_volunteer && (
                <div>
                    <Chip size="small" variant="outlined" label="TBC Volunteer" color="secondary" />
                </div>
            )}
            {memberData?.data?.user?.is_mentor && memberData?.data?.user?.is_mentor_training_complete && memberData?.data?.user?.is_mentor_profile_active && (
                <div>
                    <Chip size="small" variant="outlined" label="Mentor" color="primary" />
                </div>
            )}
        </Grid>
    );
    const renderIdentityBadges = () => (
        <Grid display="flex" direction="row" justifyContent="end">
            {memberData?.data?.user_profile?.care_giver && memberData?.data?.user_profile?.is_care_giver_displayed && (
                <div>
                    <Chip size="small" variant="outlined" label="Caregiver" />
                </div>
            )}
            {memberData?.data?.user_profile?.disability && memberData?.data?.user_profile?.is_disability_displayed && (
                <div>
                    <Chip size="small" variant="outlined" label="Disability" />
                </div>
            )}
            {memberData?.data?.user_profile?.identity_gender && memberData?.data?.user_profile?.is_identity_gender_displayed && (
                <>
                    {memberData?.data?.user_profile?.identity_gender.map(identity => {
                        const identityItem = basicData.gender.find(item => item.id === identity);
                        return (
                            <>
                                <Chip size="small" variant="outlined" label={identityItem?.gender} />
                            </>
                        );
                    })}
                </>
            )}
            {memberData?.data?.user_profile?.identity_sexuality && memberData?.data?.user_profile?.is_identity_sexuality_displayed && (
                <>
                    {memberData?.data?.user_profile?.identity_sexuality.map(identity => {
                        const identityItem = basicData.sexuality.find(item => item.id === identity);
                        return (
                            <>
                                <Chip size="small" variant="outlined" label={identityItem?.identity} />
                            </>
                        );
                    })}
                </>
            )}
        </Grid>
    );
    const renderUserSpecificCard = () => {
        // Admin view on handeling a mentors profile
        // alert(loggedInUser?.account_info?.is_staff)
        if (loggedInUser?.account_info?.is_staff) {
            if (memberData?.data?.user?.is_mentor_profile_removed) {
                // user was a mentor but they were removed from our community
                return renderMentorRemovedCard();
            }
            if (!memberData?.data?.user?.is_mentor_profile_active && memberData?.data?.user?.is_mentor_profile_approved) {
                if (memberData?.data?.mentorship_program?.calendar_link) {
                    return renderPauseMentoringCard();
                } else {
                    return renderSetBookingLinkCard();
                }
            }

            if (memberData?.data?.user?.is_mentor_profile_active && memberData?.data?.user?.is_mentor_profile_approved) {
                return renderPauseMentoringCard();
            }
            if (memberData?.data?.mentorship_program?.mentor_profile?.mentor_status === 'interviewing') {
                return renderStaffInterviewApprovalCard();
            }
            if (memberData?.data?.mentorship_program?.mentor_profile?.user?.is_mentor_application_submitted) {
                return renderStaffReviewCard();
            }
        }
        // If the user viewing is the onwer of this profile

        if (isOwnProfile && memberData?.data?.user?.is_mentor && !memberData?.data?.user?.is_mentor_profile_removed) {
            const {
                user,
                mentorship_program: { calendar_link, mentor_profile },
            } = memberData?.data || {};

            const {
                is_mentor_profile_approved, is_mentor_profile_active, is_mentor_profile_removed, is_mentor_application_submitted, is_mentor_interviewing 
            } =
                user || {};
            alert(calendar_link);
            if (is_mentor_profile_removed) {
                // user was a mentor but they were removed from our community
                return renderMentorRemovedCard();
            }
            if (calendar_link && is_mentor_profile_active) {
                // Account is active and people can book with them so the mentor can pause mentorship
                return renderPauseMentoringCard();
            }

            if (is_mentor_profile_approved && !calendar_link && !is_mentor_profile_active) {
                alert('not iit');
                // if account is approved but not active because they don't have a calendar link
                return renderSetBookingLinkCard();
            }

            if (is_mentor_interviewing && !is_mentor_profile_approved) {
                // Mentorship application submitted and we want to interview them
                return renderSentInterviewCard();
            }

            if (is_mentor_application_submitted && !is_mentor_interviewing) {
                // Mentorship application submitted and we're reviewing the app
                return renderApplicationReviewCard();
            }

            if (!is_mentor_application_submitted && !is_mentor_interviewing) {
                // User request to be in the mentorship program but hasn't submitted application
                // They need to submit the application to get to the next step
                return renderCompleteAppCard();
            }

            return renderMentorEdgeCaseStateCard();
        } else {
            if (memberData?.data?.user?.is_mentor && memberData?.data?.user?.is_mentor_profile_active && !loggedInUser?.account_info?.is_staff) {
                if (isUserConnectedWithMentor) {
                    return renderMatchedWithThisMentorCard();
                } else {
                    if (memberData?.data?.user?.is_mentor_profile_removed) {
                        return renderPausePublicMentorCard();
                    } else {
                        return renderConnectWithMentorCard();
                    }
                }
            }
        }

        return null;
    };

    const renderMentorProfileSection = () => (
        <>
            <Container>
                <Typography variant="h5">Mentorship Goals:</Typography>
                <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.mentor_profile?.mentorship_goals} />
            </Container>
            <Container>
                <Typography variant="h5">How They Plan to Help:</Typography>
                <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.mentor_profile?.mentor_how_to_help} />
            </Container>
            {loggedInUser?.account_info?.is_staff && (
                <Card>
                    <Container>
                        <Typography variant="h4">Mentorship Applications</Typography>
                        <Typography variant="h5">What Motivates you at work:</Typography>
                        <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.work_motivation} />
                    </Container>
                    <Container>
                        <Typography variant="h5">Their long term career goals:</Typography>
                        <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.career_goals} />
                    </Container>
                    <Container>
                        <Typography variant="h5">Their career milestones:</Typography>
                        <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.career_milestones} />
                    </Container>
                    <Container>
                        <Typography variant="h5">Their view of key to success:</Typography>
                        <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.career_success} />
                    </Container>
                    <Container>
                        <Typography variant="h5">Their biggest strengths:</Typography>
                        <HtmlContentRenderer htmlContent={memberData?.data?.mentorship_program?.biggest_strengths} />
                    </Container>
                </Card>
            )}
        </>
    );
    const renderMentorContactSpecificCard = () => {
        if (!isOwnProfile && !!memberData?.data?.user?.is_mentor_profile_removed) {
            if (memberData?.data?.user?.is_mentor_application_submitted && !memberData?.data?.user?.is_mentor_training_complete) {
                // under review or interviewing
                return renderReviewingPublicMentorCard();
            } else if (memberData?.data?.user?.is_mentor_profile_paused || memberData?.data?.user?.is_mentor_profile_active) {
                // paused
                return renderPausePublicMentorCard();
            } else {
                // active
                if (memberData?.data?.user?.is_mentor_profile_removed) {
                    return renderPausePublicMentorCard();
                } else {
                    return renderConnectWithMentorCard();
                }
            }
        }
        return null;
    };
    const renderMentorRemovedCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Your mentor profile was removed.</Typography>
                <Typography variant="body1">
                    We&apos;ve sent you an email with more detail about why your mentor profile was removed but if you would like to chat with someone on the team about
                    this please email us at hello@techbychoice.org.
                </Typography>
                {loggedInUser?.account_info?.is_staff && (
                    <Button onClick={handelReactivateMentorApplication} variant="contained" color="primary">
                        Reactivate Profile
                    </Button>
                )}
            </CardContent>
        </Card>
    );
    const renderPauseMentoringCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Do you need to pause mentoring?</Typography>
                <Typography variant="body1">
                    We don&apos;t want you to burnout, so we make it easy for you to pause your mentoring because life happens and we get it. When you&apos;re ready you
                    can come back to your account and reactivate it later.
                </Typography>
                <Button onClick={handelPauseMentorApplication} variant="contained" color="primary">
                    Pause Mentorship
                </Button>
            </CardContent>
        </Card>
    );
    const renderReactivateMentoringCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Your mentorship account is on pause.</Typography>
                <Typography variant="body1">When you&apos;re ready to reactivate please feel free to click the button below when you&apos;re ready.</Typography>
                <Button onClick={handelReactivateMentorApplication} variant="contained" color="primary">
                    Reactivate Mentor Application
                </Button>
            </CardContent>
        </Card>
    );
    const renderMentorEdgeCaseStateCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">We&apos;ve run into trouble with your mentor application.</Typography>
                <Typography variant="body1">
                    Please reach out to our support team at <Link href="mailTo:support@techbychoice.org">support@techbychoice.org</Link> to help you get you back on
                    track.
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {renderUserSpecificCard()}
            </Grid>
            {/* 1/3 Contact Card */}
            <Hidden smUp>
                <Grid item md={3}>
                    {renderMentorContactSpecificCard()}
                </Grid>
            </Hidden>
            <Grid item md={9} xs={12}>
                <Card>
                    <CardContent>
                        {/* Heading Section */}
                        <Grid container display="flex" direction="row" alignItems="center" spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardMedia component="img" height="100%" src={memberData?.data?.user_profile?.photo} alt={memberData?.data?.user?.first_name} />
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography variant="h4">
                                            <span style={{ textTransform: 'capitalize' }}>
                                                {memberData?.data?.user?.first_name} {memberData?.data?.user?.last_name.slice(0, 1)}.{' '}
                                            </span>
                                            {memberData?.data?.user_profile?.identity_pronouns && memberData?.data?.user_profile?.is_pronouns_displayed && (
                                                <>
                                                    {memberData?.data?.user_profile?.identity_pronouns.map(pronoun => {
                                                        const identityItem = basicData.pronouns.find(item => item.id === pronoun);
                                                        return (
                                                            <>
                                                                <Typography variant="body2">{identityItem?.pronouns}</Typography>
                                                            </>
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {renderIdentityBadges()}
                                    </Grid>
                                </Grid>

                                <div>{renderOtherBadges()}</div>
                                {renderSocialIcons()}
                                <Typography variant="subtitle1">{user?.user_info?.userprofile?.currentTitle}</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ m: 2 }} variant="middle" />
                        {/* Body Section */}
                        <section>
                            <Typography variant="body1">
                                {user?.bio}
                                <HtmlContentRenderer htmlContent={memberData?.data?.user_profile?.bio} />
                            </Typography>
                            {/*{memberData?.data?.user?.is_mentor_profile_active && (*/}
                            {memberData?.data?.user?.is_mentor &&
                                (memberData?.data?.user?.is_mentor_profile_active || isOwnProfile || loggedInUser?.account_info?.is_staff) &&
                                renderMentorProfileSection()}
                            <Container sx={{ mb: 3 }}>
                                <Typography variant="h5">Skills:</Typography>
                                {memberData?.data?.talent_profile?.skills && (
                                    <>
                                        {memberData?.data?.talent_profile?.skills.map(skill => {
                                            return (
                                                <>
                                                    <Chip sx={{ mr: 2 }} key={skill} label={skill} />
                                                </>
                                            );
                                        })}
                                    </>
                                )}
                            </Container>
                            {memberData?.data?.current_company && (
                                <Container>
                                    <Typography gutterBottom variant="h5">
                                        Current Company
                                    </Typography>
                                    <Link to={`/company/${memberData?.data?.current_company.id}`}>
                                        <CompanyCard company={memberData?.data?.current_company} />
                                    </Link>
                                </Container>
                            )}
                            {isUserConnectedWithMentor && (
                                <>
                                    <hr />
                                    <AddMemberNoteCard talentDetails={memberData?.data} />
                                </>
                            )}
                        </section>
                    </CardContent>
                </Card>
            </Grid>

            {/* 1/3 Contact Card */}
            <Hidden smDown>
                <Grid item md={3}>
                    {renderMentorContactSpecificCard()}
                </Grid>
            </Hidden>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                style={{ padding: '20px' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                {/*
                // @ts-ignore */}
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: '#fff',
                        boxShadow: 24,
                        padding: 15,
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave a Review for {memberData?.data?.user?.first_name}
                    </Typography>
                    <div>
                        <ReviewCard talentDetails={memberData?.data} setOpen={setOpen} />
                    </div>
                </Box>
            </Modal>
            {/* book time with mentor */}
            <Modal
                open={openBookMentorModal}
                onClose={() => {
                    setOpenBookMentorModal(false);
                }}
                style={{ padding: '20px' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: '#fff',
                        boxShadow: 24,
                        padding: 15,
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave a note before you book!
                    </Typography>
                    <div>
                        <BookMentorForm talentDetails={memberData?.data} setOpen={setOpenBookMentorModal} />
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openRejectModal}
                onClose={() => {
                    setOpenRejectModal(false);
                }}
                style={{ padding: '20px' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: '#fff',
                        boxShadow: 24,
                        padding: 15,
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Why are we rejecting {memberData?.data?.user?.first_name}?
                    </Typography>
                    <Box>
                        <FormControl>
                            <FormLabel id="mentor-rejection-reason-label">Why are we rejecting </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-mentor-rejection-reason-label"
                                name="mentor-rejection-reason"
                                onChange={e => {
                                    setRejectionForm({ 'mentor-rejection-reason': e.target.value });
                                }}>
                                <FormControlLabel value="removed_coc_issues" control={<Radio />} label="Rejected for COC Issues" />
                                <FormControlLabel value="incomplete_application" control={<Radio />} label="Incomplete Application" />
                                <FormControlLabel value="lacking_experience" control={<Radio />} label="Lacking Experience" />
                                <FormControlLabel value="rejected_other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button type="button" onClick={handelMentorAppRejection} variant="solid">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    );
}

export default ViewMemberProfile;
