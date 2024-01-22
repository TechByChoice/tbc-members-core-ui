import {Typography,
    FormControl,
    FormLabel,
    TextField,
    Button,
    Input,
    Grid,
    Autocomplete,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormHelperText,} from '@mui/material';
import React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PronounsDropdown from '@/compoents/PronounsDropdown';
import JobRoleDropdown from '@/compoents/JobRoleDropdown';

const filter = createFilterOptions();

function BasicInfoStep({
    formErrors, handleInputChange, handleFileChange, handleAutocompleteChange, questions 
}) {
    const [ viewNewCompany, setViewNewCompany ] = React.useState(false);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">Let&apos;s get to know you!</Typography>
                <Typography variant="subtitle1">The following questions will us help learn more about you.</Typography>
            </Grid>
            {/* Pronouns Dropdown */}
            <Grid item xs={12}>
                <PronounsDropdown formErrors={true} isRequired={false} answers={questions} setAnswers={handleAutocompleteChange} />
                <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} name="is_pronouns_displayed" color="primary" size="small" />}
                    label="Would you like your pronouns saved on your profile?"
                />
            </Grid>

            {/* Upload Profile Img */}
            <Grid item xs={12}>
                <FormControl error={!!formErrors.photo}>
                    <label htmlFor="photo">*Upload your Profile Photo</label>
                    <Button variant="outline" component="label">
                        <Input required type="file" hidden onChange={handleFileChange} aria-label="*Upload your profile photo" name="photo" />
                    </Button>
                    {!!formErrors.photo && <FormHelperText>{formErrors.photo}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Postal Code */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.postal_code}>
                    <FormLabel htmlFor="postal_code">* What&apos;s your postal code?</FormLabel>
                    <OutlinedInput onChange={handleInputChange} name="postal_code" />
                    {!!formErrors.postal_code && <FormHelperText>{formErrors.postal_code}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Job Title Dropdown */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.job_roles}>
                    <FormLabel id="job-title-label">* What is the job title that best fits your desired or current position?</FormLabel>
                    <JobRoleDropdown formErrors={true} isRequired={true} answers={questions} setAnswers={handleAutocompleteChange} />
                    {!!formErrors.job_roles && <FormHelperText>{formErrors.job_roles}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Current Company Dropdown */}
            <Grid item xs={12}>
                <Typography variant="h6">We&apos;re do you currently work?</Typography>
            </Grid>
            {questions.total_companies <= 0 || viewNewCompany ? (
                <>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="company_name">Company Name</InputLabel>
                            <OutlinedInput label="Company Naame" onChange={handleInputChange} name="company_name" type="text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="company_url">Company Website</InputLabel>
                            <OutlinedInput
                                label="Company Website"
                                onChange={handleInputChange}
                                name="company_url"
                                startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                type="url"
                            />
                        </FormControl>
                    </Grid>
                </>
            ) : (
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel id="company-label">Please select the company you work with.</FormLabel>
                        <Autocomplete
                            multiple
                            selectOnFocus
                            includeInputInList
                            handleHomeEndKeys
                            id="company_list"
                            aria-labelledby="company-label"
                            options={questions.company_list || []} // <-- directly provide a default value here
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
                                return option.company_name;
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some(option => inputValue === option.company_name);
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        name: `Add "${inputValue}"`,
                                    });
                                }

                                return filtered;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.company_name}</li>}
                            onChange={(event, value) => handleAutocompleteChange('company_name', value)}
                            renderInput={params => <TextField name="company_name" {...params} />}
                        />
                    </FormControl>
                </Grid>
            )}
            {questions.total_companies > 0 && (
                <Grid item xs={12}>
                    <FormControl>
                        <FormControlLabel onChange={(event, checked) => setViewNewCompany(checked)} control={<Checkbox />} label="Add a company" />
                    </FormControl>
                </Grid>
            )}
            {/* Tech Journey Dropdown */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.tech_journey}>
                    <FormLabel id="tech-journey-label">* How long have you been on your tech journey?</FormLabel>
                    <Autocomplete
                        multiple
                        required
                        selectOnFocus
                        includeInputInList
                        handleHomeEndKeys
                        id="career_journey_choices"
                        aria-labelledby="tech-journey-label"
                        options={questions.career_journey_choices || []} // <-- directly provide a default value here
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

                            return filtered;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.pronouns || option.name}</li>}
                        onChange={(event, value) => {
                            // Update the value to be the index + 1
                            value = value.map((item, index) => index + 1);
                            handleAutocompleteChange('tech_journey', value);
                        }}
                        renderInput={params => <TextField name="tech_journey" {...params} />}
                    />
                    {!!formErrors.tech_journey && <FormHelperText>{formErrors.tech_journey}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {/* Social Connections Header */}
                <Typography variant="h6">Let&apos;s connect</Typography>
                <Typography variant="subtitle2">Add your social to help you connect with the community.</Typography>
            </Grid>

            {/* Social Profiles */}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="linkedin">Your Linkedin Profile</InputLabel>
                    <OutlinedInput
                        label="Your Linkedin Profile"
                        onChange={handleInputChange}
                        name="linkedin"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="instagram">Instagram handle</InputLabel>
                    <OutlinedInput
                        label="Instagram handle"
                        onChange={handleInputChange}
                        name="instagram"
                        startAdornment={<InputAdornment position="start">@</InputAdornment>}
                        type="text"
                        helpertext="It should be @YourUserName"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="github">Your Github Profile</InputLabel>
                    <OutlinedInput
                        label="Your Github Profile"
                        onChange={handleInputChange}
                        name="github"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="twitter">Your Twitter Handle</InputLabel>
                    <OutlinedInput
                        label="Your Twitter Handle"
                        onChange={handleInputChange}
                        name="twitter"
                        startAdornment={<InputAdornment position="start">@</InputAdornment>}
                        type="text"
                        helpertext="It should be @YourUserName"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="youtube">Your Youtube Profile</InputLabel>
                    <OutlinedInput
                        label="Your Youtube Profile"
                        onChange={handleInputChange}
                        name="youtube"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="personal">Your Personal Website</InputLabel>
                    <OutlinedInput
                        label="Your Personal Website"
                        onChange={handleInputChange}
                        name="personal"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default BasicInfoStep;
