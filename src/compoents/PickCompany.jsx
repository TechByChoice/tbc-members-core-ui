import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DropdownCompanyUpdate from './DropdownCompanyUpdate';
import AddCompanyForm from './utils/AddCompanyForm';

export default function PickCompany({ formErrors, answers, setAnswers }) {
    const [ displayCompanyForm, setDisplayCompanyForm ] = React.useState(false);
    const [ isCurentCompany, setIsCurentCompany ] = React.useState(false);
    const [ worksAtCompany, setWorksAtCompany ] = React.useState('yes');
    const [ connectionType, setConnectionType ] = React.useState('');

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

    const handleWorksAtCompanyChange = event => {
        setWorksAtCompany(event.target.value);
        setAnswers(prevState => ({
            ...prevState,
            works_at_company: event.target.value === 'yes',
        }));
    };

    const handleConnectionTypeChange = event => {
        setConnectionType(event.target.value);
        setAnswers(prevState => ({
            ...prevState,
            connection_type: event.target.value,
        }));
    };

    function SelectCompany() {
        return (
            <div>
                <Typography variant="h6" gutterBottom>
                    Select a Company
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DropdownCompanyUpdate error={formErrors} answers={answers} setAnswers={setAnswers} onCompanySelect={handleSelection} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox aria-label="Add a new company" onChange={toggleDisplayCompanyForm} inputProps={{ 'aria-label': 'controlled' }} />}
                            label="Add a new company"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <React.Fragment>
            {!displayCompanyForm ? <SelectCompany /> : <AddCompanyForm setAnswers={setAnswers} answers={answers} toggleDisplayCompanyForm={toggleDisplayCompanyForm} />}
            {setIsCurentCompany && (
                <>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Do you currently work at this company?</FormLabel>
                            <RadioGroup aria-label="works-at-company" name="works-at-company" value={worksAtCompany} onChange={handleWorksAtCompanyChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {worksAtCompany === 'no' && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel component="legend">Connection Type</FormLabel>
                                <Select value={connectionType} onChange={handleConnectionTypeChange} displayEmpty inputProps={{ 'aria-label': 'Connection Type' }}>
                                    <MenuItem value="">
                                        <em>Select a connection type</em>
                                    </MenuItem>
                                    <MenuItem value="came_across_job">Came across job</MenuItem>
                                    <MenuItem value="network_request">Someone in my network asked me to share this</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                </>
            )}
        </React.Fragment>
    );
}
