import {
    Typography,
    FormControl,
    FormLabel,
    TextField,
    Card,
    Button,
    Input, Grid, Autocomplete, InputAdornment, OutlinedInput, InputLabel, FormHelperText, CardContent
} from '@mui/material';
import React from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


function CompanyTermsPage({formErrors, handleInputChange, handleFileChange, handleAutocompleteChange, questions}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">Creating an account means you agree to our service agreement</Typography>
                <Typography variant="subtitle1">The following details is a summary of our service agreement and cost of
                    using the platform</Typography>
                <Card variant="outlined">
                    <CardContent>
                        Details about the contract
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleInputChange}
                            name="confirm_service_agreement"
                            color="primary"
                            size="small"
                        />
                    }
                    label="Do you agree to the terms and conditions?"
                />
            </Grid>
        </Grid>
    );
}

export default CompanyTermsPage;
