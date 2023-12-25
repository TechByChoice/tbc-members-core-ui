import React, {useState, useEffect} from 'react';
import {Autocomplete, FormControl, FormLabel, TextField} from '@mui/material';
import {getBasicSystemInfo} from "../api-calls";
import {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();
export default function SalaryDropdown({setAnswers, labelName}) {
    const [salaries, setSalaries] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState('');

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchSkills() {
            try {
                const response = await getBasicSystemInfo();
                setSalaries(response.job_salary_range);
            } catch (error) {
                console.error("Error fetching salaries:", error);
            }
        }

        fetchSkills();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="skills-label">{labelName}</FormLabel>
            <Autocomplete
                id="skills-label"
                multiple
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                options={salaries || []}
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
                    return option.range;
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const {inputValue} = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.range);
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
                    setSelectedSalary(e.target.value);
                    if(labelName === 'Min Salary') {
                        setAnswers(prevState => ({
                            ...prevState,
                            min_compensation: newValue,
                        }));
                    } else {
                        setAnswers(prevState => ({
                            ...prevState,
                            max_compensation: newValue,
                        }));
                    }


                }}
                renderOption={(props, option) => <li {...props}>{option.range }</li>}
                renderInput={(params) => <TextField name={labelName == 'Min Compensation'? 'min_compensation' : 'max_compensation'} {...params} />}
            />
        </FormControl>
    );
}
