import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownCerts({
    isRequired, error, setAnswers, handleInputChange, inputLabel = 'Certs', inputName = 'certs' 
}) {
    const [ certs, setCerts ] = useState([]);
    const [ selectedCerts, setSelectedCerts ] = useState('');

    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchCerts() {
            try {
                const response = await getDropDrownItems('certs');
                setCerts(response.certs);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }

        fetchCerts();
    }, [ token ]);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id={inputName}>
                {isRequired && <>*</>}
                {inputLabel}
            </FormLabel>
            <Autocomplete
                id={inputName}
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={certs || []}
                isOptionEqualToValue={(option, value) => (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )}
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
                    setSelectedCerts(newValue);
                    if (handleInputChange) {
                        const valueArray = [];
                        newValue.map((item, index) => {
                            valueArray.push(item.name);
                        });

                        handleInputChange(inputName, newValue);
                    } else {
                        setAnswers(prevState => ({
                            ...prevState,
                            [inputName]: newValue,
                        }));
                    }
                }}
                renderInput={params => <TextField error={!!error.skills} name={inputName} {...params} />}
            />
        </FormControl>
    );
}
