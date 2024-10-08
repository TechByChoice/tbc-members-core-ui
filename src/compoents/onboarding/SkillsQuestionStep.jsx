import { Typography, FormControl, FormLabel, TextField, Button, Input, Grid, Autocomplete, Select, MenuItem, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import DropdownSkillsSimple from '@/compoents/DropdownSkillsSimple';
import DropdownDepartmentsSimple from '@/compoents/DropdownDepartmentsSimple';
import DropdownCompanyTypes from '../DropdownCompanyTypes';
import DropdownIndustries from '@/compoents/DropdownIndustries';
import { getDropDrownItems } from '@/api-calls';

const filter = createFilterOptions();

function SkillsQuestionStep({
    answers, questions, handleInputChange, handleFileChange, handleAutocompleteChange, formErrors 
}) {
    const [ salaries, setSalaries ] = useState([]);
    const [ showTalentFields, setShowTalentFields ] = useState(false);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchSkills() {
            try {
                const response = await getDropDrownItems('job_salary_range');
                setSalaries(response.job_salary_range);
            } catch (error) {
                console.error('Error fetching salaries:', error);
            }
        }

        fetchSkills();
    }, []);

    const handleTalentStatusChange = event => {
        const value = event.target.value;
        setShowTalentFields(value === 'Yes');
        handleInputChange(event);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5">Skills & Experiences</Typography>
                <Typography variant="subtitle1">The following questions will help you land your next role, and find resources related to your skills.</Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.talent_status}>
                    <FormLabel>* Would you like to be added to our talent search?</FormLabel>
                    <Select name="talent_status" onChange={handleTalentStatusChange}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                    {!!formErrors.talent_status && <FormHelperText>{formErrors.talent_status}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.job_skills}>
                    <FormLabel>* What skills best represent you?</FormLabel>
                    <DropdownSkillsSimple handleInputChange={handleAutocompleteChange} error={formErrors} isRequired={true} />
                    {!!formErrors.job_skills && <FormHelperText>{formErrors.job_skills}</FormHelperText>}
                    <Typography variant="body2">Please select your top 5 skills</Typography>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.job_department}>
                    <FormLabel>* What department best describes your interest?</FormLabel>
                    <DropdownDepartmentsSimple isRequired={true} error={formErrors} handleAutocompleteChange={handleAutocompleteChange} />
                    {!!formErrors.job_department && <FormHelperText>{formErrors.job_department}</FormHelperText>}
                </FormControl>
            </Grid>

            {showTalentFields && (
                <>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!formErrors.resume}>
                            <Typography variant="body2">Upload Your Resume</Typography>
                            <Button variant="contained" component="label">
                                Upload Your Resume
                                <input type="file" name="resume" onChange={handleFileChange} hidden />
                            </Button>
                            {!!formErrors.resume && <FormHelperText>{formErrors.resume}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>What types of companies would you like to work with?</FormLabel>
                            <DropdownCompanyTypes isRequired={false} setAnswers={handleAutocompleteChange} formErrors={formErrors} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>What industries are you interested in?</FormLabel>
                            <DropdownIndustries isRequired={false} error={formErrors} handleAutocompleteChange={handleAutocompleteChange} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">What salary range you&apos;re looking for?</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel>Min Salary Range</FormLabel>
                            <Autocomplete
                                multiple
                                selectOnFocus
                                includeInputInList
                                handleHomeEndKeys
                                id="autocomplete-job_salary_range"
                                options={salaries || []}
                                isOptionEqualToValue={(option, value) =>
                                    (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                }
                                getOptionLabel={option => {
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    if (option.inputValue) return option.inputValue;
                                    return option.range;
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some(option => inputValue === option.range);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            name: `Add "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.range}</li>}
                                onChange={(event, value) => {
                                    // Update the value to be the index + 1
                                    value = value.map((item, index) => index + 1);
                                    handleAutocompleteChange('min_compensation', value);
                                }}
                                renderInput={params => <TextField name="min_compensation" {...params} />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel>Max Salary Range</FormLabel>
                            <Autocomplete
                                multiple
                                selectOnFocus
                                includeInputInList
                                handleHomeEndKeys
                                id="autocomplete-job_salary_range"
                                options={salaries || []}
                                isOptionEqualToValue={(option, value) =>
                                    (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                }
                                getOptionLabel={option => {
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Check for the special case where the option has an inputValue property
                                    if (option.inputValue) return option.inputValue;

                                    // Existing logic
                                    return option.range;
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some(option => inputValue === option.range);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            name: `Add "${inputValue}"`,
                                        });
                                    }

                                    return filtered;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.range}</li>}
                                onChange={(event, value) => {
                                    // Update the value to be the index + 1
                                    value = value.map((item, index) => index + 1);
                                    handleAutocompleteChange('max_compensation', value);
                                }}
                                renderInput={params => <TextField name="max_compensation" {...params} />}
                            />
                        </FormControl>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default SkillsQuestionStep;
