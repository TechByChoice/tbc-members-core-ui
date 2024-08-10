import React, {useCallback, useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from './AuthProvider';
import {useStatusMessage} from '@/hooks/useStatusMessage';
import LoadingScreen from "@/compoents/LoadingScreen";

/**
 * PrivateRoutes component for handling authenticated and authorized access to routes.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {Object} props.userDetail - User details
 * @param {boolean} props.isStaff - Whether the route requires staff access
 */
export const PrivateRoutes = ({children, userDetail, isStaff = false}) => {
    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const statusMessage = useStatusMessage();

    const redirectUser = useCallback((path, message) => {
        navigate(path, {replace: true});
        if (message) statusMessage.info(message);
    }, [navigate, statusMessage]);

    const checkUserStatus = useCallback(() => {
        if (!isAuthenticated || !user?.[0]) return;

        const {account_info: userAccountInfo, company_account_data} = user[0];

        if (userAccountInfo?.is_member && !userAccountInfo?.is_member_onboarding_complete) {
            redirectUser('/new/member/2', 'Please complete your onboarding to join the community.');
            return;
        }

        if (userAccountInfo?.is_company_account && !userAccountInfo?.is_company_onboarding_complete) {
            if (!userAccountInfo?.is_email_confirmed) {
                redirectUser('/new/check-email');
                return;
            }

            const companyAccountData = company_account_data?.company_account;
            if (!companyAccountData?.is_confirm_service_agreement && userAccountInfo?.is_email_confirmed) {
                redirectUser('/new/confirm-agreement');
                return;
            }

            redirectUser('/new/company/create-profile', 'Please complete your onboarding to activate your account.');
            return;
        }

        if (isStaff && !userAccountInfo?.is_staff) {
            redirectUser('/dashboard', '👀 Should you really be hitting this URL?');
            return;
        }

        setIsLoading(false);
    }, [isAuthenticated, user, isStaff, redirectUser]);

    useEffect(() => {
        checkUserStatus();
    }, [checkUserStatus, location.pathname]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    if (isLoading) {
        return <LoadingScreen/>;
    }

    return children;
};
