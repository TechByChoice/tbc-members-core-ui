import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import StatusAlert from './compoents/Alerts';
import NavBar from './compoents/layout/NavBar';
import { PrivateRoutes } from './providers/PrivateRouteProvider';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import Dashboard from './pages/Dashboard';
import { StatusProvider } from './providers/MsgStatusProvider';
import LoginPage from './pages/LoginPage';
import MemberSignupPage from './pages/MemberSignupPage';
import NewMemberPage from './pages/NewMemeberPage';
import AllEventsPage from './pages/AllEventsPage';
import ProfileSettingPage from './pages/ProfileSettingPage';
import NewMentorPage from './pages/NewMentorPage';
import AllMentorsPage from './pages/AllMentorsPage';
import ViewMemberProfile from './pages/ViewMemberProfile';
import JobReferralPage from './pages/JobReferralPage';
import ViewJobPage from './pages/ViewJobPage';
import AllJobsPage from './pages/AllJobsPage';

// import TestPage from ;
// const TestPage = React.lazy(() => import("open_doors/TestPage"  ));

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
                            <Route exact path="/login" element={<LoginPage />} />
                            <Route
                                exact
                                path="/profile"
                                element={
                                    <PrivateRoutes userDetail={user || undefined}>
                                        <ProfileSettingPage />
                                    </PrivateRoutes>
                                }
                            />
                            <Route exact path="/new/member/1" element={<MemberSignupPage />} />
                            <Route exact path="/new/member/2" element={<NewMemberPage />} />
                            <Route exact path="/event/all" element={<AllEventsPage />} />
                            <Route
                                exact
                                path="/"
                                element={
                                    <PrivateRoutes userDetail={user?.[0]}>
                                        <Dashboard />
                                    </PrivateRoutes>
                                }
                            />
                            <Route exact path="/job/new/referral" element={<JobReferralPage />} />
                            <Route exact path="/job/:id" element={<ViewJobPage isLoading={isLoading} userDetail={user?.[0]} />} />
                            <Route exact path="/job/all" element={<AllJobsPage />} />
                            <Route exact path="/member/:id" element={<ViewMemberProfile isLoading={isLoading} userDetail={user?.[0]} />} />
                            <Route exact path="/mentor/create" element={<NewMentorPage isLoading={isLoading} userDetail={user?.[0]} />} />
                            <Route exact path="/mentor/all" element={<AllMentorsPage isLoading={isLoading} userDetail={user?.[0]} />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </StatusProvider>
        </AuthProvider>
    );
};
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
