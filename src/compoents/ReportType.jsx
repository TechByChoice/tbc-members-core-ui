import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";

export default function ReportType({ answers, setAnswers }) {
    const handleSelection = (event, value) => {
        setAnswers(prevState => ({
            ...prevState,
            report_type: value
        }));
    };

    return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        What type of report are you looking to submit today?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel id="report_type">
            As a reminder any personalized information will never be shared publicly for any reports. Please
            view this link to learn how we handel your data and how we display each review.
          </FormLabel>
          <RadioGroup
            aria-labelledby="report_type"
            name="radio-buttons-group"
            onChange={handleSelection}
            value={answers.report_type ? answers.report_type : ''}
          >
            <FormControlLabel value="company_review" control={<Radio />} label="Company Review" />
            <FormControlLabel value="incident_report" control={<Radio />} label="Incident Report" />
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}