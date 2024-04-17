import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, Snackbar, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';
import Alert from '@mui/material/Alert';

const filter = createFilterOptions();
export default function DropdownSkillsSimple({
    isRequired, error, setAnswers, formErrors, handleInputChange 
}) {
    const [ skills, setSkills ] = useState([]);
    const [ selectedSkills, setSelectedSkills ] = useState([]);
    const [ open, setOpen ] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchSkills() {
            try {
                const response = await getDropDrownItems('job_skills');
                setSkills(response.job_skills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }

        fetchSkills();
    }, [ token ]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSkillChange = (event, newValue) => {
        setSelectedSkills(newValue);
        handleInputChange('job_skills', newValue);
        if (selectedSkills.length > 5) {
            setOpen(true);
        }
    };

    return (
        <>
            <Autocomplete
                id="skills-label"
                multiple
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={skills || []}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )}
                getOptionLabel={option => {
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
                // value={selectedSkill}
                onChange={handleSkillChange}
                renderInput={params => <TextField required={isRequired} error={!!error.skills} name="job_skills" {...params} />}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    You can only add up to 5 skills.
                </Alert>
            </Snackbar>
        </>
    );
}
