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

function OpenRolesStep({
    formErrors, handleInputChange, handleFileChange, handleAutocompleteChange, questions 
}) {
    const [ viewNewCompany, setViewNewCompany ] = React.useState(false);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">What roles are you looking to fill?</Typography>
                <Typography variant="subtitle1">Letting us know the opening you have so we can set your account up for success.</Typography>
            </Grid>

            <Grid item xs={12}>
                <FormLabel id="open-roles">*Select all of the roles you&apos;re looking to fill</FormLabel>
                <DropdownJobRole formErrors={true} isRequired={false} answers={questions} setAnswers={handleAutocompleteChange} />
            </Grid>

            <Grid item xs={12}>
                <FormLabel id="open-roles">*Work Environments</FormLabel>
                <DropdownJobRole formErrors={true} isRequired={false} answers={questions} setAnswers={handleAutocompleteChange} />
            </Grid>

            {/* Postal Code */}
            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.open_role_location}>
                    <FormLabel htmlFor="open_role_location">* What location would this role(s) be for?</FormLabel>
                    <OutlinedInput onChange={handleInputChange} name="open_role_location" />
                    {!!formErrors.open_role_location && <FormHelperText>{formErrors.open_role_location}</FormHelperText>}
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default OpenRolesStep;
