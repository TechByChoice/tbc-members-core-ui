import {
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Input, Grid, Autocomplete, Select, MenuItem, InputLabel, OutlinedInput, FormHelperText
} from '@mui/material';
import React from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();

function OpenRolesStep({answers, questions, formErrors, handleAutocompleteChange, handleInputChange}) {
    const filterOptions = (options, {inputValue}) => {
        const matcher = new RegExp(inputValue, 'i');
        return options.filter(option => matcher.test(option));
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">
                    Tell us about the roles you're looking to fill
                </Typography>
                <Typography variant="subtitle1">
                    ....
                </Typography>
            </Grid>

            {/* Question 1 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="identity_sexuality">
                        Open Roles
                    </FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="autocomplete-open-roles"
                        options={questions.job_roles || []}
                        isOptionEqualToValue={(option, value) =>
                            (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                        }
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) return option.inputValue;
                            return option.name || option.identity;
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filterOptions(options, params);

                            const {inputValue} = params;
                            const isExisting = options.some((option) => inputValue === option.name);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name }</li>}
                        onChange={(event, value) => handleAutocompleteChange("job_roles", value)}
                        renderInput={(params) => <TextField name="job_roles" {...params} />}
                    />
                    <FormLabel>
                        If you see any terms you're not sure about we encourage you to check out this site to learn more
                        about people's experiences
                    </FormLabel>
                    {!!formErrors.job_roles && <FormHelperText error={true}>{formErrors.job_roles}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Question 2 */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.location}>
                    <FormLabel>Opening Location</FormLabel>
                    <OutlinedInput onChange={handleInputChange} name="job_location"/>
                    {!!formErrors.job_location && <FormHelperText error={true}>{formErrors.job_location}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Question 3 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="job_site">
                        Job Type
                    </FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="autocomplete-job_site"
                        options={questions.job_site || []}
                        isOptionEqualToValue={(option, value) =>
                            (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                        }
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) return option.inputValue;
                            return option.name || option.ethnicity;
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filterOptions(options, params);

                            const {inputValue} = params;
                            const isExisting = options.some((option) => inputValue === option.name || option.ethnicity);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name || option.ethnicity}</li>}
                        onChange={(event, value) => handleAutocompleteChange("job_site", value)}
                        renderInput={(params) => <TextField name="job_site" {...params} />}
                    />
                    {!!formErrors.job_site && <FormHelperText error={true}>{formErrors.job_site}</FormHelperText>}
                </FormControl>
            </Grid>

        </Grid>
    );
}


export default OpenRolesStep;
