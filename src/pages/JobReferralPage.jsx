import * as React from 'react';
import {useEffect} from 'react';
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
import PickCompany from "../compoents/PickCompany";
import CompanyConnection from "../compoents/CompanyConnection";
import ReportType from "../compoents/ReportType";
import {useStatus} from "../providers/MsgStatusProvider";
import JobForm from "../compoents/JobDetails";
import JobReferralNotes from "../compoents/JobReferralNotes";


const steps = [
    'Company Details',
    'Job Details',
    'Your Notes',
];

export default function JobReferralPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const {setStatusType, setStatusMessage, setIsAlertOpen} = useStatus();
    const [answers, setAnswers] = React.useState({
        select_company: null,
        notes: null,
        job_title: null,
        description: null,
        url: null,
        interview_process: null,
        job_type: null,
        department: null,
        skills: null,
        on_site_remote: null,
        min_compensation: null,
        max_compensation: null,
        role: null,
        years_of_experience: null,
        location: null,
        team_size: null,
        department_size: null,
    });
    const history = useNavigate();

    useEffect(() => {

        if (activeStep === steps.length) {
            const url = `${process.env.REACT_APP_API_BASE_URL}company/new/jobs/create-referral/`;

            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(answers)
            })
                .then(response => {
                    if (!response.ok) {
                        // If not OK, throw an error to be caught in the catch block
                        return response.json().then(errorData => {
                            console.log(errorData);
                            setStatusMessage("We can't validate your request. Please try again");
                            setIsAlertOpen(true);
                            setStatusType('error');
                            handleBack()
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setStatusMessage("Your job post is in!");
                    setIsAlertOpen(true);
                    setStatusType('success');
                    history(`/job/${data.id}`);
                })
                .catch(error => {
                    console.error('There was an error submitting the data', error);
                });


        }
    }, [activeStep, history]);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                // return <JobForm answers={answers} setAnswers={setAnswers}/>;
                return <PickCompany answers={answers} setAnswers={setAnswers}/>;
            case 1:
                return <JobForm answers={answers} setAnswers={setAnswers}/>;
            case 2:
                return <JobReferralNotes answers={answers} setAnswers={setAnswers}/>;
            default:
                throw new Error('Unknown step');
        }
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
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
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
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
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                        Back
                                    </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
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
