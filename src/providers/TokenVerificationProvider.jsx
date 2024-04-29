import React, { useState, useEffect, useContext, createContext } from 'react';
import { useStatus } from './MsgStatusProvider';
import { isValidToken as checkTokenValidity } from '../helpers';
import { routes } from '@/lib/routes';

const TokenContext = createContext(null);

export const TokenVerificationProvider = ({ children }) => {
    const [ tokenStatus, setTokenStatus ] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const {
        setStatusMessage, setStatusType, setIsAlertOpen, isAlertOpen 
    } = useStatus();

    const pathSegments = window.location.pathname.split('/');
    const urlToken = pathSegments[pathSegments.length - 1];
    const isValidToken = checkTokenValidity(urlToken);

    const verifyTokenCall = fetchUrl => {
        fetch(fetchUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data.key) {
                    setTokenStatus(true);
                    localStorage.setItem('token', data.key);
                    setToken(data.key);
                    window.location.href = import.meta.env.VITE_APP_BASE_URL + 'reviews';
                } else {
                    setStatusMessage("We can't validate your request");
                    setIsAlertOpen(true);
                    setStatusType('error');

                    setTokenStatus(false);
                    localStorage.removeItem('token');
                }

                setLoading(false);
            })
            .catch(error => {
                console.error('Error verifying token:', error);
                setStatusMessage("We can't validate your request");
                setIsAlertOpen(true);
                setStatusType('error');
                setLoading(false);
                setTokenStatus(false);
                localStorage.removeItem('token');
            });
    };

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        const localReviewSaved = localStorage.getItem('current_report');

        if (localToken) {
            //  check if the token is still valid
            console.info('found token need to check if active');

            fetch(routes.api.auth.checkToken(localToken), {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        //  check if token is valid
                        setTokenStatus(true);
                        setLoading(false);
                        setToken(localToken);
                    }

                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                    setStatusMessage("We can't validate your request");
                    setIsAlertOpen(true);
                    setStatusType('error');
                    setLoading(false);
                    setTokenStatus(false);
                    localStorage.removeItem('token');
                    console.error('found token need not active');
                });
        } else {
            if (isValidToken) {
                verifyTokenCall(routes.api.auth.verifyToken(urlToken));
            } else {
                setLoading(false);
            }
        }
    }, []);

    // This effect handles the redirection
    useEffect(() => {
        const localReviewSaved = localStorage.getItem('current_report');
        if (isValidToken) {
            if (tokenStatus) {
                if (localReviewSaved) {
                    window.location.href = import.meta.env.VITE_APP_BASE_URL + 'questions';
                } else {
                    window.location.href = import.meta.env.VITE_APP_BASE_URL + 'reviews';
                }
            }
        }
    }, [ tokenStatus ]);

    return <TokenContext.Provider value={{ tokenStatus, loading }}>{children}</TokenContext.Provider>;
};

export const useTokenVer = () => {
    return useContext(TokenContext);
};
