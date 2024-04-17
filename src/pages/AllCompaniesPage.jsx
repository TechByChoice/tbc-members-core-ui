import React, { useEffect, useState } from 'react';
import {Grid,
    Typography,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Chip,
    TablePagination,
    Paper,} from '@mui/material';
import { routes } from '@/lib/routes';
import { Link } from 'react-router-dom';

export default function AllCompaniesPage({}) {
    const [ companies, setCompanies ] = useState([]);
    const [ error, setError ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalCompanies, setTotalCompanies ] = useState(0);
    const [ pageSize, setPageSize ] = useState(5);
    const [ searchTerm, setSearchTerm ] = useState('');

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const fetchCompanies = (page, pageSize, searchTerm) => {
        const params = new URLSearchParams({ page, page_size: pageSize, company_name: searchTerm.trim() });
        fetch(`http://localhost:8000/company-profile/info/?${params.toString()}`, {
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
                setCompanies(data.results);
                setTotalCompanies(data.count);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
                setError('Failed to fetch companies.');
            });
    };

    const handleChangePage = (event, newPage) => {
        if (newPage === 0) {
            return setCurrentPage(1);
        }
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        alert(event.target.value);
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchCompanies(currentPage, pageSize, searchTerm);
    }, [
        currentPage,
        pageSize,
        searchTerm 
    ]);

    return (
        <div>
            <Typography variant="h1">View Companies</Typography>
            <Typography variant="h4">Search</Typography>
            <FormControl fullWidth>
                <InputLabel htmlFor="search">Search</InputLabel>
                <OutlinedInput
                    value={searchTerm}
                    onKeyDown={e => {
                        if (e.key === 'Enter') fetchCompanies(1, pageSize, searchTerm);
                    }}
                    onChange={handleSearchChange}
                    label="Search"
                    name="search"
                    id="search"
                    type="text"
                />
            </FormControl>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Companies</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Loop through companies data and create rows */}
                            {companies.map((company, index) => (
                                <TableRow key={index} hover>
                                    <TableCell component="th" scope="row">
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Link to={`/company/${company.id}`}>
                                                    <Avatar alt={`${company.company_name} Logo`} sx={{ width: 100, height: 100 }} variant="rounded" src={company.logo} />
                                                </Link>
                                            </Grid>
                                            <Grid item ml={2}>
                                                <Link to={`/company/${company.id}`}>
                                                    <Typography variant="h6">{company.company_name}</Typography>
                                                </Link>
                                                {company?.reviews[0]?.average_rating && (
                                                    <Typography variant="body2">Rating: {company?.reviews[0]?.average_rating?.toFixed(1)}/5</Typography>
                                                )}
                                                {company?.company_size && <Typography variant="body2">Company Size: {company?.company_size}</Typography>}
                                                {company?.city && (
                                                    <Typography variant="body2">
                                                        Location: {company?.city}, {company?.state}{' '}
                                                    </Typography>
                                                )}
                                                {company?.jobs && <Typography variant="body2">Open Roles: {company?.jobs.length}</Typography>}
                                                {company.industries.map((item, index) => {
                                                    return (
                                                        <>
                                                            <Chip key={index} label={item.name} />
                                                        </>
                                                    );
                                                })}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        50
                    ]}
                    component="div"
                    count={totalCompanies}
                    rowsPerPage={pageSize}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
