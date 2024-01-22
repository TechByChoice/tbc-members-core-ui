import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function JobRoleDropdown({ isRequired, setAnswers, formErrors }) {
    const [ jobRoles, setJobRoles ] = useState([]);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('job_roles');
                setJobRoles(response.job_roles);
            } catch (error) {
                console.error('Error fetching job roles:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Autocomplete
            id="job_roles"
            multiple
            selectOnFocus
            includeInputInList
            handleHomeEndKeys
            options={jobRoles || []}
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
            onChange={(event, value) => setAnswers('job_roles', value)}
            renderInput={params => <TextField required={isRequired} error={!!formErrors.job_roles} name="job_roles" {...params} />}
        />
    );
}
