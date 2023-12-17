import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "./AuthProvider";
import {useNavigate} from "react-router";
import {useStatus} from "./MsgStatusProvider";

export const PrivateRoutes = ({children, userDetail}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const {setStatusMessage, setStatusType, setIsAlertOpen} = useStatus();
    // Run the useEffect only once when the component mounts
    useEffect(() => {
        if (userDetail !== undefined) {
            setIsLoading(false);  // stop the loading status
        }
    }, [userDetail]);

    useEffect(() => {

        if (!isLoading && auth.isAuthenticated && localStorage.getItem('token')) {
            // if(userDetail.userprofile.subscription_status !== 'succeeded' && location.pathname === '/profile'){
            //   setStatusMessage("We're missing the money");
            //   setIsAlertOpen(true);
            //   setStatusType('error'); // or 'error' or 'info'
            // }
            // if (userDetail.userprofile.subscription_status !== 'succeeded' && location.pathname !== '/profile') {
            //   navigate('/profile', { state: { from: location } });
            //   setStatusMessage("We're missing the money");
            //   setIsAlertOpen(true);
            //   setStatusType('error'); // or 'error' or 'info'
            // }
            // else if (auth.isAuthenticated && localStorage.getItem('token')) {
            //     if (location.state && location.state.from) {
            //       navigate(location.state.from.pathname);
            //     }
            //   console.log('we made it')
            //   }
        }
    }, [auth.isAuthenticated, userDetail, navigate, isLoading, location.pathname]);

    // if (isLoading) {
    //     // This is where you might render a spinner or some loading text
    //     return <div>Loading...</div>;
    // }

    if (!auth.isAuthenticated) {
        return <Navigate to='/login'/>;
    }
    return children
};
