import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';

function AddCompanyForm({ setAnswers, answers, toggleDisplayCompanyForm }) {
    const handelChange = event => {
        const { name, value } = event.target;
        setAnswers(prevFormData => ({ ...prevFormData, [name]: value }));
    };
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Add a Company
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="company_name"
                        name="company_name"
                        value={answers.company_name || ''}
                        label="Company Name"
                        fullWidth
                        variant="outlined"
                        onChange={handelChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        onChange={handelChange}
                        value={answers.company_url || ''}
                        id="company_url"
                        name="company_url"
                        label="Company URL"
                        fullWidth
                        autoComplete="company_url"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox aria-label="Add a new company" onChange={toggleDisplayCompanyForm} inputProps={{ 'aria-label': 'controlled' }} />
                        }
                        label="Select company from dropdown"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default AddCompanyForm;
