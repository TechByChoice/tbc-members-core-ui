import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Route, useNavigate } from 'react-router';
import { useStatus } from './MsgStatusProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import CheckEmailPage from '@/pages/CheckEmailPage';
import ConfirmAccountPage from '@/pages/onboarding/company/ConfirmAccountPage';
import ConfirmAgreementPage from '@/pages/onboarding/company/ConfirmAgreementPage';
import NewCompanyPage from '@/pages/NewCompanyPage';

export const PrivateRoutes = ({ children, userDetail }) => {
    const auth = useAuth();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const statusMessage = useStatusMessage();

    useEffect(() => {
        const userAccountInfo = user?.[0]?.account_info;
        if (auth.isAuthenticated && localStorage.getItem('token')) {
            // move user to dashboard if the user doesn't
            if (userAccountInfo?.is_member) {
                // onboarding complete
                if (!userAccountInfo?.is_member_onboarding_complete) {
                    navigate('/new/member/2', { replace: false });
                    statusMessage.info('Please completed your onboarding to join the community.');
                }
            }

            if (userAccountInfo?.is_company_account && !userAccountInfo?.is_company_onboarding_complete) {
                if (!userAccountInfo?.is_company_onboarding_complete) {
                    const companyAccountData = user?.[0]?.company_account_data?.company_account;
                    if (!userAccountInfo?.is_email_confirmed) {
                        return navigate('/new/check-email', { replace: false });
                    }
                    if (!companyAccountData?.is_confirm_service_agreement && userAccountInfo?.is_email_confirmed) {
                        return navigate('/new/confirm-agreement', { replace: false });
                    }
                    navigate('/new/company/create-profile', { replace: false });
                    statusMessage.info('Please completed your onboarding to activate your account.');
                }
            }
        }
    }, [
        auth.isAuthenticated,
        userDetail,
        navigate,
        isLoading,
        location.pathname
    ]);

    // if (isLoading) {
    //     // This is where you might render a spinner or some loading text
    //     return <div>Loading...</div>;
    // }

    if (!auth.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};
