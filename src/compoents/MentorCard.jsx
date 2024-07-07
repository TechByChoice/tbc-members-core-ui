import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

const MentorCard = ({ mentor }) => {
    // const eventDate = new Date(event.start.local).toLocaleString();
    const onFavoriteClick = () => {
        console.log('saved as fav!');
    };
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            marginTop: '-36px',
                            bgcolor: 'background.paper',
                        }}
                        src={mentor.user_profile.photo}
                        alt={mentor.user.first_name}
                    />
                }
                title={
                    <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                        {mentor.user.first_name} {mentor.user.last_name.slice(0)}.
                    </Typography>
                }
                titleTypographyProps={{ variant: 'h6' }}
                sx={{
                    backgroundColor: 'secondary.main',
                    color: 'common.white',
                    textAlign: 'center',
                    pt: 4, // padding-top to push the title down
                }}
            />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/member/${mentor.user.id}`}>
                        <Button size="small" color="primary">
                            View Profile
                        </Button>
                    </Link>
                </Box>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
                <IconButton aria-label="add to favorites" onClick={onFavoriteClick}>
                    <FavoriteBorderIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default MentorCard;
