import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownCompanyTypes({ isRequired, setAnswers, formErrors }) {
    const [ companyTypes, setCompanyTypes ] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('company_types');
                setCompanyTypes(response.company_types);
            } catch (error) {
                console.error('Error fetching company types:', error);
            }
        }

        fetchData();
    }, [ token ]);

    return (
        <Autocomplete
            id="company_types"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={companyTypes || []}
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
            onChange={(event, value) => setAnswers('company_types', value)}
            renderInput={params => <TextField required={isRequired} error={!!formErrors.company_types} name="company_types" {...params} />}
        />
    );
}
