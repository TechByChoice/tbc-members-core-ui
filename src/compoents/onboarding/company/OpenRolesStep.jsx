import { Typography, FormControl, FormLabel, Grid, OutlinedInput, FormHelperText } from '@mui/material';
import React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import DropdownJobRole from '@/compoents/DropdownJobRole';
import DropdownRemote from '@/compoents/DropdownRemote';

const filter = createFilterOptions();

function OpenRolesStep({
    formErrors, handleInputChange, handleAutocompleteChange, questions 
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
                <FormControl fullWidth error={!!formErrors.job_roles}>
                    <FormLabel id="open-roles">*Select all of the roles you&apos;re looking to fill</FormLabel>
                    <DropdownJobRole formErrors={true} isRequired={false} answers={questions} setAnswers={handleAutocompleteChange} />
                    {!!formErrors.job_roles && <FormHelperText>{formErrors.job_roles}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.on_site_remote}>
                    <FormLabel id="open-roles">*Work Environments</FormLabel>
                    <DropdownRemote isRequired={false} answers={questions} error={formErrors} handleAutocompleteChange={handleAutocompleteChange} />
                    {!!formErrors.on_site_remote && <FormHelperText>{formErrors.on_site_remote}</FormHelperText>}
                </FormControl>
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
