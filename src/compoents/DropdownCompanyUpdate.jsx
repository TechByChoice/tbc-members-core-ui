import React, { useState, useEffect, useRef } from 'react';
import { FormControl, FormLabel, TextField, Autocomplete } from '@mui/material';
import { getDropDrownItems } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function DropdownCompanyUpdate({
    error, answers, setAnswers, isRequired, onCompanySelect 
}) {
    const [ companies, setCompanies ] = useState([]);
    const [ selectedCompany, setSelectedCompany ] = useState(answers.select_company || null);

    useEffect(() => {
        setSelectedCompany(answers.select_company || null);
    }, [ answers.select_company ]);

    useEffect(() => {
        // Fetch the list of companies when the component mounts
        async function fetchCompanies() {
            try {
                const response = await getDropDrownItems('companies');
                setCompanies(response.companies);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <FormControl fullWidth variant="outlined">
            <FormLabel id="company-label">* Company</FormLabel>
            <Autocomplete
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                value={selectedCompany}
                options={companies}
                getOptionLabel={option => {
                    return typeof option === 'object' ? option.company_name : '';
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.company_name}
                        <br />
                        {option.company_url}
                    </li>
                )}
                filterOptions={(options, params) => {
                    return filter(options, params);
                }}
                onChange={(event, newValue) => {
                    setSelectedCompany(newValue);
                    setAnswers(prevState => ({
                        ...prevState,
                        select_company: newValue,
                        company: newValue,
                        company_id: newValue?.id,
                    }));
                }}
                renderInput={params => (
                    <TextField {...params} required={isRequired} name="company_name" error={!!error.company_name} inputProps={{ ...params.inputProps }} />
                )}
            />
        </FormControl>
    );
}
