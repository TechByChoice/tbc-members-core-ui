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
    Divider
} from '@mui/material';
import {LinkedIn, Instagram, GitHub, Twitter, YouTube, Web, Language} from '@mui/icons-material';
import {useParams} from "react-router";
import {getBasicSystemInfo, getCompanyList, getMemberData} from "../api-calls";
import Container from "@mui/material/Container";
import CompanyCard from "../compoents/CompanyCard";
import {Global} from "@emotion/react";
import HtmlContentRenderer from "../compoents/utils/HtmlContentRenderer";
import {useAuth} from "../providers/AuthProvider";
import Link from "@mui/material/Link";

function ViewMemberProfile() {
    const {id} = useParams();
    const [memberData, setMemberData] = useState()
    const [basicData, setBasicData] = useState()
    const { user, isLoading } = useAuth();
    const loggedInUser = user[0]


    useEffect(() => {
        async function fetchData() {
            try {
                const [memberResponse, basicResponse] = await Promise.all([
                    getMemberData(id),
                    getBasicSystemInfo()
                ]);

                setMemberData(memberResponse);
                setBasicData(basicResponse);
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
    const isOwnProfile = loggedInUser?.user_info?.id === memberData?.data?.user?.id;

    const renderApplicationReviewCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">We're reviewing your application now!</Typography>
            </CardContent>
        </Card>
    );

    const renderOnboardingCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Complete your onboarding by registering for our next mentorship
                    training?</Typography>
                <Button variant="contained" color="primary">RSVP Now</Button>
            </CardContent>
        </Card>
    );

    const renderConnectWithMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Connect with mentor</Typography>
                <Button variant="contained" color="primary">Connect Now</Button>
            </CardContent>
        </Card>
    );

    const renderConnectWithThisMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Connect with this mentor today</Typography>
                <Button variant="contained" color="primary">Connect Now</Button>
            </CardContent>
        </Card>
    );
    const renderReviewingPublicMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">Connect with this mentor today</Typography>
                <Button variant="contained" color="primary">Connect Now</Button>
            </CardContent>
        </Card>
    );
    const renderPausePublicMentorCard = () => (
        <Card>
            <CardContent>
                <Typography variant="h6">{memberData?.data?.user?.first_name} stepped away from mentoring to fill their
                    cup.</Typography>
                <Typography variant="body1">Please check back later to see when they are active.</Typography>
            </CardContent>
        </Card>
    );

    const renderSocialIcons = () => (
        <Grid container spacing={1}>
            {memberData?.data?.user_profile?.linkedin && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.linkedin} target="_blank">
                        <LinkedIn/>
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.instagram && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.instagram} target="_blank">
                        <Instagram/>
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.github && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.github} target="_blank">
                        <GitHub/>
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.twitter && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.twitter} target="_blank">
                        <Twitter/>
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.youtube && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.youtube} target="_blank">
                        <YouTube/>
                    </IconButton>
                </Grid>
            )}
            {memberData?.data?.user_profile?.personal && (
                <Grid item>
                    <IconButton href={memberData?.data?.user_profile?.personal} target="_blank">
                        <Language/>
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );

    const renderOtherBadges = () => (
        <Grid display="flex" direction="row" justifyContent="space-between" style={{maxWidth: '458px'}}>
            {memberData?.data?.user?.is_team &&
                <div><Chip size="small" variant="outlined" label="Core Team" color="secondary"/></div>}
            {memberData?.data?.user?.is_community_recruiter &&
                <div><Chip size="small" variant="outlined" label="Community Recruiter" color="secondary"/></div>}
            {memberData?.data?.user?.is_volunteer &&
                <div><Chip size="small" variant="outlined" label="TBC Volunteer" color="secondary"/></div>}
            {memberData?.data?.user?.is_mentor && memberData?.data?.user?.is_mentor_training_complete && memberData?.data?.user?.is_mentor_profile_active &&
                <div><Chip size="small" variant="outlined" label="Mentor" color="primary"/></div>}
        </Grid>
    );
    const renderIdentityBadges = () => (
            <Grid display="flex" direction="row" justifyContent="end">
                {memberData?.data?.user_profile?.disability}
                {memberData?.data?.user_profile?.care_giver &&
                    <div><Chip size="small" variant="outlined" label="Caregiver"/></div>}
                {memberData?.data?.user_profile?.disability &&
                    <div><Chip size="small" variant="outlined" label="Disability"/></div>}
                {memberData?.data?.user_profile?.identity_gender &&
                    <>
                        {memberData?.data?.user_profile?.identity_gender.map((identity) => {
                            const identityItem = basicData.gender_identities.find(item => item.id === identity);
                            return <><Chip size="small" variant="outlined" label={identityItem?.gender}/></>
                        })}
                    </>
                }

                {memberData?.data?.user_profile?.identity_sexuality.map((identity) => {
                    const identityItem = basicData.sexual_identities.find(item => item.id === identity);
                    return <><Chip size="small" variant="outlined" label={identityItem?.identity}/>
                    </>
                })}

            </Grid>
        )
    ;

    const renderUserSpecificCard = () => {
        if (isOwnProfile) {

            if (memberData?.data?.user?.is_mentor_training_complete
                && memberData?.data?.user?.is_mentor_profile_active) {
                return renderPauseMentoringCard();
            } else if (memberData?.data?.user?.is_mentor_application_submitted) {
                return renderApplicationReviewCard();
            } else {
                return renderMentorEdgeCaseStateCard();
            }
        } else {
                if (memberData?.data?.user?.is_mentor) {
                    return renderConnectWithMentorCard();
                } else {
                    return null
                }
            }
        return null;
    };
    if (memberData?.data?.talent_profile?.skills) {

        memberData.data.talent_profile.skills.forEach((skill, index) => {
            // const skillItem = basicData.job_skills.find(item => item.id === skill);

        })
    }


    const renderMentorProfileSection = () => (
        <>
            <Container variant="section">
                <Typography variant="h5">
                    Mentorship Goals:
                </Typography>
                <HtmlContentRenderer
                    htmlContent={memberData?.data?.mentorship_program?.mentor_profile?.mentorship_goals}/>
            </Container>
            <Container variant="section">
                <Typography variant="h5">
                    How They Plan to Help:
                </Typography>
                <HtmlContentRenderer
                    htmlContent={memberData?.data?.mentorship_program?.mentor_profile?.mentor_how_to_help}/>
            </Container>
        </>
    );
    const renderMentorContactSpecificCard = () => {

        if (!isOwnProfile && !!memberData?.data?.user?.is_mentor_profile_removed) {
            if (memberData?.data?.user?.is_mentor_application_submitted && !memberData?.data?.user?.is_mentor_training_complete) {
                // under review or interviewing
                return renderReviewingPublicMentorCard();
            } else if (memberData?.data?.user?.is_mentor_profile_paused) {
                // paused
                return renderPausePublicMentorCard();
            } else {
                // active
                return renderConnectWithThisMentorCard();
            }
        }
        return null;
    };
    const renderPauseMentoringCard = () =>
        (
            <Card>
                <CardContent>
                    <Typography variant="h6">Do you need to pause mentoring?</Typography>
                    <Typography variant="body1">
                        We don't want you to burnout, so we make it easy for you to pause your mentoring because life
                        happens and we get it. When you're ready you can come back to your account and reactivate it
                        later.
                    </Typography>
                    <Button variant="contained" color="primary">Pause Mentorship</Button>
                </CardContent>
            </Card>
        );
    const renderMentorEdgeCaseStateCard = () =>
        (
            <Card>
                <CardContent>
                    <Typography variant="h6">We've run into trouble with your mentor application.</Typography>
                    <Typography variant="body1">
                        Please reach out to our support team at <Link href='mailTo:support@techbychoice.org'>support@techbychoice.org</Link> to help you get you back on track.
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
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        src={memberData?.data?.user_profile?.photo}
                                        alt={memberData?.data?.user?.first_name}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography variant="h4">
                                            {memberData?.data?.user?.first_name} {memberData?.data?.user?.last_name.slice(0, 1)}. {' '}
                                            {memberData?.data?.user_profile?.identity_pronouns && (
                                                <>
                                                    {memberData?.data?.user_profile?.identity_pronouns.map((pronoun) => {
                                                        const identityItem = basicData.pronouns_identities.find(item => item.id === pronoun);
                                                        return <><Typography
                                                            variant="body2">{identityItem?.pronouns}</Typography></>
                                                    })}
                                                </>
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        {renderIdentityBadges()}
                                    </Grid>
                                </Grid>

                                <div>
                                    {renderOtherBadges()}
                                </div>
                                {renderSocialIcons()}
                                <Typography
                                    variant="subtitle1">{user?.user_info?.userprofile?.currentTitle}</Typography>

                            </Grid>
                        </Grid>
                        <Divider sx={{m: 2}} variant="middle"/>
                        {/* Body Section */}
                        <section>
                            <Typography variant="body1">
                                {user?.bio}
                                <HtmlContentRenderer
                                    htmlContent={memberData?.data?.user_profile?.bio}/>
                            </Typography>
                            {/*{memberData?.data?.user?.is_mentor_profile_active && (*/}
                            {memberData?.data?.user?.is_mentor && (
                                renderMentorProfileSection()
                            )}
                            <Container variant="section">
                                <Typography variant="h5">
                                    Skills:
                                </Typography>
                                {memberData?.data?.talent_profile?.skills && (
                                    <>
                                        {memberData?.data?.talent_profile?.skills.map((skill) => {
                                            return <><Chip label={skill?.name}/></>
                                        })}
                                    </>
                                )}
                            </Container>
                            {memberData?.data?.current_company && (
                                <Container variant="section">
                                    <Typography variant="h5">
                                        Current Company
                                    </Typography>
                                    <CompanyCard company={memberData?.data?.current_company}/>
                                </Container>
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
        </Grid>
    );
}

export default ViewMemberProfile;
