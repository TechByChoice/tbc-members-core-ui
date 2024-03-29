import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownRoles({ isRequired, error, setAnswers }) {
    const [ roles, setRoles ] = useState([]);
    const [ selectedRoles, setSelectedRoles ] = useState('');

    const { fetchUserDetails } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchRoles() {
            try {
                const response = await getDropDrownItems('job_roles');
                setRoles(response.job_roles);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }

        fetchRoles();
    }, [ fetchUserDetails ]);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="roles-label">
                {isRequired && <>*</>}
                Roles
            </FormLabel>
            <Autocomplete
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={roles || []}
                name="job_roles"
                isOptionEqualToValue={(option, value) =>
                    (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                }
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
                    setSelectedRoles(newValue);
                    setAnswers(prevState => ({
                        ...prevState,
                        role: newValue,
                    }));
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                renderInput={params => <TextField error={!!error.roles} name="job_roles" {...params} />}
            />
        </FormControl>
    );
}
