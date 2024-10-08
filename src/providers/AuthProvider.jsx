import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { routes } from '@/lib/routes';
import { useNavigate } from 'react-router-dom';
import { useStatusMessage } from '@/hooks/useStatusMessage';

const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(!!localStorage.getItem('token'));
    const [ token, setToken ] = useState(localStorage.getItem('token') || '');
    const [ user, setUser ] = useState([]);
    const [ accountDetails, setAccountDetails ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    // get user details
    const fetchUserDetails = useCallback(() => {
        if (localStorage.getItem('token')) {
            fetch(routes.api.users.getUsersDetails(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        if (data.detail === 'Invalid token.') {
                            logout();
                        }
                        setToken(data.token);
                        setUser([ data ]);
                        setAccountDetails([ data.account_info ]);
                        setIsAuthenticated(true);
                    } else {
                        setErrorMessage(data[0]);
                        setUser([]);
                        setAccountDetails([]);
                    }
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setUser([]);
            setAccountDetails([]);
        }
    }, []);

    useEffect(() => {
        fetchUserDetails();
    }, [ fetchUserDetails ]);

    const login = useCallback(
        (username, email, password, timezone) => {
            const url = import.meta.env.VITE_APP_API_BASE_URL + '/user/login/';
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    timezone,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        // Call the setToken function to store the JWT
                        localStorage.setItem('token', data.token);
                        setToken(data.token);
                        setIsAuthenticated(true);
                        setUser([ data.user_info ]);
                        setAccountDetails([ data.account_info ]);
                        // Redirect the user to the home page
                    } else {
                        setErrorMessage(data);
                        console.error(data);
                        setUser([]);
                        setAccountDetails([]);
                    }
                })
                .catch(error => {
                    // set the error message here

                    setErrorMessage(error);
                    console.error('Error:', error);
                });
            fetchUserDetails();
        },
        [ fetchUserDetails ],
    );

    const logout = useCallback(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + '/user/logout/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (!response.data) {
                // Call the setToken function to store the JWT
                setIsAuthenticated(false);
                setUser([]);
                setToken('');
                localStorage.removeItem('token');
                setIsLoading(false);
                // window.location.href = import.meta.env.VITE_APP_BASE_URL + 'login';
            } else {
                setIsLoading(false);
                setErrorMessage(response.data);
                console.error(response.data);
            }
        });
    }, [ token ]);

    return (
        <AuthContext.Provider
            value={{
                // @ts-ignore
                isAuthenticated,
                token,
                setToken,
                fetchUserDetails,
                login,
                logout,
                user,
                accountDetails,
                errorMessage,
                isLoading,
                setIsLoading,
                setErrorMessage,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

/** @returns {any} */
export const useAuth = () => {
    return useContext(AuthContext);
};
