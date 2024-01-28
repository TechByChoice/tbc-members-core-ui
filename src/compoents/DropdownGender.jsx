import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function GenderDropdown({
    isRequired, setAnswers, formErrors, handleChange 
}) {
    const [ gender, setGender ] = useState([]);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('gender');
                setGender(response.gender);
            } catch (error) {
                console.error('Error fetching gender:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Autocomplete
            id="gender"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={gender || []}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.gender}
                </li>
            )}
            getOptionLabel={option => {
                return option.gender;
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(option => inputValue === option.gender);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            onChange={(event, value) => setAnswers('gender_identities', value)}
            renderInput={params => <TextField required={isRequired} name="gender" {...params} />}
        />
    );
}
