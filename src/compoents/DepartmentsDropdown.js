import React, {useState, useEffect} from 'react';
import {Autocomplete, FormControl, FormLabel, TextField} from '@mui/material';
import {getBasicSystemInfo} from "../api-calls";
import {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();
export default function DepartmentsDropdown({setAnswers}) {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchDepartments() {
            try {
                const response = await getBasicSystemInfo();
                setDepartments(response.job_department);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        }

        fetchDepartments();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="departments-label">Departments</FormLabel>
            <Autocomplete
                id="departments-label"
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={departments || []}
                isOptionEqualToValue={(option, value) =>
                    (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                }
                getOptionLabel={(option) => {
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

                    const {inputValue} = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
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
                    setAnswers(prevState => ({
                        ...prevState,
                        department: newValue,
                    }));
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                renderInput={(params) => <TextField name="job_departments" {...params} />}
            />
        </FormControl>
    );
}
