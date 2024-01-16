import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EventCard from '../compoents/EventCard';
import { Grid } from '@mui/material';

export default function AllEventsPage({}) {
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        const url = import.meta.env.VITE_APP_API_BASE_URL + 'event/';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEvents(data.events); // Assuming the data object has an 'events' property
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <div>
            All Events
            <Grid container spacing={4}>
                {events ? (
                    events.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <EventCard event={event} />
                        </Grid>
                    ))
                ) : (
                    <p>Loading events...</p> // Or any other loading indicator
                )}
            </Grid>
        </div>
    );
}
