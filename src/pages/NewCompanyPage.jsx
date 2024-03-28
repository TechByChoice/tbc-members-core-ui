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

    const isValid = AnswerValidator.validateMany(answers, errors, {
        logo: 'Please upload the company logo.',
        location: 'Please enter your postal code.',
        mission: 'Please add the companies mission.',
        company_size: 'Please specify company size.',
        industries: 'Please specify company industries.',
        website: 'Please specify company website.',
    });

    setFormErrors(errors);

    return isValid;
    // return true;
}

function validateRolesStep(answers, setFormErrors) {
    let errors = {};

    let isValid = AnswerValidator.validateMany(answers, errors, {
        job_roles: 'Open roles are required.',
        on_site_remote: 'Job work environment required.',
    });

    if (answers.on_site_remote === 'On-site' || answers.on_site_remote === 'Hybrid') {
        if (!answers.open_role_location) {
            errors.open_role_location = 'Open role location is required for on-site or hybrid roles.';
            isValid = false;
        }
    }
    if (answers.on_site_remote === 'Remote' || answers.on_site_remote === 'unknown') {
        // If on_site_remote is 'remote', ensure open_role_location error is cleared if it exists
        if (errors.open_role_location) {
            delete errors.open_role_location;
            isValid = Object.keys(errors).length === 0;
        }
    }

    setFormErrors(errors);

    return isValid;
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

    const handleNext = async () => {
        const validationFunctions = [ validateProfileStep, validateRolesStep ];
        const currentValidationFunction = validationFunctions[activeStep] ?? validationFunctionMap.default;
        const isValid = currentValidationFunction(answers, setFormErrors);

        if (isValid) {
            if (activeStep + 1 < steps.length) {
                // setActiveStep((prevActiveStep) => prevActiveStep + 1);
                // Not the last step, proceed to the next step
                try {
                    const update = await handleProfileFormSubmit(); // Assume this function returns a truthy value if successful
                    if (!update) {
                        // Handle the case where AJAX call was not successful
                        // Maybe set an error message or log
                        statusMessage.error('We ran into an issue, please try again.');
                        console.error('Failed to update profile.');
                    }
                } catch (error) {
                    // Handle any errors that occurred during the AJAX call
                    console.error('Error submitting form:', error);
                }
            } else {
                // Last step, perform form submission
                try {
                    const update_roles = await handleOpenRolesFormSubmit();
                    if (!update_roles) {
                        statusMessage.error('We ran into an issue, please try again.');
                        console.error('Failed to update profile.');
                    }
                } catch (error) {
                    // Handle any errors that occurred during the AJAX call
                    console.error('Error submitting form:', error);
                }
            }
        } else {
            statusMessage.error('Please correct the errors before proceeding.');
        }
    };

    const handleBack = () => {
        if (activeStep === 0) {
            return;
        }

        setActiveStep(activeStep - 1);
    };

    const handleOpenRolesFormSubmit = async () => {
        // e.preventDefault();

        // Reset form errors before validation
        setFormErrors({});

        // Validate each step. Adjust the parameters as necessary to match your actual state structure and validation needs.
        const isProfileValid = validateProfileStep(answers, setFormErrors);
        const isRolesValid = validateRolesStep(answers, setFormErrors);

        if (isProfileValid && isRolesValid) {
            const formData = new FormData();

            for (const name in answers) {
                formData.append(name, answers[name]);
            }

            fetch(routes.api.companies.createOnboardingOpenRoles(), {
                method: 'POST',
                // credentials: 'include',
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
        }
    };

    const handleProfileFormSubmit = async () => {
        // e.preventDefault();

        // Reset form errors before validation
        setFormErrors({});

        // Validate each step. Adjust the parameters as necessary to match your actual state structure and validation needs.
        const isProfileValid = validateProfileStep(answers, setFormErrors);

        if (isProfileValid) {
            const formData = new FormData();

            for (const name in answers) {
                formData.append(name, answers[name]);
            }

            fetch(routes.api.companies.createOnboardingProfile(), {
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
                    statusMessage.success('Your profile has been created!');
                    setAnswers(prev => ({ ...prev, companyId: data.companyId }));
                    setActiveStep(prevActiveStep => prevActiveStep + 1);
                    // history('/dashboard');
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    statusMessage.error('We ran into an error saving your profile');
                });
            return true;
            // fetchUserDetails();
        } else {
            return false;
        }
    };

    useEffect(() => {
        setIsComplete(activeStep === steps.length);
    }, [ activeStep ]);

    const navigate = useNavigate();

    // useEffect(() => {
    //     // move user to dashboard if the user doesn't
    //     if (user[0]?.account_info?.is_member_onboarding_complete) {
    //         statusMessage.info("You've completed onboarding and no longer have access to this screen.");
    //         navigate('/dashboard', { replace: false });
    //     }
    // }, [ user ]);

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
                    <form>
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

                                    {activeStep < steps.length - 1 ? (
                                        <Button variant="contained" onClick={handleNext} type="button" sx={{ mt: 3, ml: 1 }}>
                                            Next
                                        </Button>
                                    ) : (
                                        <Button variant="contained" onClick={handleNext} type="button" sx={{ mt: 3, ml: 1 }}>
                                            Submit Details
                                        </Button>
                                    )}
                                </Box>
                            </React.Fragment>
                        )}
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
