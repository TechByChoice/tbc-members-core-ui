import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function DropdownSkillsSimple({
    isRequired, error, setAnswers, formErrors, handleInputChange 
}) {
    const [ skills, setSkills ] = useState([]);
    const [ selectedSkill, setSelectedSkill ] = useState('');

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
    }, []);

    return (
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
            onChange={(event, newValue) => handleInputChange('job_skills', newValue)}
            renderInput={params => <TextField required={isRequired} error={!!error.skills} name="job_skills" {...params} />}
        />
    );
}
