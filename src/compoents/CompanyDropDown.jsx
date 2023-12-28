import React, { useState, useEffect, useRef } from 'react';
import { FormControl, FormLabel, TextField, Autocomplete } from '@mui/material';
import { getBasicSystemInfo } from '../api-calls';
import { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function CompanyDropdownUpdate({
    error, answers, setAnswers, onCompanySelect, isRequired 
}) {
    const [ companies, setCompanies ] = useState([]);
    const [ selectedCompany, setSelectedCompany ] = useState(null);

    useEffect(() => {
        const firstCompany = Array.isArray(answers?.company) ? answers?.company[0] : null;
        setSelectedCompany(answers.select_company || firstCompany || null);
    }, [ answers?.select_company || answers?.company ]);

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
            <FormLabel id="company-label">{isRequired && <>*</>} Company</FormLabel>
            <Autocomplete
                required
                selectOnFocus
                includeInputInList
                handleHomeEndKeys
                value={selectedCompany}
                options={companies}
                getOptionLabel={option => {
                    return typeof option === 'object' ? option.company_name : '';
                }}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
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
                renderInput={params => <TextField {...params} name="company_name" error={!!error.company_name} inputProps={{ ...params.inputProps }} />}
            />
        </FormControl>
    );
}
