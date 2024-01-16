import { Autocomplete, Button, FormControl, FormHelperText, FormLabel, Grid, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useStatus } from '../../providers/MsgStatusProvider';
import CompanyDropdown from '../CompanyDropDown';

const filter = createFilterOptions();
export default function WorkPlaceForm({ questions }) {
    const { user } = useAuth();
    const { viewNewCompany, setViewNewCompany } = useState();
    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({});
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    const [ formData, setFormData ] = useState({
        company: [],
        company_id: '',
        company_name: '',
        company_url: '',
        job_roles: [],
    });
    const extractDefaultValues = () => {
        // Extract the skills and roles from userDetails and map them to the corresponding objects in questions.
        // The method to do this depends on the structure of userDetails and questions.
        // Assuming that userDetails contains an array of strings like "role: 20"

        const defaults = {
            company: [],
            company_id: '',
            company_name: '',
            company_url: '',
            job_roles: [],
        };

        if (userDetails && userDetails?.user_info?.talentprofile?.role) {
            userDetails?.user_info?.talentprofile?.role.map((role, index) => {
                // Parse the role to an integer (if it's a string)
                const roleId = parseInt(role.id);
                //
                // // Find the item in the sexual_identities array where the id matches the roleId
                const identityItem = questions.job_roles.find(item => item.id === roleId);
                //
                if (identityItem) {
                    // If a match is found, add it to the defaults.identity_sexuality array
                    defaults.job_roles.push(identityItem);
                }
            });
        }

        if (userDetails && userDetails?.user_info?.current_company) {
            const companyId = parseInt(userDetails.user_info.current_company.id);

            // Find the item in the companies array where the id matches the companyId
            const identityItem = questions.company_list.find(item => item.id === companyId);

            if (identityItem) {
                // If a match is found, add it to the defaults.identity_sexuality array
                defaults.company.push(identityItem);
            }
        }

        return defaults;
    };
    useEffect(() => {
        const defaultValues = extractDefaultValues();
        if (userDetails) {
            setFormData({
                company_name: defaultValues?.company[0]?.company_name,
                company_id: defaultValues?.company[0]?.id,
                job_roles: defaultValues.job_roles,
                company: defaultValues?.company,
                select_company: defaultValues?.company[0] || null,
            });
        }
    }, [ userDetails ]);

    const handelAccountDetails = e => {
        e.preventDefault();
        if (formErrors.job_roles) {
            setIsAlertOpen(true);
            setStatusType('error');
            setStatusMessage('Please update all required fields.');
        } else {
            const url = import.meta.env.VITE_APP_API_BASE_URL + 'user/profile/update/work-place';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    // 'credentials': 'include',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        setIsAlertOpen(true);
                        setStatusType('success');
                        setStatusMessage('Updates have been saved');
                    }
                })
                .catch(error => {
                    setIsAlertOpen(true);
                    setStatusType('error');
                    setStatusMessage('error');
                });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        let updatedValue = value;
        if (name === 'company_url' && !value.startsWith('https://')) {
            updatedValue = `https://${value}`;
        }

        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    let handleAutocompleteChange = (name, value) => {
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(item => item.name || item);
        }
        setFormData(prev => ({ ...prev, [name]: value }));

        if (value.length === 0) {
            setFormErrors({ job_roles: 'Please select a role that best represents   what you do.' });
        } else {
            setFormErrors({});
        }
    };

    const handleCompanyChange = e => {
        let { name, value } = e.target;
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(item => item.name || item);
        }
        setFormData(prev => ({
            ...prev,
            company: value,
        }));
    };

    return (
        <form onSubmit={handelAccountDetails}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Work Place Details</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update details about your job & title</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        {questions?.total_companies <= 0 || viewNewCompany ? (
                            <>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="company_name">Company Name</FormLabel>
                                        <OutlinedInput onChange={handleChange} name="company_name" type="text" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="company_url">Company Website</FormLabel>
                                        <OutlinedInput
                                            onChange={handleChange}
                                            name="company_url"
                                            startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                                            type="text"
                                        />
                                    </FormControl>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="company-label">Please select the company you work with.</FormLabel>
                                    <CompanyDropdown
                                        error={formErrors}
                                        answers={formData}
                                        setAnswers={setFormData}
                                        isRequired={false}
                                        onCompanySelect={handleCompanyChange}
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {/* Job Title Dropdown */}
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.job_roles}>
                                <FormLabel id="job-title-label">What is the job title that best fits your desired or current position?</FormLabel>
                                <Autocomplete
                                    multiple
                                    value={formData.job_roles}
                                    required
                                    selectOnFocus
                                    includeInputInList
                                    handleHomeEndKeys
                                    id="job_roles"
                                    aria-labelledby="job-roles"
                                    options={questions?.job_roles || []} // <-- directly provide a default value here
                                    isOptionEqualToValue={(option, value) =>
                                        (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                    }
                                    getOptionLabel={option => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Check for the special case where the option has an inputValue property
                                        if (option.inputValue) return option.inputValue;

                                        // Existing logic
                                        return option.name;
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some(option => inputValue === option.name);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.pronouns || option.name}</li>}
                                    onChange={(event, value) => handleAutocompleteChange('job_roles', value)}
                                    renderInput={params => <TextField name="job-roles" {...params} />}
                                />
                                {!!formErrors.job_roles && <FormHelperText>{formErrors.job_roles}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button disabled={formErrors.job_roles} variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}
