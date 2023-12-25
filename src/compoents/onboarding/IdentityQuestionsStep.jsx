import {
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Input, Grid, Autocomplete, Select, MenuItem, InputLabel
} from '@mui/material';
import React from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();

function IdentityQuestionsStep({answers, questions, handleAutocompleteChange, handleInputChange}) {
    const filterOptions = (options, {inputValue}) => {
        const matcher = new RegExp(inputValue, 'i');
        return options.filter(option => matcher.test(option));
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">
                    Identity Related Questions
                </Typography>
                <Typography variant="subtitle1">
                    Thanks for all of that info! The next few questions will be about how you self identify. Please feel
                    free to use the 'Other' option to type in any part of your identity that's not listed. This
                    information will be used to help send you resources and events you may be interested in. We will not
                    share the following information with anyone.
                </Typography>
            </Grid>

            {/* Question 1 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="identity_sexuality">Please select the sexual identities that best describe you
                        today.</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="autocomplete-identity_sexuality"
                        options={questions.sexual_identities || []}
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
                            const isExisting = options.some((option) => inputValue === option.name || option.identity);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name || option.identity}</li>}
                        onChange={(event, value) => handleAutocompleteChange("identity_sexuality", value)}
                        onChange={(event, value) => handleAutocompleteChange("identity_sexuality", value)}
                        renderInput={(params) => <TextField name="identity_sexuality" {...params} />}
                    />
                    <FormLabel>
                        If you see any terms you're not sure about we encourage you to check out this site to learn more
                        about people's experiences
                    </FormLabel>
                </FormControl>
            </Grid>

            {/* Question 2 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="gender_identities">Please select the gender identities that best describe you
                        today.</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="autocomplete-gender_identities"
                        options={questions.gender_identities || []}
                        isOptionEqualToValue={(option, value) =>
                            (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                        }
                        name="gender_identities"
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) return option.inputValue;
                            return option.name || option.gender;
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filterOptions(options, params);

                            const {inputValue} = params;
                            const isExisting = options.some((option) => inputValue === option.name || option.gender);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name || option.gender}</li>}
                        onChange={(event, value) => handleAutocompleteChange("gender_identities", value)}
                        renderInput={(params) => <TextField name="gender_identities" {...params} />}
                    />
                </FormControl>
            </Grid>

            {/* Question 3 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="identity_ethic">Please select all the identities that best describe your ethic
                        background</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="autocomplete-ethic_identities"
                        options={questions.ethic_identities || []}
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
                        onChange={(event, value) => handleAutocompleteChange("identity_ethic", value)}
                        renderInput={(params) => <TextField name="ethic_identities" {...params} />}
                    />
                </FormControl>
            </Grid>

            {/* Question 4 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="disability">Have you ever identified yourself as someone with a disability?
                        Both visible and non-visible disabilities included.</FormLabel>
                    <Select id="disability" name="disability">
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Question 5 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="care_giver">Do you identify as a care giver?</FormLabel>
                    <Select onChange={handleInputChange} name="care_giver" id="care_giver">
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Question 6 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="veteran_status">What is your Veteran Status?</FormLabel>
                    <Select onChange={handleInputChange} name="veteran_status" id="veteran_status">
                        <MenuItem value='1'>Yes</MenuItem>
                        <MenuItem value='2'>No</MenuItem>
                        <MenuItem value="3">Prefer not to answer</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}


export default IdentityQuestionsStep;
