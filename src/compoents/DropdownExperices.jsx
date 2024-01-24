import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function ExperiencesDropdown({ isRequired, setAnswers, error }) {
    const [ experiences, setExperiences ] = useState([]);
    const [ experiencesSkill, setExperiencesSkill ] = useState('');

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchExperiences() {
            try {
                const response = await getDropDrownItems('years_of_experience');
                setExperiences(response.years_of_experience);
            } catch (error) {
                console.error('Error fetching years_of_experience:', error);
            }
        }

        fetchExperiences();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="skills-label">
                {isRequired && <>*</>}
                What level of experiences are you looking for?
            </FormLabel>
            <Autocomplete
                id="experiences-label"
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={experiences || []}
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
                    setExperiencesSkill(newValue);
                    setAnswers(prevState => ({
                        ...prevState,
                        years_of_experience: newValue,
                    }));
                }}
                renderInput={params => <TextField error={!!error.years_of_experience} name="years_of_experience" {...params} />}
            />
        </FormControl>
    );
}
