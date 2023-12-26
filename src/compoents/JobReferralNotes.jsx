import React from 'react';
import { Container, TextField } from '@mui/material';

const JobReferralNotes = ({ answers, setAnswers }) => {
    // Replace with your state and methods to handle form submission and changes
    const handelChange = event => {
        const { name, value } = event.target;
        setAnswers(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    return (
        <Container maxWidth="md">
            <form autoComplete="off">
                <TextField
                    onChange={handelChange}
                    fullWidth
                    name="referral_note"
                    label="Referral Notes"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
            </form>
        </Container>
    );
};

export default JobReferralNotes;
