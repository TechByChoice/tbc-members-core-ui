import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';
import { useStatus } from './MsgStatusProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';

export const PrivateRoutes = ({ children, userDetail }) => {
    const auth = useAuth();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const statusMessage = useStatusMessage();

    useEffect(() => {
        if (auth.isAuthenticated && localStorage.getItem('token')) {
            // move user to dashboard if the user doesn't
            if (user?.[0]?.account_info?.is_member) {
                // onboarding complete
                if (!user?.[0]?.account_info?.is_member_onboarding_complete) {
                    navigate('/new/member/2', { replace: false });
                    statusMessage.info('Please completed your onboarding to join the community.');
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
