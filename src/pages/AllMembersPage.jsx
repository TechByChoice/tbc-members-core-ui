import React, { Component, useEffect, useState } from 'react';
import { Button, Grid, Pagination, PaginationItem } from '@mui/material';
import { routes } from '@/lib/routes';
import Typography from '@mui/material/Typography';
import MentorCard from '@/compoents/MentorCard';

export default function AllMembersPage({}) {
    const [ members, setMembers ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ nextUrl, setNextUrl ] = useState();
    const itemsPerPage = 5;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    const ArrowBackIcon = () => {
        return (
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </Button>
        );
    };
    const ArrowForwardIcon = () => {
        return (
            <Button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </Button>
        );
    };

    useEffect(() => {
        fetch(`${routes.api.users.getAllMembers()}?page=${currentPage}&limit=${itemsPerPage}`, {
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
                setMembers(data.members.results);
                setNextUrl(data.members.next);
                setTotalItems(data.members.count);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [ currentPage, itemsPerPage ]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <div>
            <Typography variant="h3" align="center">
                View Members
            </Typography>
            <Grid container spacing={4}>
                {members.length > 1 ? (
                    members?.map((mentor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <MentorCard mentor={mentor}></MentorCard>
                        </Grid>
                    ))
                ) : (
                    <p>Loading Members...</p>
                )}
            </Grid>
            <Pagination
                count={totalPages}
                onChange={handlePageChange}
                renderItem={item => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
            />
        </div>
    );
}
