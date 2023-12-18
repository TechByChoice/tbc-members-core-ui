import React from 'react';
import {
    Grid,
    Typography,
    Checkbox,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    TextField, Autocomplete
} from '@mui/material';
import FormLabel from "@mui/material/FormLabel";
import {createFilterOptions} from "@mui/material/Autocomplete";

const filter = createFilterOptions();

function CommunityQuestionsStep({questions, handleAutocompleteChange, handleInputChange}) {
    // Your state management, if required, will go here

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Community Related Questions
                </Typography>
                <Typography component="h2" variant="h6">
                    The following questions will help us understand how Tech by Choice can support you
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="is_mentor"/>}
                        label="Would you like to be a mentor?"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox onChange={handleInputChange} name="is_mentee"/>}
                        label="Would you like to have a mentor?"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="how-connection-made-label">How did you find the Tech by Choice community?</FormLabel>
                    <Select
                        labelId="how-connection-made-label"
                        id="how-connection-made"
                        name="how_connection_made"
                        onChange={handleInputChange}
                    >
                        {questions.connection_options.map(option => (
                            <MenuItem value={option.name}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="tbc-program-interest-label">What Tech by Choice Services interest you
                        most?</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id='tbc_program_interest'
                        aria-labelledby="pronouns-label"
                        options={questions.community_needs || []} // <-- directly provide a default value here
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
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        onChange={(event, value) => handleAutocompleteChange("tbc_program_interest", value)}
                        renderInput={(params) => <TextField name="tbc_program_interest" {...params} />}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default CommunityQuestionsStep;
