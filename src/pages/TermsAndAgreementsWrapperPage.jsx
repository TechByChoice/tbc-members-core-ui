import React, { Suspense } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ConfirmAgreementPage from '@/pages/onboarding/company/ConfirmAgreementPage';
import ConfirmOpenDoorsAgreementPage from '@/pages/onboarding/ConfirmOpenDoorsAgreementPage';
export default function TermsAndAgreementsWrapperPage() {
    const { user } = useAuth();
    const isMember = user?.[0]?.account_info?.is_member;
    const isReview = user?.[0]?.account_info?.is_open_doors;
    const isCompany = user?.[0]?.account_info?.is_company_account;

    return (
        <>
            {isCompany && <ConfirmAgreementPage />}
            {isReview && <ConfirmOpenDoorsAgreementPage />}
        </>
    );
}
