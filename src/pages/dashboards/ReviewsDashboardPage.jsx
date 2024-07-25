import React, { Suspense } from 'react';
import { Card, Grid, styled, useTheme } from '@mui/material';
import ErrorBoundary from '@/compoents/ErrorBoundary';
import { useAuth } from '@/providers/AuthProvider';
import { FeatureCard } from '@/compoents/FeatuerCards';
import AllCompaniesPage from '@/pages/AllCompaniesPage';

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
    const { user } = useAuth();
    const reviewAccess = user[0]?.account_info?.is_company_review_access_active;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={reviewAccess ? 6 : 6}>
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
                            <Grid item xs={12} sm={6}>
                                <FeatureCard
                                    image="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6608a8228b913bba42d50c39_Reviews%20Icon.png"
                                    subTitle="TBC: Open Doors"
                                    linkEndpoint="/reviews"
                                    btnText="Add a Review"
                                    title="Company Reviews"
                                    eventId="OD__USER__button_feature_card_open_doors"
                                />
                            </Grid>
                        </Suspense>
                    </ErrorBoundary>
                )}
            </Grid>
            <Grid mt={10} spacing={3}>
                <AllCompaniesPage />
            </Grid>
        </>
    );
}
