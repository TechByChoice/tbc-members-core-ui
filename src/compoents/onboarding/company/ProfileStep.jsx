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
import { RichTextEditor } from '@/compoents/RichTextEditor';
import Box from '@mui/material/Box';
import DropdownIndustries from '@/compoents/DropdownIndustries';
import DropdownCompanySize from '@/compoents/DropdownCompanySize';
import InputLocation from '@/compoents/InputLocation';

const filter = createFilterOptions();

function ProfileStep({
    formErrors, handleInputChange, handleFileChange, handleAutocompleteChange, questions, handleEditorUpdate 
}) {
    const [ viewNewCompany, setViewNewCompany ] = React.useState(false);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">Create your company profile.</Typography>
                <Typography variant="subtitle1">Completing your profile to complete onboarding to the platform.</Typography>
            </Grid>

            {/* Upload Profile Img */}
            <Grid item xs={12}>
                <FormControl error={!!formErrors.logo}>
                    <label htmlFor="logo">*Company Logo</label>
                    <Button variant="outline" component="label">
                        <Input required type="file" hidden onChange={handleFileChange} aria-label="*Upload the company logo" name="logo" />
                    </Button>
                    {!!formErrors.logo && <FormHelperText>{formErrors.logo}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.location}>
                    <FormLabel htmlFor="location">* Company Location</FormLabel>
                    <InputLocation formErrors={formErrors} handleAutocompleteChange={handleAutocompleteChange} />
                    {!!formErrors.location && <FormHelperText>{formErrors.location}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.mission}>
                    <FormLabel htmlFor="mission">* Company Mission</FormLabel>
                    <RichTextEditor onFormDataChange={handleEditorUpdate} id="mission" />
                    {!!formErrors.mission && <FormHelperText>{formErrors.mission}</FormHelperText>}
                </FormControl>
            </Grid>

            {/* Job Title Dropdown */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.company_size}>
                    <FormLabel id="company_size-label">* How large is the company?</FormLabel>
                    <DropdownCompanySize
                        fieldName="company_size"
                        error={formErrors}
                        isRequired={true}
                        answers={questions}
                        handleAutocompleteChange={handleAutocompleteChange}
                    />
                    {!!formErrors.company_size && <FormHelperText>{formErrors.company_size}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.industries}>
                    <FormLabel id="industries-label">* What industry do you work in?</FormLabel>
                    <DropdownIndustries fieldName="industries" isRequired={false} error={formErrors} handleAutocompleteChange={handleAutocompleteChange} />
                    {!!formErrors.industries && <FormHelperText>{formErrors.industries}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                    Company Online Presences
                </Typography>
            </Grid>
            {/* Social Profiles */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.website}>
                    <InputLabel htmlFor="website">* Website</InputLabel>
                    <OutlinedInput
                        requried
                        label="Company Website"
                        onChange={handleInputChange}
                        name="website"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                    {!!formErrors.industries && <FormHelperText>{formErrors.website}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="linkedin">Linkedin Profile</InputLabel>
                    <OutlinedInput
                        label="Linkedin Profile"
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
                    <InputLabel htmlFor="github">Github Account</InputLabel>
                    <OutlinedInput
                        label="Github Account"
                        onChange={handleInputChange}
                        name="github"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="twitter">Twitter Handle</InputLabel>
                    <OutlinedInput
                        label="Twitter Handle"
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
                    <InputLabel htmlFor="youtube">Youtube Profile</InputLabel>
                    <OutlinedInput
                        label="Youtube Profile"
                        onChange={handleInputChange}
                        name="youtube"
                        startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        type="url"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default ProfileStep;
