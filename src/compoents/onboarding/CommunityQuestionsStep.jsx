import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    Checkbox,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    Autocomplete,
    FormHelperText
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { getDropDrownItems } from '@/api-calls';

const filter = createFilterOptions();

function CommunityQuestionsStep({
    formErrors, questions, handleAutocompleteChange, handleInputChange, handleInputCheckboxChange
}) {
    const [ communityNeeds, setSetCommunityNeeds ] = useState([]);
    const [ connectionMade, setConnectionMade ] = useState([]);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchData() {
            try {
                const response = await getDropDrownItems('community_needs');
                setSetCommunityNeeds(response.community_needs);
            } catch (error) {
                console.error('Error fetching community needs:', error);
            }
            try {
                const response = await getDropDrownItems('how_connected');
                const clean_data = response.how_connected.map(([ id, name ]) => ({ id, name }));
                setConnectionMade(clean_data);
            } catch (error) {
                console.error('Error fetching how connection found list:', error);
            }
        }

        fetchData();
    }, []);

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
                    <FormControlLabel control={<Checkbox onChange={handleInputCheckboxChange} name="is_mentor" />} label="Would you like to be a mentor?" />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel control={<Checkbox onChange={handleInputCheckboxChange} name="is_mentee" />} label="Would you like to have a mentor?" />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel error={!!formErrors.how_connection_made} required id="how-connection-made-label">How did you find the Tech by Choice community?</FormLabel>
                    <Select required labelId="how-connection-made-label" id="how-connection-made" name="how_connection_made" onChange={handleInputChange}>
                        {connectionMade?.map(option => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {!!formErrors.how_connection_made && <FormHelperText>{formErrors.how_connection_made}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel required error={!!formErrors.tbc_program_interest} id="tbc-program-interest-label">What Tech by Choice Services interest you most?</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="tbc_program_interest"
                        aria-labelledby="tbc_program_interest-label"
                        options={communityNeeds || []} // <-- directly provide a default value here
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
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        onChange={(event, value) => handleAutocompleteChange('tbc_program_interest', value)}
                        renderInput={params => <TextField required name="tbc_program_interest" {...params} />}
                    />
                    {!!formErrors.tbc_program_interest && <FormHelperText>{formErrors.tbc_program_interest}</FormHelperText>}
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default CommunityQuestionsStep;
