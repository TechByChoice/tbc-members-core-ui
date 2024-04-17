import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownPronouns({ isRequired, setAnswers, formErrors }) {
    const [ pronouns, setPronouns ] = useState([]);

    const { fetchUserDetails } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('pronouns');
                setPronouns(response.pronouns);
            } catch (error) {
                console.error('Error fetching pronouns:', error);
            }
        }

        fetchData();
    }, [ fetchUserDetails ]);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="pronouns_identities-label">
                {isRequired && <>*</>}
                Pronouns
            </FormLabel>
            <Autocomplete
                id="pronouns_identities"
                multiple
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={pronouns || []}
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
                            pronouns: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                onChange={(event, value) => setAnswers('pronouns_identities', value)}
                renderInput={params => <TextField required={isRequired} error={!!formErrors.pronouns_identities} name="pronouns_identities" {...params} />}
            />
        </FormControl>
    );
}
