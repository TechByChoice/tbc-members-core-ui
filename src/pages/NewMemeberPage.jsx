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
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../compoents/onboarding/BasicInfo';
import CommunityQuestionsStep from '../compoents/onboarding/CommunityQuestionsStep';
import IdentityQuestionsStep from '../compoents/onboarding/IdentityQuestionsStep';
import MarketingQuestionsStep from '../compoents/onboarding/MarketingQuestionsSteps';
import SkillsQuestionStep from '../compoents/onboarding/SkillsQuestionStep';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { AnswerValidator } from '../lib/AnswerValidator';
import { useAuth } from '../providers/AuthProvider';
import { routes } from '@/lib/routes';
import LoadingScreen from '@/compoents/LoadingScreen';
import { MobileStepper, useMediaQuery, useTheme } from '@mui/material';

/** @typedef {{index: number, name: string}} IStepDefinition */

const StepDefinitions = {
    /** @type {IStepDefinition} */
    BasicInfo: {
        index: 0,
        name: 'Basic Info',
    },
    /** @type {IStepDefinition} */
    Skills: {
        index: 1,
        name: 'Skills & Experiences',
    },
    /** @type {IStepDefinition} */
    Identity: {
        index: 2,
        name: 'Your Identity',
    },
    /** @type {IStepDefinition} */
    Community: {
        index: 3,
        name: 'Support Needed',
    },
    /** @type {IStepDefinition} */
    Communication: {
        index: 4,
        name: 'Communication',
    },
};

/** @type Array<IStepDefinition> */
const steps = Object.values(StepDefinitions);

function validateBasicInfo(answers, setFormErrors) {
    let errors = {};

    const isValid = AnswerValidator.validateMany(answers, errors, {
        photo: 'Please upload your profile photo.',
        postal_code: 'Please enter your postal code.',
        years_of_experience: "Please specify how long you've been on your tech journey.",
        job_roles: 'Please specify titles that best fit you.',
    });

    setFormErrors(errors);

    return isValid;
}

function validateSkillsQuestionStep(answers, setFormErrors) {
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

function validateSupportNeedsStep(answers, setFormErrors) {
    let errors = {};

    let isValid = AnswerValidator.validateMany(answers, errors, {
        tbc_program_interest: 'Your current interest is required.',
        how_connection_made: 'How you found us is required.',
        job_department: 'Job department is required.',
    });
    // Additional check for job_skills length
    if (answers.job_skills && answers.job_skills.length > 5) {
        errors.job_skills = 'You can only add up to 5 skills.';
    }

    setFormErrors(errors);

    return isValid && Object.keys(errors).length === 0;
}

const validationFunctionMap = {
    [StepDefinitions.BasicInfo.index]: validateBasicInfo,
    [StepDefinitions.Skills.index]: validateSkillsQuestionStep,
    [StepDefinitions.Community.index]: validateSupportNeedsStep,
    default: (...args) => true,
};

export default function NewMemberPage() {
    const [ activeStep, setActiveStep ] = useState(0);
    const [ answers, setAnswers ] = useState({});
    const [ formErrors, setFormErrors ] = useState({});
    const [ questions, setQuestions ] = useState(0);
    const [ isComplete, setIsComplete ] = useState(false);
    const [ completedSteps, setCompletedSteps ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
            case StepDefinitions.BasicInfo.index:
                return (
                    <BasicInfo
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );

            case StepDefinitions.Skills.index:
                return (
                    <SkillsQuestionStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );

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

            case StepDefinitions.Community.index:
                return (
                    <CommunityQuestionsStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleInputCheckboxChange={handleInputCheckboxChange}
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
        setIsLoading(true);

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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    // Handle successful response
                    statusMessage.success("You're in!");
                    setIsLoading(false);
                    history('/dashboard');
                    fetchUserDetails().then(() => {});
                } else {
                    // Handle unsuccessful response
                    // eslint-disable-next-line no-constant-condition
                    if (data.message === 'Member has already been created for this user.' || 'User, MemberProfile, and UserProfile created successfully!') {
                        statusMessage.success("You've already completed onboarding!");
                        setIsLoading(false);
                        history('/dashboard');
                    } else {
                        console.error('Fetch error:', data);
                        statusMessage.error(data.message || 'We ran into an error saving your profile');
                        setIsLoading(false);
                    }
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                statusMessage.error('An unexpected error occurred');
                setIsLoading(false);
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
            {isLoading && <LoadingScreen />}
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
                    {isMobile ? (
                        <Box sx={{ pt: 3, pb: 5 }}>
                            <MobileStepper
                                variant="progress"
                                steps={steps.length}
                                position="static"
                                activeStep={activeStep}
                                sx={{ maxWidth: 400, flexGrow: 1 }}
                                backButton={false}
                                nextButton={false}
                            />
                        </Box>
                    ) : (
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
                    )}
                    <form>
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
                                        disabled={isLoading}
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
