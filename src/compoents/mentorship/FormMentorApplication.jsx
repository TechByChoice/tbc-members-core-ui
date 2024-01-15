import { Autocomplete, FormControl, FormHelperText, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '../../providers/AuthProvider';

const filter = createFilterOptions();

export default function FormMentorApplication({
    formData, setFormData, defaultValues = false, onFormDataChange 
}) {
    const [ commitmentQuestions, setCommitmentQuestions ] = useState([]);
    const [ newData, setNewData ] = useState([]);
    const [ supportAreas, setSupportAreas ] = useState();
    const { accountDetails } = useAuth();

    useEffect(() => {
        // This should be replaced with the appropriate API call
        const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/details/?fields=commitment_level&fields=support_areas';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCommitmentQuestions(data.commitment_level);
                setSupportAreas(data.support_areas);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    const handleCommitmentLevelChange = (event, newValue) => {
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            commitment_level_id: newValue.map(item => item.id),
            commitment_level: newValue,
        }));
    };

    const handleSupportAreasChange = (event, newValue) => {
        console.log(event, newValue);
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            mentor_support_areas_id: newValue.map(item => item.id),
            mentor_support_areas: newValue,
        }));
    };

    const handleMenteeSupportAreasChange = (event, newValue) => {
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            mentee_support_areas_id: newValue.map(item => item.id),
            mentee_support_areas: newValue,
        }));
    };

    return (
        <>
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">Mentorship Support</Typography>
                        <hr />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={12} sm={8} spacing={3} mt={3}>
                                <Typography variant="body">
                                    We want to match you with a mentee who shares your values and beliefs, so we would love to learn more about you! Please
                                    take a moment to answer the following questions regarding your personal values.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="commitment_level">What level of involvement fits your schedule?</FormLabel>
                                    <Autocomplete
                                        multiple
                                        handleHomeEndKeys
                                        onChange={handleCommitmentLevelChange}
                                        id="combo-box-demo"
                                        options={commitmentQuestions}
                                        value={formData?.commitment_level || []}
                                        getOptionLabel={option => {
                                            return option ? option.name : '';
                                        }}
                                        renderInput={params => <TextField {...params} label="Please select all that apply to you" variant="outlined" />}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="mentor_support_areas"> What areas would you like to PROVIDE support in?</FormLabel>
                                    <FormHelperText>Please select all that apply to you</FormHelperText>
                                    <Autocomplete
                                        multiple
                                        selectOnFocus
                                        includeInputInList
                                        handleHomeEndKeys
                                        value={formData?.mentor_support_areas || []}
                                        id="mentor_support_areas"
                                        aria-labelledby="mentor_support_areas-label"
                                        options={supportAreas || []} // <-- directly provide a default value here
                                        getOptionLabel={option => {
                                            return option ? option.name : '';
                                        }}
                                        onChange={handleSupportAreasChange}
                                        renderInput={params => <TextField name="mentor_support_areas" {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            {accountDetails[0]?.is_mentee && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentee_support_areas"> What areas would you like to RECEIVE support in?</FormLabel>
                                        <FormHelperText>Please select all that apply to you</FormHelperText>
                                        <Autocomplete
                                            multiple
                                            selectOnFocus
                                            includeInputInList
                                            handleHomeEndKeys
                                            value={formData?.mentee_support_areas || []}
                                            id="mentee_support_areas"
                                            aria-labelledby="mentee_support_areas-label"
                                            options={supportAreas || []}
                                            getOptionLabel={option => {
                                                return option ? option.name : '';
                                            }}
                                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                            onChange={handleMenteeSupportAreasChange}
                                            renderInput={params => <TextField name="mentee_support_areas" {...params} />}
                                        />
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </>
        </>
    );
}
