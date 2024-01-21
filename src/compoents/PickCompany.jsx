import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CompanyDropdownUpdate from './CompanyDropDownUpdate';
import AddCompanyForm from './utils/AddCompanyForm';

export default function PickCompany({ formErrors, answers, setAnswers }) {
    const [ displayCompanyForm, setDisplayCompanyForm ] = React.useState(false);

    const handleSelection = e => {
        setAnswers(prevState => ({
            ...prevState,
            select_company: e,
        }));
    };

    const toggleDisplayCompanyForm = () => {
        setDisplayCompanyForm(prevState => !prevState);
        if (!displayCompanyForm) {
            setAnswers(prevState => ({
                ...prevState,
                select_company: null,
            }));
        }
    };

    function SelectCompany() {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Select a Company
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CompanyDropdownUpdate error={formErrors} answers={answers} setAnswers={setAnswers} onCompanySelect={handleSelection} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox aria-label="Add a new company" onChange={toggleDisplayCompanyForm} inputProps={{ 'aria-label': 'controlled' }} />
                            }
                            label="Add a new company"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <React.Fragment>
            {!displayCompanyForm ? (
                <SelectCompany />
            ) : (
                <AddCompanyForm setAnswers={setAnswers} answers={answers} toggleDisplayCompanyForm={toggleDisplayCompanyForm} />
            )}
        </React.Fragment>
    );
}
