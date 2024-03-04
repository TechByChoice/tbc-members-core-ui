import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownCompanySize({
    isRequired, error, setAnswers = false, handleAutocompleteChange 
}) {
    const [ companySize, setCompanySize ] = useState([]);
    const [ selectedDepartment, setSelectedDepartment ] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchDepartments() {
            try {
                const response = await getDropDrownItems('company_size');
                setCompanySize(response.company_size);
            } catch (error) {
                console.error('Error fetching company_size:', error);
            }
        }

        fetchDepartments();
    }, [ token ]);

    return (
        <Autocomplete
            id="company_size-label"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={companySize || []}
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
                setSelectedDepartment(newValue);
                if (handleAutocompleteChange) {
                    handleAutocompleteChange('company_size', newValue);
                } else {
                    setAnswers(prevState => ({
                        ...prevState,
                        company_size: newValue,
                    }));
                }
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            renderInput={params => <TextField required={isRequired} error={!!error.company_size} name="company_size" {...params} />}
        />
    );
}
