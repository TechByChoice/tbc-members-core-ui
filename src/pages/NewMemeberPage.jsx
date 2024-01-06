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
import { useStatus } from '../providers/MsgStatusProvider';
import BasicInfo from '../compoents/onboarding/BasicInfo';
import SkillsQuestionStep from '../compoents/onboarding/SkillsQuestionStep';
import IdentityQuestionsStep from '../compoents/onboarding/IdentityQuestionsStep';
import CommunityQuestionsStep from '../compoents/onboarding/CommunityQuestionsStep';
import MarketingQuestionsStep from '../compoents/onboarding/MarketingQuestionsSteps';
import getCookie from '../helpers';
import { useAuth } from '../providers/AuthProvider';

const steps = [
    'Basic Info',
    'Skills & Experiences',
    'You Identity',
    'Support Needed',
    'Communication'
];

export default function NewMemberPage() {
    const [ activeStep, setActiveStep ] = React.useState(0);
    const [ questions, setQuestions ] = React.useState(0);
    const { setStatusType, setStatusMessage, setIsAlertOpen } = useStatus();
    const [ answers, setAnswers ] = React.useState({});
    const [ formErrors, setFormErrors ] = React.useState({});

    const history = useNavigate();
    const { token, logout } = useAuth();
    useEffect(() => {}, [ answers ]);

    useEffect(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/details/new-member';
        fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
                // 'credentials': 'include'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setQuestions(data);
                    if (data.detail === 'Invalid token.') {
                        logout();
                    }
                } else {
                    console.error(data);
                }
            });
    }, []);

    function validateBasicInfo() {
        let errors = {};

        // Check photo
        if (!answers.photo) {
            errors.photo = 'Please upload your profile photo.';
        }

        // Check postal code
        if (!answers.postal_code) {
            errors.postal_code = 'Please enter your postal code.';
        }

        // Check tech journey
        if (!answers.tech_journey || answers.tech_journey.length === 0) {
            errors.tech_journey = "Please specify how long you've been on your tech journey.";
        }

        // Check tech journey
        if (!answers.job_roles || answers.job_roles.length === 0) {
            errors.job_roles = 'Please specify titles that best fit you.';
        }
        const isValid = Object.keys(errors).length === 0;
        if (!isValid) {
            setFormErrors(errors); // Save the errors into the state
        }

        return isValid; // Return true if no errors found, else false
    }

    function validateSkillsQuestionStep() {
        let errors = {};

        // Validate talent_status
        if (!answers.talent_status || answers.talent_status.length === 0) {
            errors.talent_status = 'Job skills are required.';
        }

        // Validate job_department
        if (!answers.job_department || answers.job_department.length === 0) {
            errors.job_department = 'Job department is required.';
        }

        const isValid = Object.keys(errors).length === 0;
        if (!isValid) {
            setFormErrors(errors); // Save the errors into the state
        }
        console.log(errors);

        return isValid;
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        if (e) {
            const { name } = e.target;
            const file = e.target.files[0];
            setAnswers(prev => ({ ...prev, [name]: file }));
        }
    };

    const handleAutocompleteChange = (name, value) => {
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(
                item => item.pronouns || item.name || item.range || item.gender || item.identity || item.ethnicity || item, // the 'item' fallback is in case you have other Autocomplete instances with string values
            );
        }
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
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
            case 1:
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
            case 2:
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
            case 3:
                return (
                    <CommunityQuestionsStep
                        formErrors={formErrors}
                        handleAutocompleteChange={handleAutocompleteChange}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        questions={questions}
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                );
            case 4:
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
    };

    const handleNext = () => {
        let validationResult = { isValid: true, errorMessage: '' };
        switch (activeStep) {
            case 0: // For the BasicInfoStep
                validationResult.isValid = validateBasicInfo();
                break;
            case 1:
                validationResult.isValid = validateSkillsQuestionStep();
                break;
            default:
                break;
        }
        if (validationResult.isValid) {
            setActiveStep(activeStep + 1);
            setStatusType('');
            setStatusMessage();
            setIsAlertOpen(false);
        } else {
            setStatusType('error');
            setStatusMessage('Please update all required fields.');
            setIsAlertOpen(true);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_APP_API_BASE_URL}user/new-member/profile/create`;

        const formData = new FormData();

        for (const name in answers) {
            formData.append(name, answers[name]);
        }

        fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
            headers: { Authorization: `Token ${token}` },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful JSON response here, e.g.:
                setStatusMessage("You're in!");
                setIsAlertOpen(true);
                setStatusType('success');
                history('/');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setStatusMessage('We ran into an error saving your profile');
                setIsAlertOpen(true);
                setStatusType('error');
            });
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
            <Container component="main">
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((step, index) => (
                            <Step key={step} onClick={() => setActiveStep(index)} style={{ cursor: 'pointer' }}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <form onSubmit={handleFormSubmit}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thanks for letting us get to know you!
                                </Typography>
                                <Typography variant="subtitle1">
                                    Now that you&apos;re in our community, make sure you check your eamil to get access to our Slack group!
                                </Typography>
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
