import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ProfileSettingPage from '@/pages/ProfileSettingPage';
import CompanySettingPage from '@/pages/CompanySettingPage';
import OpenDoorsSettingPage from '@/pages/OpenDoorsSettingPage';

const WrapperSettingsPage = () => {
    const { user } = useAuth();

    return (
        <>
            {user?.[0]?.account_info?.is_member && <ProfileSettingPage />}
            {user?.[0]?.account_info?.is_company_account && <CompanySettingPage />}
            {user?.[0]?.account_info?.is_open_doors && <OpenDoorsSettingPage />}
        </>
    );
};

export default WrapperSettingsPage;
