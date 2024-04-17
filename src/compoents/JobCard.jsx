import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Chip, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';

function JobCard({
    companyLogo, companyName, companyId, jobTitle, jobType, location, salary, description, jobId, match 
}) {
    return (
        <Card sx={{ maxWidth: 345, position: 'relative' }}>
            {match && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        bgcolor: 'secondary.main',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                    }}>
                    <Typography variant="caption" sx={{ color: 'white' }}>
                        25% Match
                    </Typography>
                </Box>
            )}
            <Link to={`/company/${companyId}`}>
                <CardMedia component="img" height="140" image={companyLogo} alt={companyName} sx={{ objectFit: 'contain', background: '#fff', p: 2 }} />
            </Link>
            <CardContent>
                <Link to={`/job/${jobId}`}>
                    <Typography gutterBottom variant="h5" component="div">
                        {jobTitle}
                    </Typography>
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip label={jobType} variant="outlined" sx={{ mr: 1, bgcolor: 'warning.light' }} icon={<WorkOutlineIcon />} />
                    <Typography variant="body2" color="text.secondary">
                        <AttachMoneyIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {salary}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnOutlinedIcon color="action" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        {location}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Link to={`/job/${jobId}`}>
                    <Button variant="outlined" size="small">
                        View Job
                    </Button>
                </Link>
                <FavoriteBorderIcon />
            </Box>
        </Card>
    );
}

export default JobCard;
