import { Autocomplete, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '../../providers/AuthProvider';
import { useStatus } from '../../providers/MsgStatusProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { routes } from '../../lib/routes';

const filter = createFilterOptions();

export default function ProfileIdentity({ questions }) {
    const { user } = useAuth();
    const userDetails = user[0];
    const [ formErrors, setFormErrors ] = useState({});
    const {
        statusType, setStatusMessage, setIsAlertOpen, setStatusType 
    } = useStatus();

    const [ identityFormData, setIdentityFormData ] = useState({
        identity_sexuality: [],
        gender_identities: [],
        ethic_identities: [],
        disability: false,
        care_giver: false,
        veteran_status: false,
        is_identity_sexuality_displayed: false,
        is_identity_gender_displayed: false,
        is_identity_ethic_displayed: false,
        is_disability_displayed: false,
        is_care_giver_displayed: false,
        is_veteran_status_displayed: false,
    });

    function handleSave(e) {
        e.preventDefault();
        setIsAlertOpen(false);
        fetch(routes.api.users.updateProfileIdentity(), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(identityFormData),
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
                console.error('Error:', error);
            });
    }

    function handleSelectChange(e) {
        const { name, value } = e.target;
        console.log(name, value, 'SelectChange');

        setIdentityFormData({
            ...identityFormData,
            [name]: value,
        });
    }

    function handleInputChange(e) {
        const {
            name, checked, value, type 
        } = e.target;

        setIdentityFormData({
            ...identityFormData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const handleAutocompleteChange = (name, value) => {
        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(item => item.name || item.ethnicity || item.gender || item.identity || item);
        }
        setIdentityFormData(prev => ({ ...prev, [name]: value }));
    };

    const extractDefaultValues = () => {
        // Extract the skills and roles from userDetails and map them to the corresponding objects in questions.
        // The method to do this depends on the structure of userDetails and questions.
        // Assuming that userDetails contains an array of strings like "role: 20"

        const defaults = {
            identity_sexuality: [],
            gender_identities: [],
            ethic_identities: [],
            disability: false,
            care_giver: false,
            veteran_status: false,
            is_identity_sexuality_displayed: false,
            is_identity_gender_displayed: false,
            is_identity_ethic_displayed: false,
            is_disability_displayed: false,
            is_care_giver_displayed: false,
            is_veteran_status_displayed: false,
        };

        if (userDetails && userDetails?.user_info?.userprofile?.identity_sexuality) {
            userDetails?.user_info?.userprofile?.identity_sexuality.forEach((role, index) => {
                // Parse the role to an integer (if it's a string)
                const roleId = parseInt(role, 10);

                // Find the item in the sexual_identities array where the id matches the roleId
                const identityItem = questions.sexual_identities.find(item => item.id === roleId);

                if (identityItem) {
                    console.log(identityItem, 'item');
                    // If a match is found, add it to the defaults.identity_sexuality array
                    defaults.identity_sexuality.push(identityItem);
                }
            });
        }

        if (userDetails && userDetails?.user_info?.userprofile?.identity_gender) {
            userDetails?.user_info?.userprofile?.identity_gender.forEach(role => {
                // Parse the role to an integer (if it's a string)
                const roleId = parseInt(role, 10);

                // Find the item in the sexual_identities array where the id matches the roleId
                const identityItem = questions.gender_identities.find(item => item.id === roleId);

                if (identityItem) {
                    console.log(identityItem, 'item');
                    // If a match is found, add it to the defaults.identity_sexuality array
                    defaults.gender_identities.push(identityItem);
                }
            });
        }
        if (userDetails && userDetails?.user_info?.userprofile?.identity_ethic) {
            userDetails?.user_info?.userprofile?.identity_ethic.forEach(role => {
                // Parse the role to an integer (if it's a string)
                const roleId = parseInt(role, 10);

                // Find the item in the sexual_identities array where the id matches the roleId
                const identityItem = questions.ethic_identities.find(item => item.id === roleId);

                if (identityItem) {
                    console.log(identityItem, 'item');
                    // If a match is found, add it to the defaults.identity_sexuality array
                    defaults.ethic_identities.push(identityItem);
                }
            });
        }

        defaults.disability = userDetails.user_info.userprofile.disability;
        defaults.care_giver = userDetails.user_info.userprofile.care_giver;
        defaults.veteran_status = userDetails.user_info.userprofile.veteran_status;
        defaults.is_identity_sexuality_displayed = userDetails.user_info.userprofile.is_identity_sexuality_displayed;
        defaults.is_identity_gender_displayed = userDetails.user_info.userprofile.is_identity_gender_displayed;
        defaults.is_identity_ethic_displayed = userDetails.user_info.userprofile.is_identity_ethic_displayed;
        defaults.is_disability_displayed = userDetails.user_info.userprofile.is_disability_displayed;
        defaults.is_care_giver_displayed = userDetails.user_info.userprofile.is_care_giver_displayed;
        defaults.is_veteran_status_displayed = userDetails.user_info.userprofile.is_veteran_status_displayed;

        return defaults;
    };

    useEffect(() => {
        if (userDetails) {
            const defaultValues = extractDefaultValues();

            setIdentityFormData({
                identity_sexuality: defaultValues.identity_sexuality || [],
                gender_identities: defaultValues.gender_identities || [],
                ethic_identities: defaultValues.ethic_identities || [],
                disability: defaultValues.disability || false,
                care_giver: defaultValues.care_giver || false,
                veteran_status: defaultValues.veteran_status || false,
                is_identity_sexuality_displayed: defaultValues.is_identity_sexuality_displayed || false,
                is_identity_gender_displayed: defaultValues.is_identity_gender_displayed || false,
                is_identity_ethic_displayed: defaultValues.is_identity_ethic_displayed || false,
                is_disability_displayed: defaultValues.is_disability_displayed || false,
                is_care_giver_displayed: defaultValues.is_care_giver_displayed || false,
                is_veteran_status_displayed: defaultValues.is_veteran_status_displayed || false,
            });
        }
    }, [ userDetails ]);

    const filterOptions = (options, { inputValue }) => {
        const matcher = new RegExp(inputValue, 'i');
        return options.filter(option => matcher.test(option));
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Identity</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">Update your account details here</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        {/* Question 1 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="identity_sexuality">Please select the sexual identities that best describe you today.</FormLabel>
                                <Autocomplete
                                    multiple
                                    value={identityFormData.identity_sexuality}
                                    selectOnFocus
                                    includeInputInList
                                    handleHomeEndKeys
                                    id="autocomplete-identity_sexuality"
                                    options={questions.sexual_identities || []}
                                    isOptionEqualToValue={(option, value) =>
                                        (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                    }
                                    getOptionLabel={option => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.inputValue) return option.inputValue;
                                        return option.name || option.identity;
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filterOptions(options, params);

                                        const { inputValue } = params;
                                        const isExisting = options.some(option => inputValue === option.name || option.identity);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.name || option.identity}</li>}
                                    onChange={(event, value) => handleAutocompleteChange('identity_sexuality', value)}
                                    renderInput={params => <TextField name="identity_sexuality" {...params} />}
                                />
                                <FormLabel>
                                    If you see any terms you&apos;re not sure about we encourage you to check out this site to learn more about
                                    people&apos;s experiences
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={identityFormData.is_identity_sexuality_displayed}
                                            onChange={handleInputChange}
                                            name="is_identity_sexuality_displayed"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label="Would you like to display your sexuality on your profile?"
                                />
                            </FormControl>
                        </Grid>

                        {/* Question 2 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="identity_gender">Please select the gender identities that best describe you today.</FormLabel>
                                <Autocomplete
                                    value={identityFormData.gender_identities}
                                    multiple
                                    selectOnFocus
                                    includeInputInList
                                    handleHomeEndKeys
                                    id="autocomplete-gender_identities"
                                    options={questions.gender_identities || []}
                                    isOptionEqualToValue={(option, value) =>
                                        (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                    }
                                    getOptionLabel={option => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.inputValue) return option.inputValue;
                                        return option.name || option.gender;
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filterOptions(options, params);

                                        const { inputValue } = params;
                                        const isExisting = options.some(option => inputValue === option.name || option.gender);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.name || option.gender}</li>}
                                    onChange={(event, value) => handleAutocompleteChange('gender_identities', value)}
                                    renderInput={params => <TextField name="gender_identities" {...params} />}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={identityFormData.is_identity_gender_displayed}
                                            onChange={handleInputChange}
                                            name="is_identity_gender_displayed"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label="Would you like to display your gender your profile?"
                                />
                            </FormControl>
                        </Grid>

                        {/* Question 3 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="identity_ethic">Please select all the identities that best describe your ethic background</FormLabel>
                                <Autocomplete
                                    value={identityFormData.ethic_identities}
                                    multiple
                                    selectOnFocus
                                    includeInputInList
                                    handleHomeEndKeys
                                    id="autocomplete-ethic_identities"
                                    options={questions.ethic_identities || []}
                                    isOptionEqualToValue={(option, value) =>
                                        (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                    }
                                    getOptionLabel={option => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.inputValue) return option.inputValue;
                                        return option.name || option.ethnicity;
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filterOptions(options, params);

                                        const { inputValue } = params;
                                        const isExisting = options.some(option => inputValue === option.name || option.ethnicity);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.name || option.ethnicity}</li>}
                                    onChange={(event, value) => handleAutocompleteChange('ethic_identities', value)}
                                    renderInput={params => <TextField name="ethic_identities" {...params} />}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={identityFormData.is_identity_ethic_displayed}
                                            onChange={handleInputChange}
                                            name="is_identity_ethic_displayed"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label="Would you like to display your ethnicity your profile?"
                                />
                            </FormControl>
                        </Grid>

                        {/* Question 4 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="c">
                                    Have you ever identified yourself as someone with a disability? Both visible and non-visible disabilities included.
                                </FormLabel>
                                <Select id="disability" name="disability" onChange={handleSelectChange} value={identityFormData.disability}>
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                    <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                                </Select>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={identityFormData.is_disability_displayed}
                                            onChange={handleInputChange}
                                            name="is_disability_displayed"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label="Would you like to display your disability status your profile?"
                                />
                            </FormControl>
                        </Grid>

                        {/* Question 5 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="care_giver">Do you identify as a care giver?</FormLabel>
                                <Select onChange={handleSelectChange} name="care_giver" value={identityFormData.care_giver} id="care_giver">
                                    <MenuItem value="true">Yes</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                    <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={identityFormData.is_care_giver_displayed}
                                        onChange={handleInputChange}
                                        name="is_care_giver_displayed"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label="Would you like to display your care giver status your profile?"
                            />
                        </Grid>

                        {/* Question 6 */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <FormLabel htmlFor="veteran_status">What is your Veteran Status?</FormLabel>
                                <Select onChange={handleSelectChange} name="veteran_status" value={identityFormData.veteran_status} id="veteran_status">
                                    <MenuItem value="1">I am not a protected veteran</MenuItem>
                                    <MenuItem value="2">I identify as one or more of the classifications of a protected veteran</MenuItem>
                                    <MenuItem value="3">Prefer not to answer</MenuItem>
                                </Select>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={identityFormData.is_veteran_status_displayed}
                                            onChange={handleInputChange}
                                            name="is_veteran_status_displayed"
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label="Would you like to display your veteran status your profile?"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
