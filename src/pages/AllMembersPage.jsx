import React, { Component, useEffect, useState } from 'react';
import {Container,
    Grid,
    Paper,
    List,
    ListItem,
    Card,
    Box,
    Typography,
    Button,
    Pagination,
    PaginationItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import ImageIcon from '@mui/icons-material/Image';
import { routes } from '@/lib/routes';
import MentorCard from '@/compoents/MentorCard';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    // Add your filters here
};

const SearchBar = () => {
    // Search input and controls
};

const ContentArea = () => {
    return <List>{/* Map over your data and return a ListItem for each candidate */}</List>;
};

const CandidateCard = ({ candidate }) => {
    return <Card>{/* Layout the candidate's information here */}</Card>;
};

const MainLayout = () => {
    return (
        <Container maxWidth="xl">
            <SearchBar />
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9}>
                    <ContentArea />
                </Grid>
            </Grid>
            <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Button variant="contained" color="primary">
                    Add Candidate
                </Button>
            </Box>
        </Container>
    );
};

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
        <>
            <div>
                <Typography variant="h3" align="center">
                    View Members
                </Typography>
                <Grid container spacing={4}>
                    {members.length > 1 ? (
                        members?.map((member, index) => (
                            <>
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <Link to={`/member/${member.user.id}`}>
                                            <IconButton edge="start" aria-label="open">
                                                <LaunchIcon />
                                            </IconButton>
                                        </Link>
                                    }>
                                    <Link to={`/member/${member.user.id}`}>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={member.user_profile.photo}
                                                sx={{ width: 100, height: 100 }}
                                                alt={`Image of ${member.user.first_name} ${member.user.last_name[0]}`}
                                                variant="rounded"
                                            />
                                        </ListItemAvatar>
                                    </Link>
                                    <ListItemText
                                        sx={{ ml: 2 }}
                                        primary={`${member.user.first_name} ${member.user.last_name[0]}`}
                                        secondary={`Role: ${member.talent_profile.role}${
                                            member?.company_details?.company_name ? ` Company: ${member.company_details.company_name}` : ''
                                        }`}
                                    />
                                </ListItem>
                            </>
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
            <MainLayout />
        </>
    );
}
