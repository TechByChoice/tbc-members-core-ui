import React, { useState, useEffect } from 'react';
import { Autocomplete, FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();
export default function DropdownCompanySize({
    isRequired, error, setAnswers = false, handleAutocompleteChange 
}) {
    const [ companySize, setCompanySize ] = useState([]);
    const [ selectedDepartment, setSelectedDepartment ] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchDepartments() {
            try {
                const response = await getDropDrownItems('company_size');
                const clean_data = response.company_size.map(([ id, name ]) => ({ id, name }));
                console.log(clean_data);
                setCompanySize(clean_data);
            } catch (error) {
                console.error('Error fetching company_size:', error);
            }
        }

        fetchDepartments();
    }, [ token ]);

    return (
        <Select labelId="how-connection-made-label" id="how-connection-made" name="how_connection_made" onChange={handleAutocompleteChange}>
            {companySize?.map(option => (
                <MenuItem key={option.id} value={option.name}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    );
}
