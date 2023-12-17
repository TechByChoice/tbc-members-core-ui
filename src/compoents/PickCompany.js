import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CompanyDropdown from "./CompanyDropDownUpdate";
import CompanyDropdownUpdate from "./CompanyDropDownUpdate";
import {useEffect} from "react";

export default function PickCompany({answers, setAnswers}) {
    const [displayCompanyForm, setDisplayCompanyForm] = React.useState(false);

    useEffect(() => {
        console.log(answers)
    }, [setAnswers, answers]);
    // const handleSelection = (event, value) => {
    //     setAnswers(prevState => ({
    //         ...prevState,
    //         select_company: value
    //     }));
    // };
    const handleSelection = (e) => {
        console.log(e, 'selectedCompanyId')
        setAnswers(prevState => ({
            ...prevState,
            select_company: e
        }));

        console.log(answers, 'answers')
    };

    const toggleDisplayCompanyForm = () => setDisplayCompanyForm(prevState => !prevState);

    function SelectCompany() {

        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Select a Company
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CompanyDropdownUpdate answers={answers} setAnswers={setAnswers} onCompanySelect={handleSelection}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox
                                label="Add a new company"
                                onChange={toggleDisplayCompanyForm}
                                inputProps={{'aria-label': 'controlled'}}
                            />}
                            label="Add a new company"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    function AddCompanyForm() {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Add a Company
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="companyName"
                            name="companyName"
                            label="Company name"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="company_url"
                            name="company_url"
                            label="Company URL"
                            fullWidth
                            autoComplete="url"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox
                                label="Add a new company"
                                onChange={toggleDisplayCompanyForm}
                                inputProps={{'aria-label': 'controlled'}}
                            />}
                            label="Select company from dropdown"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <React.Fragment>
            {!displayCompanyForm ? <SelectCompany/> : <AddCompanyForm/>}
        </React.Fragment>
    );
}