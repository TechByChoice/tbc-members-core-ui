import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, CssBaseline, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';

import { useStatusMessage } from '../hooks/useStatusMessage';
import { AnswerValidator } from '../lib/AnswerValidator';
import { useAuth } from '../providers/AuthProvider';
import { routes } from '@/lib/routes';
import ProfileStep from '@/compoents/onboarding/company/ProfileStep';
import OpenRolesStep from '@/compoents/onboarding/company/OpenRolesStep';

/** @typedef {{index: number, name: string}} IStepDefinition */

const StepDefinitions = {
    /** @type {IStepDefinition} */
    Profile: {
        index: 0,
        name: 'Create Profile',
    },
    /** @type {IStepDefinition} */
    Roles: {
        index: 1,
        name: 'Open Roles',
    },
};

/** @type Array<IStepDefinition> */
const steps = Object.values(StepDefinitions);

function validateProfileStep(answers, setFormErrors) {
    let errors = {};

    // const isValid = AnswerValidator.validateMany(answers, errors, {
    //     photo: 'Please upload your profile photo.',
    //     postal_code: 'Please enter your postal code.',
    //     years_of_experience: "Please specify how long you've been on your tech journey.",
    //     job_roles: 'Please specify titles that best fit you.',
    // });

    // setFormErrors(errors);
    //
    // return isValid;
    return true;
}

function validateRolesStep(answers, setFormErrors) {
    let errors = {};

    let isValid = AnswerValidator.validateMany(answers, errors, {
        talent_status: 'Talent profile status required.',
        job_skills: 'Job skills are required.',
        job_department: 'Job department is required.',
    });
    // Additional check for job_skills length
    if (answers.job_skills && answers.job_skills.length > 5) {
        errors.job_skills = 'You can only add up to 5 skills.';
        // Mark the form as invalid if too many job_skills are added
        isValid = false; // If you want the overall form validation to fail in this case
    }

    setFormErrors(errors);

    return isValid && Object.keys(errors).length === 0;
}

const validationFunctionMap = {
    [StepDefinitions.Profile.index]: validateProfileStep,
    [StepDefinitions.Roles.index]: validateRolesStep,
    default: (...args) => true,
};

export default function NewCompanyPage() {
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
    const handleEditorUpdate = (editorId, content) => {
        const newFormData = { ...answers, [editorId]: content };
        setAnswers(newFormData);
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
                item =>
                    item.pronouns || item.name || item.company_name || item.value || item.range || item.gender || item.identity || item.ethnicity || item, // the 'item' fallback is in case you have other Autocomplete instances with string values
            );
        }
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const getStepContent = useCallback(() => {
        switch (activeStep) {
            case StepDefinitions.Profile.index:
                return (
                    <ProfileStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        handleEditorUpdate={handleEditorUpdate}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );

            case StepDefinitions.Roles.index:
                return (
                    <OpenRolesStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
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
        const isValid = (validationFunctionMap[activeStep] ?? validationFunctionMap.default)(answers, setFormErrors);

        if (!isValid) {
            statusMessage.error('Please update all required fields.');
            setCompletedSteps(prev => prev.filter(step => step !== activeStep));

            return;
        }

        if (!completedSteps.includes(activeStep)) {
            setCompletedSteps(prev => [ ...prev, activeStep ]);
        }

        setActiveStep(activeStep + 1);
        console.log(activeStep, 'handleNext');
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

        fetch(routes.api.users.updateProfile(), {
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
                // Handle the successful JSON response here, e.g.:
                statusMessage.success("You're in!");
                // history('/dashboard');
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
        if (user[0]?.account_info?.is_member_onboarding_complete) {
            statusMessage.info("You've completed onboarding and no longer have access to this screen.");
            navigate('/dashboard', { replace: false });
        }
    }, [ user ]);

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
                                    Now that you&apos;re in our community, make sure you check your eamil to get access to our Slack group!
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
                                        onClick={activeStep === steps.length - 1 ? null : handleNext}
                                        type={activeStep === steps.length - 1 ? 'submit' : 'button'}
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
