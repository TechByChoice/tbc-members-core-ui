import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function YearsOfExperienceDropdown({ isRequired, setAnswers, formErrors }) {
    const [ pronouns, setPronouns ] = useState([]);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('years_of_experience');
                setPronouns(response.years_of_experience);
            } catch (error) {
                console.error('Error fetching years of experience:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Autocomplete
            id="years_of_experience"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={pronouns || []}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.label}
                </li>
            )}
            getOptionLabel={option => {
                return option.label;
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(option => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            onChange={(event, value) => setAnswers('years_of_experience', value)}
            renderInput={params => <TextField required={isRequired} error={!!formErrors.years_of_experience} name="years_of_experience" {...params} />}
        />
    );
}
