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
import DropdownPronouns from '@/compoents/DropdownPronouns';
import DropdownJobRole from '@/compoents/DropdownJobRole';
import DropdownCompanySimple from '@/compoents/DropdownCompanySimple';
import YearsOfExperienceDropdown from '@/compoents/DropdownYearsOfExperience';

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
                <Typography variant="subtitle1">The following questions will help us learn more about you.</Typography>
            </Grid>
            {/* Pronouns Dropdown */}
            <Grid item xs={12}>
                <DropdownPronouns formErrors={true} isRequired={false} answers={questions} setAnswers={handleAutocompleteChange} />
                <FormControlLabel
                    control={<Checkbox onChange={handleInputChange} name="is_pronouns_displayed" color="primary" size="small" />}
                    label="Check this box to display your pronouns on your talent profile"
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
                    <FormLabel id="job-title-label">* What&apos;s you current (or future) job title?</FormLabel>
                    <DropdownJobRole formErrors={true} isRequired={true} answers={questions} setAnswers={handleAutocompleteChange} />
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
                        <DropdownCompanySimple error={formErrors} isRequired={false} setAnswers={handleAutocompleteChange} answers={questions} />
                    </FormControl>
                </Grid>
            )}

            {/* Tech Journey Dropdown */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.years_of_experience}>
                    <FormLabel id="tech-journey-label">* How long have you been on your tech journey?</FormLabel>
                    <YearsOfExperienceDropdown
                        label="How long have you been on your tech journey?"
                        setAnswers={handleAutocompleteChange}
                        formErrors={formErrors}
                        isRequired={true}
                    />
                    {!!formErrors.years_of_experience && <FormHelperText>{formErrors.years_of_experience}</FormHelperText>}
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
