import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    InputAdornment,
    OutlinedInput, TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../providers/AuthProvider";
import {createFilterOptions} from "@mui/material/Autocomplete";
import {useStatus} from "../../providers/MsgStatusProvider";

const filter = createFilterOptions();
export default function WorkPlaceForm({questions}) {
    const {user} = useAuth();
    const {viewNewCompany, setViewNewCompany} = useState()
    const userDetails = user[0]
    const [formErrors, setFormErrors] = useState({});
    const {statusType, setStatusMessage, setIsAlertOpen, setStatusType} = useStatus();

    const [formData, setFormData] = useState({
        company_name: '',
        company_url: '',
        job_roles: [],
        company_id: '',
        company: []
    });
    const extractDefaultValues = () => {
        // Extract the skills and roles from userDetails and map them to the corresponding objects in questions.
        // The method to do this depends on the structure of userDetails and questions.
        // Assuming that userDetails contains an array of strings like "role: 20"

        const defaults = {
            company_name: '',
            company_url: '',
            job_roles: [],
            company_id: '',
            company: []
        };

        if (userDetails && userDetails?.user_info?.talentprofile?.role) {
            userDetails?.user_info?.talentprofile?.role.map((role, index) => {
                // Parse the role to an integer (if it's a string)
                // const roleId = parseInt(role, 10);
                //
                // // Find the item in the sexual_identities array where the id matches the roleId
                // const identityItem = questions.job_roles.find(item => item.id === roleId);
                //
                // if (identityItem) {
                //     console.log(identityItem, 'item');
                //     // If a match is found, add it to the defaults.identity_sexuality array
                //     defaults.job_roles.push(identityItem);
                // }
                // defaults.job_roles.push(role.name);

            });
        }

        // if (userDetails && userDetails?.user_info?.current_company) {
        //     const companyId = parseInt(userDetails.user_info.current_company.id);
        //
        //     // Find the item in the companies array where the id matches the companyId
        //     const identityItem = questions.company_list.find(item => item.id === companyId);
        //
        //     if (identityItem) {
        //         console.log(identityItem, 'item');
        //         // If a match is found, add it to the defaults.identity_sexuality array
        //         defaults.company.push(identityItem);
        //     }
        // }

        return defaults;
    };
    useEffect(() => {
        const defaultValues = extractDefaultValues()
        if (userDetails) {
            setFormData({
                company_name: userDetails?.user_info?.userprofile.company_name || '',
                job_roles: defaultValues.job_roles,
                company: defaultValues.company
            });
        }
    }, [userDetails]);

    const handelAccountDetails = (e) => {
        e.preventDefault()

        const url = process.env.REACT_APP_API_BASE_URL + 'user/profile/update/work-place';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
                // 'credentials': 'include',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setIsAlertOpen(true);
                    setStatusType('success');
                    setStatusMessage('Updates have been saved');
                }
            })
            .catch((error) => {

                setIsAlertOpen(true);
                setStatusType('error');
                setStatusMessage('error');
            });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        let updatedValue = value;
        if (name === "company_url" && !value.startsWith("https://")) {
            updatedValue = `https://${value}`;
        }

        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    const handleAutocompleteChange = (name, value) => {

        // Check if the value is an array (since Autocomplete can be multiple)
        if (Array.isArray(value)) {
            value = value.map(item =>
                item.name || item
            );

        } else {
            value = item.inputValue || item[name] || item;

        }
        setFormData(prev => ({...prev, [name]: value}));
    };

    return (
        <form onSubmit={handelAccountDetails}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Work Place Details</Typography>
                    <hr/>
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
                                        <OutlinedInput onChange={handleChange}
                                                       name="company_name"
                                                       type="text"/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="company_url">Company Website</FormLabel>
                                        <OutlinedInput onChange={handleChange}
                                                       name="company_url"
                                                       startAdornment={<InputAdornment
                                                           position="start">https://</InputAdornment>}
                                                       type="text"/>
                                    </FormControl>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="company-label">Please select the company you work with.</FormLabel>
                                    <Autocomplete
                                        multiple
                                        selectOnFocus
                                        value={formData.company}
                                        includeInputInList
                                        handleHomeEndKeys
                                        id='company_list'
                                        aria-labelledby="company-label"
                                        options={questions?.company_list || []} // <-- directly provide a default value here
                                        isOptionEqualToValue={(option, value) =>
                                            (option.inputValue) || option === value
                                        }
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            // Check for the special case where the option has an inputValue property
                                            if (option.inputValue) return option.inputValue;

                                            // Existing logic
                                            return option.company_name
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            const {inputValue} = params;
                                            // Suggest the creation of a new value
                                            const isExisting = options.some((option) => inputValue === option.company_name);
                                            if (inputValue !== '' && !isExisting) {
                                                filtered.push({
                                                    inputValue,
                                                    name: `Add "${inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        renderOption={(props, option) =>
                                            <li {...props}>{option.company_name || option.name}</li>}
                                        onChange={(event, value) => handleAutocompleteChange("company_id", value)}
                                        renderInput={(params) => <TextField name="company_id" {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {/* Job Title Dropdown */}
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!formErrors.job_roles}>
                                <FormLabel id="job-title-label">What is the job title that best fits your desired or
                                    current
                                    position?</FormLabel>
                                <Autocomplete
                                    multiple
                                    value={formData.job_roles}
                                    required
                                    selectOnFocus
                                    includeInputInList
                                    handleHomeEndKeys
                                    id='job_roles'
                                    aria-labelledby="job-title-label"
                                    options={questions?.job_roles || []} // <-- directly provide a default value here
                                    isOptionEqualToValue={(option, value) =>
                                        (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                    }
                                    getOptionLabel={(option) => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Check for the special case where the option has an inputValue property
                                        if (option.inputValue) return option.inputValue;

                                        // Existing logic
                                        return option.name
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const {inputValue} = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.name);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    renderOption={(props, option) =>
                                        <li {...props}>{option.pronouns || option.name}</li>}
                                    onChange={(event, value) => handleAutocompleteChange("job_roles", value)}
                                    renderInput={(params) => <TextField name="job-title-label" {...params} />}
                                />
                                {!!formErrors.job_roles && <FormHelperText>{formErrors.job_roles}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button variant="contained"
                                    color="primary"
                                    type="submit">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
