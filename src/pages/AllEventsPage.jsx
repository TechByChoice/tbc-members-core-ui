import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EventCard from '../compoents/EventCard';
import { Grid } from '@mui/material';
import { routes } from '@/lib/routes';

export default function AllEventsPage({}) {
    const [ events, setEvents ] = useState([]);

    useEffect(() => {
        fetch(routes.api.events.list(), {
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
