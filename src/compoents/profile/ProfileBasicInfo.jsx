import { Button, FormControl, FormLabel, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';
import AccountDetailsForm from './AccountDetailsForm';
import WorkPlaceForm from './WorkPlaceForm';
import SocialMediaForm from './SocialMediaForm';

export default function ProfileBasicInfo({ handleChange, questions, formErrors }) {
    const { user } = useAuth();
    const userDetails = user[0];
    const {
        statusType, setStatusMessage, setIsAlertOpen, setStatusType 
    } = useStatus();

    function handleSave() {
        console.log('saved');
    }

    return (
        <Grid container>
            <>
                <AccountDetailsForm />
            </>
            {!userDetails?.is_company_account && (
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
