import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Button } from '@mui/material';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.start.local).toLocaleString();

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={event.logo?.url || 'default_event_image.jpg'} // Replace with a default image if needed
                    alt={event.name.text}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.name.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {eventDate}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        {event.summary || event.description.text} {/* Assuming 'summary' exists, or use 'description' */}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href={event.url} target="_blank">
                    View Event
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;
