import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ProfileSettingPage from '@/pages/ProfileSettingPage';
import CompanySettingPage from '@/pages/CompanySettingPage';
import OpenDoorsSettingPage from '@/pages/OpenDoorsSettingPage';

const WrapperSettingsPage = () => {
    const { user } = useAuth();
    const accountInfo = user[0]?.account_info;

    if (!accountInfo) {
        return <p>Loading settings...</p>;
    }

    return (
        <>
            {accountInfo?.is_member && <ProfileSettingPage />}
            {accountInfo?.is_company_account && <CompanySettingPage />}
            {accountInfo?.is_open_doors && <OpenDoorsSettingPage />}
        </>
    );
};

export default WrapperSettingsPage;
