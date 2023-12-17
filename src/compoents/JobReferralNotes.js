import React from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const JobReferralNotes = () => {
  // Replace with your state and methods to handle form submission and changes

  return (
    <Container maxWidth="md">
      <form autoComplete="off">
        <TextField
          fullWidth
          label="Notes"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
      </form>
    </Container>
  );
};

export default JobReferralNotes;
