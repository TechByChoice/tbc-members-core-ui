import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getBasicSystemInfo } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function SkillsDropdown({ isRequired, error, setAnswers }) {
    const [ skills, setSkills ] = useState([]);
    const [ selectedSkill, setSelectedSkill ] = useState('');

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchSkills() {
            try {
                const response = await getBasicSystemInfo();
                setSkills(response.job_skills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }

        fetchSkills();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="skills-label">
                {isRequired && <>*</>}
                Skills
            </FormLabel>
            <Autocomplete
                id="skills-label"
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={skills || []}
                isOptionEqualToValue={(option, value) =>
                    (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                }
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )}
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
                // value={selectedSkill}
                onChange={(e, newValue) => {
                    setSelectedSkill(newValue);
                    setAnswers(prevState => ({
                        ...prevState,
                        skills: newValue,
                    }));
                }}
                renderInput={params => <TextField error={!!error.skills} name="job_skills" {...params} />}
            />
        </FormControl>
    );
}
