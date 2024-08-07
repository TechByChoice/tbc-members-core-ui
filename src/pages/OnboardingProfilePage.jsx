import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IdentityQuestionsStep from '../compoents/onboarding/IdentityQuestionsStep';
import MarketingQuestionsStep from '../compoents/onboarding/MarketingQuestionsSteps';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { useAuth } from '../providers/AuthProvider';
import { routes } from '@/lib/routes';

/** @typedef {{index: number, name: string}} IStepDefinition */

const StepDefinitions = {
    /** @type {IStepDefinition} */
    Identity: {
        index: 0,
        name: 'Your Identity',
    },
    /** @type {IStepDefinition} */
    Communication: {
        index: 1,
        name: 'Communication',
    },
};

/** @type Array<IStepDefinition> */
const steps = Object.values(StepDefinitions);

export default function OnboardingProfilePage() {
    const [ activeStep, setActiveStep ] = useState(0);
    const [ answers, setAnswers ] = useState({});
    const [ formErrors, setFormErrors ] = useState({});
    const [ questions, setQuestions ] = useState(0);
    const [ isComplete, setIsComplete ] = useState(false);
    const [ completedSteps, setCompletedSteps ] = useState([]);

    const { user, fetchUserDetails } = useAuth();
    const history = useNavigate();
    const statusMessage = useStatusMessage();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleInputCheckboxChange = e => {
        const { name, value } = e.target;
        let isSet = false;
        if (value === 'on') {
            isSet = true;
        }
        setAnswers(prev => ({ ...prev, [name]: isSet }));
    };

    const handleFileChange = e => {
        if (!e) {
            return;
        }

        const { name } = e.target;
        const file = e.target.files[0];

        setAnswers(prev => ({ ...prev, [name]: file }));
    };

    const handleAutocompleteChange = (name, value) => {
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(
                item => item.pronouns || item.name || item.company_name || item.value || item.range || item.gender || item.identity || item.ethnicity || item, // the 'item' fallback is in case you have other Autocomplete instances with string values
            );
        }
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const getStepContent = useCallback(() => {
        switch (activeStep) {
            case StepDefinitions.Identity.index:
                return (
                    <IdentityQuestionsStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );

            case StepDefinitions.Communication.index:
                return (
                    <MarketingQuestionsStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );

            default:
                throw new Error('Unknown step');
        }
    }, [
        activeStep,
        formErrors,
        questions,
        answers
    ]);

    const handleNext = () => {
        const isValid = true;

        if (!isValid) {
            statusMessage.error('Please update all required fields.');
            setCompletedSteps(prev => prev.filter(step => step !== activeStep));

            return;
        }

        if (!completedSteps.includes(activeStep)) {
            setCompletedSteps(prev => [ ...prev, activeStep ]);
        }

        setActiveStep(activeStep + 1);
        statusMessage.hide();
    };

    const handleBack = () => {
        if (activeStep === 0) {
            return;
        }

        setActiveStep(activeStep - 1);
    };

    const handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData();

        for (const name in answers) {
            formData.append(name, answers[name]);
        }

        fetch(routes.api.users.updateODProfile(), {
            method: 'POST',
            credentials: 'include',
            body: formData,
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    statusMessage.success('Thank you for updating your profile!');
                    fetchUserDetails().then(() => {
                        history('/reivews');
                    });
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                statusMessage.error('We ran into an error saving your profile');
            });
        fetchUserDetails();
    };

    useEffect(() => {
        setIsComplete(activeStep === steps.length);
    }, [ activeStep ]);

    const navigate = useNavigate();

    useEffect(() => {
        // move user to dashboard if the user doesn't
        if (user[0]?.account_info?.is_open_doors_profile_complete) {
            statusMessage.info("You've completed onboarding and no longer have access to this screen.");
            navigate('/reviews', { replace: false });
        }
    }, [ user ]);

    return (
        <React.Fragment>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: t => `1px solid ${t.palette.divider}`,
                }}></AppBar>
            <Container component="main">
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map(step => (
                            <Step
                                key={step.name}
                                onClick={() => {
                                    if (completedSteps.includes(step.index) || completedSteps.includes(step.index - 1)) setActiveStep(step.index);
                                }}
                                style={{ cursor: 'pointer' }}>
                                <StepLabel>{step.name}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <form onSubmit={handleFormSubmit}>
                        {isComplete && (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thanks for letting us get to know you!
                                </Typography>
                                <Typography variant="subtitle1">
                                    Now that you&apos;re in our community, make sure you check your email to get access to our Slack group!
                                </Typography>
                            </React.Fragment>
                        )}
                        {!isComplete && (
                            <React.Fragment>
                                {getStepContent()}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={activeStep === steps.length - 1 ? handleFormSubmit : handleNext}
                                        type="button"
                                        sx={{ mt: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Submit Details' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
