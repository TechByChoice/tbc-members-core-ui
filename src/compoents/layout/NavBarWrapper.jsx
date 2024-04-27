import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import NavBar from '@/compoents/layout/NavBar';
import NavBarReviews from '@/compoents/layout/NavBarReviews';

export default function NavBarWrapper() {
    const { user, isAuthenticated } = useAuth();
    const userDetails = user[0];
    const isMember = user[0]?.account_info?.is_member;
    const isReviewer = user[0]?.account_info?.is_open_doors;

    console.log(isMember, isReviewer, userDetails);
    return (
        <>
            {isMember && <NavBar />}
            {isReviewer && <NavBarReviews />}
        </>
    );
}
