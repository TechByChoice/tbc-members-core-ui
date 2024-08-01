import StatusAlert from '@/compoents/Alerts';
import '@/index.css';
import theme from './temp-theme';
import AllEventsPage from '@/pages/AllEventsPage';
import AllJobsPage from '@/pages/AllJobsPage';
import AllMentorsPage from '@/pages/AllMentorsPage';
import Dashboard from '@/pages/Dashboard';
import JobReferralPage from '@/pages/JobReferralPage';
import LoginPage from '@/pages/LoginPage';
import NewMemberPage from '@/pages/NewMemeberPage';
import NewMentorPage from '@/pages/NewMentorPage';
import ViewJobPage from '@/pages/ViewJobPage';
import ViewMemberProfile from '@/pages/ViewMemberProfile';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { StatusProvider } from '@/providers/MsgStatusProvider';
import { PrivateRoutes } from '@/providers/PrivateRouteProvider';
import { Container } from '@mui/material';
import { TbcThemeProvider } from '@techbychoice/tbc-component-library';
import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ViewCompanyPage from '@/pages/ViewCompanyPage';
import AllMembersPage from '@/pages/AllMembersPage';
import AllCompaniesPage from '@/pages/AllCompaniesPage';
import CreateAccountPage from '@/pages/CreateAccountPage';
import CheckEmailPage from '@/pages/CheckEmailPage';
import ConfirmAccountPage from '@/pages/onboarding/company/ConfirmAccountPage';
import NewCompanyPage from '@/pages/NewCompanyPage';
import WrapperReview from '@/compoents/WrapperReview';
import { ThemeProvider } from '@mui/material/styles';
import CreateReviewAccountPage from '@/pages/CreateReviewAccountPage';
import TermsAndAgreementsWrapperPage from '@/pages/TermsAndAgreementsWrapperPage';
import NavBarWrapper from '@/compoents/layout/NavBarWrapper';
import WrapperQuestions from '@/compoents/WrapperQuestions';
import WrapperSettingsPage from '@/pages/WrapperSettingsPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import CreateNewPasswordPage from '@/pages/CreateNewPasswordPage';
import TermsAndConditions from '@/pages/TermsAndConditionsPage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import EULAPage from '@/pages/EULAPage';
import OnboardingProfilePage from '@/pages/OnboardingProfilePage';

const SurveyQuestions = React.lazy(() => import('open_doors/SurveyQuestions'));

const App = () => {
    const [ moduleLoaded, setModuleLoaded ] = useState(false);

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                }}>
                Loading...
            </div>
        );
    }

    return (
        <TbcThemeProvider>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <StatusProvider>
                        <BrowserRouter>
                            <StatusAlert />
                            <NavBarWrapper />
                            <Container id="mainContent">
                                <Routes>
                                    <Route path="/" element={<LoginPage />} />
                                    <Route path="/password-reset" element={<ResetPasswordPage />} />
                                    <Route path="/password-reset/confirm-password/:id/:token" element={<CreateNewPasswordPage />} />
                                    <Route
                                        path="/reviews"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <WrapperReview />
                                            </PrivateRoutes>
                                        }
                                    />

                                    <Route
                                        path="/questions/:id"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <WrapperQuestions />
                                            </PrivateRoutes>
                                        }
                                    />

                                    <Route
                                        path="/profile"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <WrapperSettingsPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route path="/open-doors/new" element={<CreateReviewAccountPage />} />
                                    <Route path="/new" element={<CreateAccountPage />} />
                                    <Route path="/new/check-email" element={<CheckEmailPage />} />
                                    <Route path="/new/confirm-account/:id/:token" element={<ConfirmAccountPage />} />
                                    <Route path="/new/confirm-agreement" element={<TermsAndAgreementsWrapperPage />} />
                                    <Route path="/new/company/create-profile" element={<NewCompanyPage />} />
                                    <Route
                                        path="/new/member/2"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <NewMemberPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route
                                        path="/new/2"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <OnboardingProfilePage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route
                                        path="/member/all"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <AllMembersPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route
                                        path="/company/all"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <AllCompaniesPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route path="/event/all" element={<AllEventsPage />} />
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <Dashboard />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route
                                        path="/job/new/referral"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <JobReferralPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route path="/job/:id" element={<ViewJobPage isLoading={isLoading} userDetail={user?.[0]} />} />
                                    <Route path="/company/:id" element={<ViewCompanyPage isLoading={isLoading} userDetail={user?.[0]} />} />
                                    <Route path="/job/all" element={<AllJobsPage />} />
                                    <Route
                                        path="/member/:id"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <ViewMemberProfile />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route
                                        path="/mentor/create"
                                        element={
                                            <PrivateRoutes userDetail={user?.[0]}>
                                                <NewMentorPage />
                                            </PrivateRoutes>
                                        }
                                    />
                                    <Route path="/mentor/all" element={<AllMentorsPage />} />
                                    <Route path="/policy/terms-and-conditions" element={<TermsAndConditions />} />
                                    <Route path="/policy/cookie-policy" element={<CookiePolicyPage />} />
                                    <Route path="/policy/eula" element={<EULAPage />} />
                                    <Route path="/policy/privacy-policy" element={<PrivacyPolicyPage />} />
                                </Routes>
                            </Container>
                        </BrowserRouter>
                    </StatusProvider>
                </AuthProvider>
            </ThemeProvider>
        </TbcThemeProvider>
    );
};

const container = document.getElementById('app');

createRoot(container).render(<App />);
