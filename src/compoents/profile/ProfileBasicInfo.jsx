import { Grid } from '@mui/material';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import AccountDetailsForm from './AccountDetailsForm';
import WorkPlaceForm from './WorkPlaceForm';
import SocialMediaForm from './SocialMediaForm';

export default function ProfileBasicInfo({ handleChange, questions, formErrors }) {
    const { user } = useAuth();
    const userDetails = user[0];

    function handleSave() {
        console.log('saved');
    }

    return (
        <Grid container>
            <>
                <AccountDetailsForm />
            </>
            {!userDetails?.account_info?.is_company_account && !userDetails?.account_info?.is_open_doors && (
                <>
                    <>
                        <WorkPlaceForm questions={questions} />
                    </>
                    <>
                        <SocialMediaForm />
                    </>
                </>
            )}
        </Grid>
    );
}
