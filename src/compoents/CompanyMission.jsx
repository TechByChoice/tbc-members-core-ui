import React from 'react';
import { Box, Typography } from '@mui/material';

const CompanyMission = ({ missionHtml }) => {
    if (!missionHtml) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                About
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: missionHtml }} />
        </Box>
    );
};

export default CompanyMission;
