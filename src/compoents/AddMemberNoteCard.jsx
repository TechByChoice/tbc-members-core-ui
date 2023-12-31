import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Chip, Box, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';
import TipTapEditor from './TipTapEditor';

function AddMemberNoteCard({ talentDetails }) {
    const [ formData, setFormData ] = useState();
    const [ newFormData, setNewFormData ] = useState();

    const handleQuillChange = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
    };

    const handleSubmit = () => {};

    return (
        <Card elevation={0} sx={{ position: 'relative' }}>
            <CardContent>
                <>
                    <Typography component="h4" variant="h4">
                        Leave a Note
                    </Typography>
                    <Typography component="body" variant="body2">
                        Uses this section to create private notes from your mentor session.
                    </Typography>
                </>
                <>
                    <TipTapEditor id="mentorship_goals" onFormDataChange={handleQuillChange} />
                </>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
                <Link to={`/job/`}>
                    <Button variant="outlined" onSubmit={handleSubmit} size="small">
                        Submit
                    </Button>
                </Link>
            </Box>
        </Card>
    );
}

export default AddMemberNoteCard;
