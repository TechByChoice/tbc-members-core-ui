import React, { Component, useEffect, useState } from 'react';
import { Grid, Paper, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip } from '@mui/material';
import { routes } from '@/lib/routes';
import { Link } from 'react-router-dom';

export default function AllMembersPage({}) {
    const [ members, setMembers ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ nextUrl, setNextUrl ] = useState();
    const [ rowsPerPageOptions, setRowsPerPageOptions ] = useState([
        5,
        10,
        25,
        50
    ]);
    const itemsPerPage = 5;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${routes.api.users.getAllMembers()}?page=${currentPage}&limit=${rowsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMembers(data.members.results);
                setNextUrl(data.members.next);
                setTotalItems(data.members.count);

                // Dynamically calculate rows per page options based on total items
                const newRowsPerPageOptions = calculateRowsPerPageOptions(totalItems);
                setRowsPerPageOptions(newRowsPerPageOptions);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, [ currentPage, rowsPerPage ]);

    const calculateRowsPerPageOptions = totalItems => {
        const options = [
            5,
            10,
            25,
            50,
            100
        ];
        return options.filter(option => option <= totalItems);
    };

    const handleChangePage = (event, newPage) => {
        if (newPage === 0) {
            return setCurrentPage(1);
        }
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <>
            <Typography variant="h2">Get to know your community</Typography>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell>Skills</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Loop through members data and create rows */}
                            {members.map((member, index) => (
                                <TableRow key={index} hover>
                                    <TableCell component="th" scope="row">
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Link to={`/member/${member.user.id}`}>
                                                    <Avatar
                                                        alt={`${member.user.first_name} Image`}
                                                        sx={{ width: 100, height: 100 }}
                                                        variant="rounded"
                                                        src={member.user_profile.photo}
                                                    />
                                                </Link>
                                            </Grid>
                                            <Grid item ml={2}>
                                                <Link to={`/member/${member.user.id}`}>
                                                    <Typography variant="h6">{member.user.first_name}</Typography>
                                                </Link>
                                                <Typography variant="body1" color="textSecondary">
                                                    {member.talent_profile.role[0]}
                                                </Typography>
                                                {member?.company_details?.company_name && (
                                                    <Typography variant="body2" color="textSecondary">
                                                        Company: {member.company_details.company_name}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid display="flex" direction="row" justifyContent="space-between" style={{ maxWidth: '458px' }}>
                                            {member?.user?.is_team && (
                                                <div>
                                                    <Chip size="small" variant="outlined" label="Core Team" color="secondary" />
                                                </div>
                                            )}
                                            {member?.user?.is_community_recruiter && (
                                                <div>
                                                    <Chip size="small" variant="outlined" label="Community Recruiter" color="secondary" />
                                                </div>
                                            )}
                                            {member?.user?.is_volunteer && (
                                                <div>
                                                    <Chip size="small" variant="outlined" label="TBC Volunteer" color="secondary" />
                                                </div>
                                            )}
                                            {member?.user?.is_mentor && member?.user?.is_mentor_profile_active && member?.user?.is_mentor_training_complete && (
                                                <div>
                                                    <Chip size="small" variant="outlined" label="Mentor" color="primary" />
                                                </div>
                                            )}
                                        </Grid>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {member.talent_profile.skills.map((skill, index) => {
                                            return (
                                                <>
                                                    <Chip key={index} label={skill} />
                                                </>
                                            );
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
