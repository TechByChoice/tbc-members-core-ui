import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function SexualityDropdown({
    isRequired, setAnswers, formErrors, handleChange
}) {
    const [ sexuality, setSexuality ] = useState([]);

    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('sexuality');
                setSexuality(response.sexuality);
            } catch (error) {
                console.error('Error fetching sexuality:', error);
            }
        }

        fetchData();
    }, [ token ]);

    return (
        <Autocomplete
            id="identity_sexuality"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={sexuality || []}
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
                        label: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            onChange={(event, value) => setAnswers('identity_sexuality', value)}
            renderInput={params => <TextField required={isRequired} name="identity_sexuality" {...params} />}
        />
    );
}
