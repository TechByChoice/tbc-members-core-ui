import { Autocomplete, FormControl, FormHelperText, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useAuth } from '../../providers/AuthProvider';
import { routes } from '@/lib/routes';

const filter = createFilterOptions();

export default function FormMentorApplication({
    formData, setFormData, defaultValues, onFormDataChange 
}) {
    const [ commitmentQuestions, setCommitmentQuestions ] = useState([]);
    const [ newData, setNewData ] = useState([]);
    const [ supportAreas, setSupportAreas ] = useState();
    const { accountDetails, user } = useAuth();

    useEffect(() => {
        fetch(routes.api.mentors.getDetails('commitment_level&fields=mentor_support_areas'), {
            method: 'GET',
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCommitmentQuestions(data.commitment_level);
                setSupportAreas(data.mentor_support_areas);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    useEffect(() => {
        // Initialize formData with defaultValues when the component mounts or defaultValues change
        if (defaultValues) {
            setFormData(prevValue => ({
                commitmentQuestions: {
                    commitment_level: defaultValues?.mentor_profile?.mentor_commitment_level || [],
                    mentor_support_areas: defaultValues?.mentor_support_areas || [],
                    mentee_support_areas: defaultValues?.mentee_profile?.mentee_support_areas || [],
                    commitment_level_id: defaultValues?.mentor_profile?.mentor_commitment_level?.map(item => item.id) || [],
                    mentor_support_areas_id: defaultValues?.mentor_support_areas?.map(item => item.id) || [],
                    mentee_support_areas_id: defaultValues?.mentee_profile?.mentee_support_areas?.map(item => item.id) || [],
                },
            }));
        }
    }, [ defaultValues, setFormData ]);

    const handleCommitmentLevelChange = (event, newValue) => {
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            commitmentQuestions: {
                ...preValue.commitmentQuestions,
                commitment_level_id: newValue.map(item => item.id),
                commitment_level: newValue,
            },
        }));
    };

    const handleSupportAreasChange = (event, newValue) => {
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            commitmentQuestions: {
                ...preValue.commitmentQuestions,
                mentor_support_areas_id: newValue.map(item => item.id),
                mentor_support_areas: newValue,
            },
        }));
    };

    const handleMenteeSupportAreasChange = (event, newValue) => {
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            commitmentQuestions: {
                ...preValue.commitmentQuestions,
                mentee_support_areas_id: newValue.map(item => item.id),
                mentee_support_areas: newValue,
            },
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
                                <Typography variant="body1">
                                    We want to match you with a mentee who shares your values and beliefs, so we would love to learn more about you! Please take a moment
                                    to answer the following questions regarding your personal values.
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
                                        value={formData?.commitmentQuestions?.commitment_level || []}
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
                                        value={formData?.commitmentQuestions?.mentor_support_areas || []}
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
                                            value={formData?.commitmentQuestions?.mentee_support_areas || []}
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
