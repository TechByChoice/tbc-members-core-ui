import StatusAlert from '@/compoents/Alerts';
import NavBar from '@/compoents/layout/NavBar';
import '@/index.css';
import AllEventsPage from '@/pages/AllEventsPage';
import AllJobsPage from '@/pages/AllJobsPage';
import AllMentorsPage from '@/pages/AllMentorsPage';
import Dashboard from '@/pages/Dashboard';
import JobReferralPage from '@/pages/JobReferralPage';
import LoginPage from '@/pages/LoginPage';
import MemberSignupPage from '@/pages/MemberSignupPage';
import NewMemberPage from '@/pages/NewMemeberPage';
import NewMentorPage from '@/pages/NewMentorPage';
import ProfileSettingPage from '@/pages/ProfileSettingPage';
import ViewJobPage from '@/pages/ViewJobPage';
import ViewMemberProfile from '@/pages/ViewMemberProfile';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { StatusProvider } from '@/providers/MsgStatusProvider';
import { PrivateRoutes } from '@/providers/PrivateRouteProvider';
import { Container } from '@mui/material';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import ViewCompanyPage from '@/pages/ViewCompanyPage';
import AllMembersPage from '@/pages/AllMembersPage';
import CompanySignupPage from '@/pages/CompanySignupPage';
import CreateAccountPage from '@/pages/CreateAccountPage';

// import TestPage from ;
const Review = React.lazy(() => import('open_doors/Review'));

const App = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider>
            <StatusProvider>
                <BrowserRouter>
                    <StatusAlert />
                    <NavBar />
                    <Container>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />

                            <Route
                                path="/reviews"
                                element={
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Review />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoutes userDetail={user || undefined}>
                                        <ProfileSettingPage userDetail={user || undefined} />
                                    </PrivateRoutes>
                                }
                            />
                            <Route path="/new" element={<CreateAccountPage />} />
                            <Route path="/new/member/2" element={<NewMemberPage />} />
                            <Route path="/member/all" element={<AllMembersPage />} />
                            <Route path="/event/all" element={<AllEventsPage />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoutes userDetail={user?.[0]}>
                                        <Dashboard />
                                    </PrivateRoutes>
                                }
                            />
                            <Route path="/job/new/referral" element={<JobReferralPage />} />
                            <Route path="/job/:id" element={<ViewJobPage isLoading={isLoading} userDetail={user?.[0]} />} />
                            <Route path="/company/:id" element={<ViewCompanyPage isLoading={isLoading} userDetail={user?.[0]} />} />
                            <Route path="/job/all" element={<AllJobsPage />} />
                            <Route path="/member/:id" element={<ViewMemberProfile />} />
                            <Route path="/mentor/create" element={<NewMentorPage />} />
                            <Route path="/mentor/all" element={<AllMentorsPage />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </StatusProvider>
        </AuthProvider>
    );
};

const container = document.getElementById('app');

createRoot(container).render(<App />);
