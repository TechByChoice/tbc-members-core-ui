import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getBasicSystemInfo, getCompanyList, getMemberData } from '../api-calls';

export default function CompanyDropdown({ onCompanySelect }) {
    const [ companies, setCompanies ] = useState([]);
    const [ selectedCompany, setSelectedCompany ] = useState('');

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchCompanies() {
            try {
                const response = await getBasicSystemInfo();
                setCompanies(response.company_list);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="company-label">Company</InputLabel>
            <Select
                value={selectedCompany}
                onChange={e => {
                    setSelectedCompany(e.target.value);
                    onCompanySelect(e.target.value);
                }}
                label="Company">
                {companies.map(company => (
                    <MenuItem key={company.id} value={company.id}>
                        {company.company_name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
