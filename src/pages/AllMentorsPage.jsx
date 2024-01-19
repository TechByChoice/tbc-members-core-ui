import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EventCard from '../compoents/EventCard';
import { Grid } from '@mui/material';
import MentorCard from '../compoents/MentorCard';
import { routes } from '@/lib/routes';

export default function AllMentorsPage({}) {
    const [ mentors, setMentors ] = useState([]);

    useEffect(() => {
        fetch(routes.api.mentors.list(), {
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
                setMentors(data); // Assuming the data object has an 'events' property
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <div>
            All Mentors
            <Grid container spacing={4}>
                {mentors ? (
                    mentors.map((mentor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <MentorCard mentor={mentor} />
                        </Grid>
                    ))
                ) : (
                    <p>Loading events...</p> // Or any other loading indicator
                )}
            </Grid>
        </div>
    );
}
