import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownRemote({
    isRequired, error, setAnswers = false, handleAutocompleteChange 
}) {
    const [ companyEnvironment, setCompanyEnvironment ] = useState([]);
    const [ selectedEnvironment, setSelectedEnvironment ] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchDepartments() {
            try {
                const response = await getDropDrownItems('on_site_remote');
                setCompanyEnvironment(response.on_site_remote);
            } catch (error) {
                console.error('Error fetching on_site_remote:', error);
            }
        }

        fetchDepartments();
    }, [ token ]);

    return (
        <Autocomplete
            id="on_site_remote-label"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={companyEnvironment || []}
            isOptionEqualToValue={(option, value) => (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value}
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
                setSelectedEnvironment(newValue);
                if (handleAutocompleteChange) {
                    handleAutocompleteChange('on_site_remote', newValue);
                } else {
                    setAnswers(prevState => ({
                        ...prevState,
                        on_site_remote: newValue,
                    }));
                }
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            renderInput={params => <TextField required={isRequired} error={!!error.on_site_remote} name="on_site_remote" {...params} />}
        />
    );
}
