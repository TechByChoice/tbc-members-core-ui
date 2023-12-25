import React, {useState, useEffect} from "react";
import {
    FormControl,
    TextField,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography, Button, Autocomplete
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import FormLabel from "@mui/material/FormLabel";
import {createFilterOptions} from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileButtonWrapper = styled('div')({
    paddingTop: '32px',
});

const FileButtonLabel = styled('Typography')({
    position: 'absolute',
    top: '0px',
});

function QuestionStep({questions, activeStep, answers: parentAnswers, setAnswers: setParentAnswers}) {
    const [showCustomCompanyInputs, setShowCustomCompanyInputs] = useState(false);
    const [localAnswers, setLocalAnswers] = useState(parentAnswers || {});

    const handleAnswerChange = (key, value, questionType) => {
        let updatedValue;
        if (questionType === 'select') {
            updatedValue = value.map(obj => Object.values(obj)[0]); // Extract the values for select type
        } else {
            updatedValue = value;  // For other types, store the value directly
        }

        const updatedAnswers = {...localAnswers, [key]: updatedValue};
        setLocalAnswers(updatedAnswers);
        setParentAnswers(updatedAnswers);
    };

    useEffect(() => {
        setLocalAnswers(parentAnswers[activeStep] || {});
    }, [parentAnswers, activeStep]);
    const renderInput = (question) => {

        switch (question.type) {
            case 'select':
                return (
                    <>
                        <FormLabel>{question.label}</FormLabel>
                        <Autocomplete
                            multiple
                            value={parentAnswers[question.key]}
                            onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                            selectOnFocus
                            includeInputInList
                            isOptionEqualToValue={(option, value) =>
                                (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                            }
                            disabled={showCustomCompanyInputs && question.key === "current_employees"}
                            handleHomeEndKeys
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const {inputValue} = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.pronouns || option.name || option.range || option.gender || option.identity || option.ethnicity);
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        name: `Add "${inputValue}"`,
                                    });
                                }

                                return filtered;
                            }}
                            id={`autocomplete-${question.key}`}
                            key={`autocomplete-${activeStep}-${question.key}`}
                            options={question.options}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Check for the special case where the option has an inputValue property
                                if (option.inputValue) return option.inputValue;

                                // Existing logic
                                return option.title || option.pronouns || option.name || option.range || option.gender || option.identity || option.ethnicity;
                            }}
                            renderOption={(props, option) =>
                                <li {...props}>{option.title || option.pronouns || option.name || option.range || option.gender || option.identity || option.ethnicity}</li>}
                            renderInput={(params) => (
                                <TextField name={localAnswers[question.key]} {...params} />
                            )}
                        />

                        {question.key === "current_employees" ? (
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showCustomCompanyInputs}
                                            onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                                        />
                                    }
                                    label="My company is not listed"
                                />
                                {showCustomCompanyInputs && (
                                    <div>
                                        <TextField
                                            label="Company Name"
                                            variant="outlined"
                                            value={answers['customCompanyName'] || ''}
                                            onChange={e => setAnswers(prev => ({
                                                ...prev,
                                                'customCompanyName': e.target.value
                                            }))}
                                            style={{marginTop: '10px', marginBottom: '10px', width: '100%'}}
                                        />
                                        <TextField
                                            label="Company URL"
                                            variant="outlined"
                                            type="url"
                                            value={answers['customCompanyURL'] || ''}
                                            onChange={e => setAnswers(prev => ({
                                                ...prev,
                                                'customCompanyURL': e.target.value
                                            }))}
                                            style={{width: '100%'}}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </>
                );
            case 'checkbox':
                return (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={localAnswers[question.key]}
                                    label={question.label}
                                    onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                                />
                            }

                            label={question.label}/>
                    </>
                );
            case 'text':
                return (
                    <>
                        <FormLabel>{question.label}</FormLabel>
                        <TextField
                            value={localAnswers[question.key]}
                            variant="outlined"
                            onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                        />
                    </>
                );
            case 'url':
                return (
                    <>
                        <FormLabel>{question.label}</FormLabel>
                        <TextField
                            type="url"
                            variant="outlined"
                            value={localAnswers[question.key]}
                            onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                        />
                    </>
                );
            case 'file':
                return (
                    <FileButtonWrapper id="hey">
                        {question.helperText &&
                            <FileButtonLabel variant="body2">{question.helperText}</FileButtonLabel>}
                        <FileButtonLabel variant="h1">{question.label}</FileButtonLabel>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                            Upload file
                            <VisuallyHiddenInput
                                onChange={e => setLocalAnswers(prev => ({...prev, [question.key]: e.target.value}))}
                                type="file"/>
                        </Button>
                    </FileButtonWrapper>
                );
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={3}>
            {questions.map((question, index) => (
                <Grid key={index} item xs={12}>
                    {question.type === 'title' ? (
                        <>
                            <Typography component="h1" variant="h5">
                                {question.label}
                            </Typography>
                            <Typography component="h2" variant="h6">
                                {question.helper_text}
                            </Typography>
                        </>
                    ) : (
                        <FormControl fullWidth>
                            {/*<InputLabel htmlFor={question.key}>{question.label}</InputLabel>*/}
                            {renderInput(question)}
                        </FormControl>
                    )}
                </Grid>
            ))}
        </Grid>
    );
}


export default QuestionStep
