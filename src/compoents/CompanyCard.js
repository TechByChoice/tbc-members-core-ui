import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

function CompanyCard({ company }) {
  return (
    <Card style={{ maxWidth: 345 }}>
      {/* Company Logo */}
      <CardMedia
        component="img"
        height="140"
        image={company?.logo}
        alt={`${company.company_name} logo`}
      />

      <CardContent>
        <Typography variant="h5" component="div">
          {company.company_name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {company.size}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Industry: {company.industry}
        </Typography>

        {/*<Grid container spacing={3} style={{ marginTop: '1rem' }}>*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <Typography variant="body2">Diversity Rating:</Typography>*/}
        {/*    <Typography variant="body1">{company.diversityRating}</Typography>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <Typography variant="body2">Org Rating:</Typography>*/}
        {/*    <Typography variant="body1">{company.orgRating}</Typography>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <Typography variant="body2">Company Rating:</Typography>*/}
        {/*    <Typography variant="body1">{company.companyRating}</Typography>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </CardContent>
    </Card>
  );
}

export default CompanyCard;
