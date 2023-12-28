import { Autocomplete, Button, FormControl, FormHelperText, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';

const filter = createFilterOptions();

export default function ProfileInterests({ handleChange, questions }) {
    const { user } = useAuth();
    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({});
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    const [ skillsRolesFormData, setSkillsRolesFormData ] = useState({
        skills: [],
        department: [],
    });

    const handleAutocompleteChange = (name, value) => {
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(item => item.name || item);
        }
        setSkillsRolesFormData(prev => ({ ...prev, [name]: value }));
    };

    const extractDefaultValues = () => {
        // Extract the skills and roles from userDetails and map them to the corresponding objects in questions.
        // The method to do this depends on the structure of userDetails and questions.
        // Assuming that userDetails contains an array of strings like "role: 20"

        const defaults = {
            skills: [],
            department: [],
        };

        if (userDetails && userDetails?.user_info?.talentprofile.skills) {
            userDetails?.user_info?.talentprofile.skills.forEach(role => {
                const index = parseInt(role) - 1; // extracting the index from the role string
                if (questions.job_skills[index]) {
                    defaults.skills.push(questions.job_skills[index]);
                }
            });
        }

        if (userDetails && userDetails?.user_info?.talentprofile.department) {
            userDetails?.user_info?.talentprofile.department.forEach(dep => {
                const departmentId = parseInt(dep);

                const departmentItem = questions.job_department.find(item => item.id === departmentId);
                if (departmentItem) {
                    defaults.department.push(departmentItem);
                }
            });
        }

        return defaults;
    };

    useEffect(() => {
        if (userDetails && questions.job_skills && questions.job_department) {
            const defaultSkills = userDetails.user_info.talentprofile.skills
                .map(skillId => {
                    return questions.job_skills.find(skill => skill.id === parseInt(skillId.id));
                })
                .filter(skill => skill != null);

            const defaultDepartment = userDetails.user_info.talentprofile.department
                .map(departmentId => {
                    return questions.job_department.find(department => department.id === parseInt(departmentId.id));
                })
                .filter(department => department != null);

            setSkillsRolesFormData({
                skills: defaultSkills,
                department: defaultDepartment,
            });
        }
        console.log(skillsRolesFormData);
    }, [ userDetails, questions ]);

    function handleSave(e) {
        e.preventDefault();
        const url = process.env.REACT_APP_API_BASE_URL + 'user/profile/update/skills-roles';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(skillsRolesFormData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsAlertOpen(true);
                    setStatusType('success');
                    setStatusMessage('Updates have been saved');
                } else {
                    setIsAlertOpen(true);
                    setStatusType('error');
                    setStatusMessage('Please update all required fields.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsAlertOpen(true);
                setStatusType('error');
                setStatusMessage('Sorry, we ran into an issue, please try again.');
            });
    }

    return (
        <>
            {questions.job_skills && questions.job_department && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">Skills & Department</Typography>
                        <hr />
                    </Grid>
                    <Grid item xs={12} md={4} spacing={3} mt={3}>
                        <Typography variant="body">Update your account details here</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!formErrors.skills}>
                                    <FormLabel>What skills best represent you?</FormLabel>
                                    <Autocomplete
                                        value={skillsRolesFormData.skills}
                                        multiple
                                        required
                                        selectOnFocus
                                        includeInputInList
                                        handleHomeEndKeys
                                        id="autocomplete-job_skills"
                                        options={questions.job_skills || []} // <-- directly provide a default value here
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
                                            return option.name;
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            const { inputValue } = params;
                                            // Suggest the creation of a new value
                                            const isExisting = options.some(option => inputValue === option.name);
                                            if (inputValue !== '' && !isExisting) {
                                                filtered.push({
                                                    inputValue,
                                                    name: `Add "${inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        renderOption={(props, option) => <li {...props}>{option.name || option.name}</li>}
                                        onChange={(event, value) => handleAutocompleteChange('skills', value)}
                                        renderInput={params => <TextField name="job_skills" {...params} />}
                                    />
                                    {!!formErrors.job_skills && <FormHelperText>{formErrors.job_skills}</FormHelperText>}
                                    <Typography variant="body2">Please select your top 5 skills</Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!formErrors.job_department}>
                                    <FormLabel>What department best describes your interest?</FormLabel>
                                    <Autocomplete
                                        value={skillsRolesFormData.department}
                                        multiple
                                        selectOnFocus
                                        required
                                        includeInputInList
                                        handleHomeEndKeys
                                        id="autocomplete-job_skills"
                                        options={questions.job_department || []} // <-- directly provide a default value here
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
                                            return option.name;
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            const { inputValue } = params;
                                            // Suggest the creation of a new value
                                            const isExisting = options.some(option => inputValue === option.name);
                                            if (inputValue !== '' && !isExisting) {
                                                filtered.push({
                                                    inputValue,
                                                    name: `Add "${inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                        onChange={(event, value) => handleAutocompleteChange('department', value)}
                                        renderInput={params => <TextField name="job_department" {...params} />}
                                    />
                                    {!!formErrors.job_department && <FormHelperText>{formErrors.job_department}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
