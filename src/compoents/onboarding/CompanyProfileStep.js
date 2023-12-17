import {
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Input, Grid, Autocomplete, Select, MenuItem, FormHelperText, OutlinedInput
} from '@mui/material';
import React from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
// import ReactQuill from "react-quill";

const filter = createFilterOptions();

function CompanyProfileStep({
                                answers,
                                questions,
                                handleQuillInputChange,
                                handleInputChange,
                                handleFileChange,
                                handleAutocompleteChange,
                                formErrors
                            }) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5">Create Your Company Profile</Typography>
                <Typography variant="subtitle1">
                    Help the community learn more about your company.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.company_url}>
                    <FormLabel>Company Website</FormLabel>
                    <OutlinedInput onChange={handleInputChange} name="company_url"/>
                    {!!formErrors.company_url && <FormHelperText>{formErrors.company_url}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.location}>
                    <FormLabel>Company Location</FormLabel>
                    <OutlinedInput onChange={handleInputChange} name="location"/>
                    {!!formErrors.location && <FormHelperText>{formErrors.location}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="mission">What is the companies mission?</FormLabel>
                    {/*<ReactQuill theme="snow" onChange={handleQuillInputChange('mission')}/>*/}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.logo}>
                    <Typography variant="body2">Company Logo</Typography>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" name="logo" onChange={handleFileChange} hidden/>
                    </Button>
                    {!!formErrors.logo && <FormHelperText>{formErrors.logo}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.company_sizes}>
                    <FormLabel>Company Size</FormLabel>
                    <Autocomplete
                        // multiple
                        required
                        selectOnFocus
                        includeInputInList
                        handleHomeEndnames
                        id='autocomplete-company_sizes'
                        options={questions.company_sizes || []} // <-- directly provide a default value here
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
                        onChange={(event, value) => {
                            // const valueArray = []
                            // value.map((item, index) => {
                            //     console.log(item)
                            //     valueArray.push(item.name)
                            // });
                            handleAutocompleteChange("company_size", [value])
                        }}
                        renderInput={(params) => <TextField name="company_size" {...params} />}
                    />
                    {!!formErrors.company_size && <FormHelperText>{formErrors.company_size}</FormHelperText>}
                </FormControl>
            </Grid>


            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel>What best represents the company type?</FormLabel>
                    <Autocomplete
                        selectOnFocus
                        includeInputInList
                        handleHomeEndnames
                        id='autocomplete-company_types'
                        options={questions.company_types || []} // <-- directly provide a default value here
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
                        renderOption={(props, option) => <li {...props}>{option.name || option.name}</li>}
                        onChange={(event, value) => {
                            console.log(value, event)
                            handleAutocompleteChange("company_types", [value])
                        }}
                        renderInput={(params) => <TextField name="company_types" {...params} />}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel>What industries is the company working in?</FormLabel>
                    <Autocomplete
                        multiple
                        selectOnFocus
                        includeInputInList
                        handleHomeEndnames
                        id='autocomplete-company_industries'
                        options={questions.company_industries || []} // <-- directly provide a default value here
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
                        renderOption={(props, option) => <li {...props}>{option.name || option.name}</li>}
                        onChange={(event, value) => handleAutocompleteChange("company_industries", value)}
                        renderInput={(params) => <TextField name="company_industries" {...params} />}
                    />
                </FormControl>
            </Grid>


        </Grid>
    );
}


export default CompanyProfileStep;
