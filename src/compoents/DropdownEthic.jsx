import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function EthicDropdown({
    isRequired, setAnswers, formErrors, handleChange 
}) {
    const [ ethic, setEthic ] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('ethic');
                setEthic(response.ethic);
            } catch (error) {
                console.error('Error fetching ethic:', error);
            }
        }

        fetchData();
    }, [ token ]);

    return (
        <Autocomplete
            id="gender"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={ethic || []}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.ethnicity}
                </li>
            )}
            getOptionLabel={option => {
                return option.ethnicity;
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(option => inputValue === option.ethnicity);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            onChange={(event, value) => setAnswers('identity_ethic', value)}
            renderInput={params => <TextField required={isRequired} name="ethic" {...params} />}
        />
    );
}
