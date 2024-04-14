import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { routes } from '@/lib/routes';
import { Link } from 'react-router-dom';

export default function AllCompaniesPage({}) {
    const [ companies, setCompanies ] = useState([]);
    const [ error, setError ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalCompanies, setTotalCompanies ] = useState(1);
    const [ pageSize, setPageSize ] = useState(50);
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

    useEffect(() => {
        fetchCompanies(currentPage, pageSize, searchTerm);
    }, [ currentPage, searchTerm ]);

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
            <Grid container spacing={4}>
                {companies?.length > 0 ? (
                    companies.map((company, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Typography variant="body1">
                                Item:{index + 1} Id: {company.id} Name:{company.company_name}
                            </Typography>
                            <Link to={`/company/${company.id}`}>
                                <Button variant="outlined">View</Button>
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <p>Loading companies...</p>
                )}
            </Grid>
            <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous Page
            </Button>
            <Button disabled={currentPage === Math.ceil(totalCompanies / pageSize)} onClick={() => setCurrentPage(currentPage + 1)}>
                Next Page
            </Button>
        </div>
    );
}
