import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PickCompany from '../compoents/PickCompany';
import { useStatus } from '../providers/MsgStatusProvider';
import JobForm from '../compoents/JobDetails';
import JobReferralNotes from '../compoents/JobReferralNotes';
import { useStatusMessage } from '../hooks/useStatusMessage';

const steps = [
    'Company Details',
    'Job Details',
    'Your Notes' 
];

export default function JobReferralPage() {
    const [ activeStep, setActiveStep ] = React.useState(0);
    const statusMessage = useStatusMessage();

    const [ answers, setAnswers ] = React.useState({
        department: null,
        department_size: null,
        job_departments: null,
        description: null,
        interview_process: null,
        job_title: null,
        notes: null,
        job_type: null,
        job_role: null,
        job_skills: null,
        select_company: null,
        on_site_remote: null,
        skills: null,
        max_compensation: null,
        min_compensation: null,
        role: null,
        years_of_experience: null,
        location: null,
        url: null,
        team_size: null,
    });
    const [ formErrors, setFormErrors ] = React.useState({});
    const history = useNavigate();

    useEffect(() => {
        if (activeStep === steps.length) {
            const url = `${import.meta.env.VITE_APP_API_BASE_URL}company/new/jobs/create-referral/`;

            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(answers),
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            statusMessage.error("We can't validate your request. Please try again");
                            handleBack();
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    statusMessage.success('Your job post is in!');
                    history(`/job/${data.id}`);
                })
                .catch(error => {
                    console.error('There was an error submitting the data', error);
                });
        }
    }, [ activeStep, history ]);

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <PickCompany formErrors={formErrors} answers={answers} setAnswers={setAnswers} />;
            case 1:
                return <JobForm formErrors={formErrors} answers={answers} setAnswers={setAnswers} />;
            case 2:
                return <JobReferralNotes formErrors={formErrors} answers={answers} setAnswers={setAnswers} />;
            default:
                throw new Error('Unknown step');
        }
    };

    function validateJobDetails() {
        let errors = {};
        const requiredFields = [
            'job_title',
            'url',
            'role',
            'department',
            'skills',
            'external_description',
            'years_of_experience',
            'job_type',
            'on_site_remote',
        ];

        requiredFields.forEach(field => {
            if (!answers[field]) {
                errors[field] = `${field.replace('_', ' ')} is required.`;
            }
        });

        const isValid = Object.keys(errors).length === 0;
        if (!isValid) {
            setFormErrors(errors); // Save the errors into the state
        }

        return isValid; // Return true if no errors found, else false
    }

    function validateCompanyDetails() {
        let errors = {};

        if (!answers['select_company']) {
            // If select_company is not set, validate companyName and company_url
            if (!answers['company_name']) {
                errors['company_name'] = 'Company name is required.';
            }
            if (!answers['company_url']) {
                errors['company_url'] = 'Company URL is required.';
            }
        }

        const isValid = Object.keys(errors).length === 0;
        if (!isValid) {
            setFormErrors(errors); // Save the errors into the state
        }

        return isValid; // Return true if no errors found, else false
    }

    const handleNext = () => {
        // setActiveStep(activeStep + 1);
        let validationResult = { isValid: true, errorMessage: '' };
        switch (activeStep) {
            case 0: // For the BasicInfoStep
                validationResult.isValid = validateCompanyDetails();
                break;
            case 1:
                validationResult.isValid = validateJobDetails();
                break;

            default:
                validationResult.isValid = true;
                break;
        }
        if (validationResult.isValid) {
            setActiveStep(activeStep + 1);
            statusMessage.hide();
        } else {
            statusMessage.error('Please update all required fields.');
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: t => `1px solid ${t.palette.divider}`,
                }}></AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thanks for giving use these details!
                            </Typography>
                            <Typography variant="subtitle1">
                                You&apos;ll be redirected to the next phase to submit your report. If you&apos;re not redirect please use this link to get
                                to the next part.
                            </Typography>
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                Back
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Submit Details' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}
