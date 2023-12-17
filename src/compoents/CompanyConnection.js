import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

export default function CompanyConnection({ answers, setAnswers }) {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelection = (event, value) => {
      setAnswers(prevState => ({
          ...prevState,
          company_connection: value
      }));
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        How are you connected to this company?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel id="demo-radio-buttons-group-label">
            Knowing how companies treat others at different interaction stages will us push for improments long term.
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleSelection}
            value={answers.company_connection ? answers.company_connection : ''}
          >
            <FormControlLabel value="current_employer" control={<Radio />} label="Current Employer" />
            <FormControlLabel value="past_employer" control={<Radio />} label="Past Employer" />
            <FormControlLabel value="contracting" control={<Radio />} label="Contracting" />
            <FormControlLabel value="interviewing" control={<Radio />} label="Interviewing" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <Grid item xs={12}>
          {selectedOption === 'other' && (
            <TextField
              fullWidth
              label="Add Details"
              variant="outlined"
              margin="normal"
            />
          )}
        </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}