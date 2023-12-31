import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(!!localStorage.getItem('token'));
    const [ token, setToken ] = useState(localStorage.getItem('token') || '');
    const [ user, setUser ] = useState([]);
    const [ accountDetails, setAccountDetails ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    // get user details
    useEffect(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/details/';
        console.log('Before fetch call', url);
        if (localStorage.getItem('token')) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        console.log(data, 'data');
                        setUser([ data ]);
                        setAccountDetails([ data.account_info ]);
                        if (data.detail === 'Invalid token.') {
                            logout();
                        }
                    } else {
                        setErrorMessage(data[0]);
                        console.error(data);
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

    const login = useCallback((username, email, password, timezone) => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/login/';
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
    }, []);

    const logout = useCallback(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'logout/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        }).then(response => {
            console.log(response.data);
            if (!response.data) {
                // Call the setToken function to store the JWT
                setIsAuthenticated(false);
                setUser([]);
                setToken('');
                localStorage.removeItem('token');
                window.location.href = import.meta.env.VITE_APP_BASE_URL + 'login';
            } else {
                setErrorMessage(response.data);
                console.error(response.data);
            }
        });
    }, [ token ]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                setToken,
                login,
                logout,
                user,
                accountDetails,
                errorMessage,
                isLoading,
                setErrorMessage,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
