import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import FormMentorApplication from '../compoents/mentorship/FormMentorApplication';
import FormMentorCareer from '../compoents/mentorship/FormMentorCareer';
import FormMentorProfile from '../compoents/mentorship/FormMentorProfile';
import FormMentorshipValues from '../compoents/mentorship/FormMentorshipValues';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { routes } from '@/lib/routes';

const steps = [
    'Commitment Level',
    'Career Questions',
    'Values',
    'Profile'
];

const STEP_COMMITMENT_LEVEL = 0;
const STEP_CAREER_QUESTIONS = 1;
const STEP_VALUES = 2;
const STEP_PROFILE = 3;

/**
 * Validate the given step index, optionally throwing an error if the step is invalid,
 * otherwise just logging an error. "Validate" in this context means that the step index
 * is within the bounds of the steps array.
 *
 * @param {number} index The step index to validate
 * @param {boolean} shouldThrow Whether or not to throw an error if the step is invalid
 * @returns {boolean} Whether or not the step is valid
 */
const validateStepIndex = (index, shouldThrow = true) => {
    if (index >= 0 && index < steps.length) {
        return true;
    }

    if (shouldThrow) {
        throw new Error('Unknown step');
    }

    console.error('Unknown step');
    return false;
};

const CompletedStepsContent = () => (
    <>
        <Typography variant="h5" gutterBottom>
            Thanks for giving use these details!
        </Typography>
        <Typography variant="subtitle1">
            You&apos;ll be redirected to the next phase to submit your report. If you&apos;re not redirect please use this link to get to the next part.
        </Typography>
    </>
);

const NextBackButtons = ({ activeStep, handleBack, handleNext }) => (
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
);

export default function NewMentorPage() {
    const [ hasCompleted, setHasCompleted ] = React.useState(false);
    const [ activeStep, setActiveStep ] = React.useState(0);
    const statusMessage = useStatusMessage();

    const [ formData, setFormData ] = React.useState({
        commitmentLevel: null,
        careerQuestions: null,
        values: null,
        profile: null,
    });

    // Update the formData state with new data for the current step
    const onFormDataChange = (stepIndex, newFormData) => {
        validateStepIndex(stepIndex);

        const newFormDataState = { ...formData };
        const keyMap = {
            [STEP_COMMITMENT_LEVEL]: 'commitmentLevel',
            [STEP_CAREER_QUESTIONS]: 'careerQuestions',
            [STEP_VALUES]: 'values',
            [STEP_PROFILE]: 'profile',
        };

        newFormDataState[keyMap[stepIndex]] = newFormData;

        setFormData(newFormDataState);
    };

    // return the correct component for the given step
    const getStepContent = stepIndex => {
        validateStepIndex(stepIndex);

        const contentMap = {
            [STEP_COMMITMENT_LEVEL]: () => (
                <FormMentorApplication
                    setFormData={setFormData}
                    formData={formData}
                    defaultValues={null}
                    onFormDataChange={newData => onFormDataChange(STEP_COMMITMENT_LEVEL, newData)}
                />
            ),
            [STEP_CAREER_QUESTIONS]: () => <FormMentorCareer onFormDataChange={newData => onFormDataChange(STEP_CAREER_QUESTIONS, newData)} />,
            [STEP_VALUES]: () => <FormMentorshipValues onFormDataChange={newData => onFormDataChange(STEP_VALUES, newData)} />,
            [STEP_PROFILE]: () => <FormMentorProfile questions={null} defaultData={null} setFormData={setFormData} formData={formData} formErrors={null} />,
        };

        return contentMap[stepIndex]();
    };

    const handleNext = async () => {
        if (!validateStepIndex(activeStep, false)) {
            return;
        }

        const saveStepToEndpoint = async (url, data) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem('token')}`,
                        // 'credentials': 'include',
                    },
                    body: JSON.stringify(data),
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

        const saveStepHandlerMap = {
            [STEP_COMMITMENT_LEVEL]: async () => await saveStepToEndpoint(routes.api.mentors.signup.commitmentLevel(), formData.commitmentLevel),
            [STEP_CAREER_QUESTIONS]: async () => await saveStepToEndpoint(routes.api.mentors.signup.career(), formData.careerQuestions),
            [STEP_VALUES]: async () => await saveStepToEndpoint(routes.api.mentors.signup.values(), formData.values),
            [STEP_PROFILE]: async () => await saveStepToEndpoint(routes.api.mentors.signup.profile(), formData.profile),
        };

        const saveStep = saveStepHandlerMap[activeStep];

        try {
            const saveResponse = await saveStep();

            if (saveResponse.status) {
                // If save is successful, move to the next step
                setActiveStep(activeStep + 1);
            }
        } catch (error) {
            statusMessage.error(error.message);
            console.error('Save failed');
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    React.useEffect(() => {
        setHasCompleted(activeStep >= steps.length);
    }, [ activeStep ]);

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
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {hasCompleted && <CompletedStepsContent />}
                    {!hasCompleted && (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <NextBackButtons activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}
