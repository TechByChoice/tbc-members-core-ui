import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ProfileSettingPage from '@/pages/ProfileSettingPage';

const WrapperSettingsPage = () => {
    const { user } = useAuth();

    return (
        <>
            {user?.[0]?.account_info?.is_member && <ProfileSettingPage></ProfileSettingPage>}
            {user?.[0]?.account_info?.is_open_doors && <ProfileSettingPage></ProfileSettingPage>}
        </>
    );
};

export default WrapperSettingsPage;
