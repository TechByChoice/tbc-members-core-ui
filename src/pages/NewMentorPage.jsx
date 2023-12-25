import * as React from 'react';
import {useNavigate} from "react-router-dom";
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
import {useStatus} from "../providers/MsgStatusProvider";
import FormMentorApplication from "../compoents/mentorship/FormMentorApplication";
import FormMentorCareer from "../compoents/mentorship/FormMentorCareer";
import FormMentorshipValues from "../compoents/mentorship/FormMentorshipValues";
import FormMentorProfile from "../compoents/mentorship/FormMentorProfile";


const steps = [
    'Commitment Level',
    'Career Questions',
    'Values',
    'Profile',
];

export default function NewMentorPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const {setStatusType, setStatusMessage, setIsAlertOpen} = useStatus();


    const [formData, setFormData] = React.useState({
        commitmentLevel: null,
        careerQuestions: null,
        values: null,
        profile: null,
    });

    const onFormDataChange = (stepIndex, newFormData) => {
        // Update the formData state with new data for the current step
        const newFormDataState = {...formData};
        switch (stepIndex) {
            case 0:
                newFormDataState.commitmentLevel = newFormData;
                break;
            case 1:
                newFormDataState.careerQuestions = newFormData;
                break;
            case 2:
                newFormDataState.values = newFormData;
                break;
            case 3:
                newFormDataState.profile = newFormData;
                break;
            default:
                break;
        }
        setFormData(newFormDataState);
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <FormMentorApplication onFormDataChange={(newData) => onFormDataChange(0, newData)}/>;
            case 1:
                return <FormMentorCareer onFormDataChange={(newData) => onFormDataChange(1, newData)}/>;
            case 2:
                return <FormMentorshipValues onFormDataChange={(newData) => onFormDataChange(2, newData)}/>;
            case 3:
                return <FormMentorProfile onFormDataChange={(newData) => onFormDataChange(3, newData)}/>;
            default:
                throw new Error('Unknown step');
        }
    };
    const saveCommitmentLevel = async (data) => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/update/support/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                    // 'credentials': 'include',
                },
                body: JSON.stringify(formData)
            });
            if (!response.status) {
                throw new Error('Network response was not ok');
            }

            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    const saveCareerQuestions = async (data) => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/update/career/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                    // 'credentials': 'include',
                },
                body: JSON.stringify(formData.careerQuestions)
            });
            if (!response.status) {
                throw new Error('Network response was not ok');
            }

            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    const saveValues = async (data) => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/update/value/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                    // 'credentials': 'include',
                },
                body: JSON.stringify(formData.values)
            });
            if (!response.status) {
                throw new Error('Network response was not ok');
            }

            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    const saveProfile = async (data) => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/update/profile/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                    // 'credentials': 'include',
                },
                body: JSON.stringify(formData.profile)
            });
            if (!response.status) {
                throw new Error('Network response was not ok');
            }

            return await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    };

    const handleNext = async () => {
        let saveResponse;
        switch (activeStep) {
            case 0:
                saveResponse = await saveCommitmentLevel(formData.commitmentLevel);
                if (saveResponse.status) {
                    // If save is successful, move to the next step
                    setActiveStep(activeStep + 1);
                } else {
                    setStatusType('error')
                    setStatusMessage(saveResponse.message)
                    setIsAlertOpen(true)
                }
                break;
            case 1:
                saveResponse = await saveCareerQuestions(formData.careerQuestions);
                if (saveResponse.status) {
                    // If save is successful, move to the next step
                    setActiveStep(activeStep + 1);
                } else {
                    setStatusType('error')
                    setStatusMessage(saveResponse.message)
                    setIsAlertOpen(true)
                }
                break;
            case 2:
                saveResponse = await saveValues(formData.values);
                if (saveResponse.status) {
                    // If save is successful, move to the next step
                    setActiveStep(activeStep + 1);
                } else {
                    setStatusType('error')
                    setStatusMessage(saveResponse.message)
                    setIsAlertOpen(true)
                }
                break;
            case 3:
                saveResponse = await saveProfile(formData.profile);
                if (saveResponse.status) {
                    // If save is successful, move to the next step
                    setActiveStep(activeStep + 1);
                } else {
                    setStatusType('error')
                    setStatusMessage(saveResponse.message)
                    setIsAlertOpen(true)
                }
                break;
            default:
                // Handle unexpected step
                console.error("Unknown step");
                return;
        }

        if (saveResponse) {
            // If save is successful, move to the next step
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            // Handle error, stay on current step
            // Show error message to user
            console.error("Save failed", saveResponse);
            // Here, show an error message to the user
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
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
                                You'll be redirected to the next phase to submit your report.
                                If you're not redirect please use this link to get to the next part.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, onFormDataChange)}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                >
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
