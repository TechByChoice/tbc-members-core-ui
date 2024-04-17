import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';
import { useStatus } from './MsgStatusProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';

export const RedirectedRoutes = ({ children, userDetail }) => {
    const auth = useAuth();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const statusMessage = useStatusMessage();
    // Run the useEffect only once when the component mounts
    useEffect(() => {
        if (userDetail !== undefined) {
            setIsLoading(false); // stop the loading status
        }
    }, [ userDetail ]);

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
    }, []);

    return children;
};
