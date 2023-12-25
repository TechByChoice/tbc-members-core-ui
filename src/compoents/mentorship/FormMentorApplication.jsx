import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import {useAuth} from "../../providers/AuthProvider";


const filter = createFilterOptions();

export default function FormMentorApplication({onFormDataChange}) {
    const [commitmentQuestions, setCommitmentQuestions] = useState();
    const [supportAreas, setSupportAreas] = useState();
    const [selectedCommitmentLevel, setSelectedCommitmentLevel] = useState([]);
    const [selectedSupportAreas, setSelectedSupportAreas] = useState([]);
    const [selectedMenteeSupportAreas, setSelectedMenteeSupportAreas] = useState([]);
    const {accountDetails} = useAuth()

    useEffect(() => {
        // This should be replaced with the appropriate API call
        const url = process.env.REACT_APP_API_BASE_URL + 'mentorship/details/?fields=commitment_level&fields=mentor_support_areas';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCommitmentQuestions(data.commitment_level)
                setSupportAreas(data.mentor_support_areas)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    const handleCommitmentLevelChange = (event, newValue) => {
    setSelectedCommitmentLevel(newValue);
    // Call the function passed from the parent component to update the formData state
    onFormDataChange({
      commitment_level: newValue.map(item => item.id),
    });
    };

    const handleSupportAreasChange = (event, newValue) => {
    setSelectedSupportAreas(newValue);
    // Call the function passed from the parent component to update the formData state
    onFormDataChange({
      mentor_support_areas: newValue.map(item => item.id),
    });
    };

    const handleMenteeSupportAreasChange = (event, newValue) => {
    setSelectedMenteeSupportAreas(newValue);
    // Call the function passed from the parent component to update the formData state
    onFormDataChange({
      mentee_support_areas: newValue.map(item => item.id),
    });
    };

    return (
        <>
            <>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6">Mentorship Support</Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container>

                            <Grid item xs={12} sm={8} spacing={3} mt={3}>
                                <Typography variant="body">
                                    We want to match you with a mentee who shares your values and beliefs, so we would
                                    love to learn more about you! Please take a moment to answer the following questions
                                    regarding your personal values.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="commitment_level">What level of involvement fits your schedule sense
                                        to
                                        you?</FormLabel>
                                    <Autocomplete
                                        multiple
                                        selectOnFocus
                                        includeInputInList
                                        handleHomeEndKeys
                                        id='company_list'
                                        name='company_list'
                                        aria-labelledby="commitment_level"
                                        options={commitmentQuestions || []} // <-- directly provide a default value here
                                        isOptionEqualToValue={(option, value) =>
                                            (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                        }
                                        getOptionLabel={(option) => {
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
                                            <li {...props}>{option.name}</li>}
                                        onChange={handleCommitmentLevelChange}
                                        renderInput={(params) => <TextField name="commitment_level" {...params} />}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel id="mentor_support_areas"> What areas would you like to PROVIDE support
                                        in?</FormLabel>
                                    <FormHelperText>Please select all that apply to you</FormHelperText>
                                    <Autocomplete
                                        multiple
                                        selectOnFocus
                                        includeInputInList
                                        handleHomeEndKeys
                                        id='mentor_support_areas'
                                        aria-labelledby="mentor_support_areas-label"
                                        options={supportAreas || []} // <-- directly provide a default value here
                                        isOptionEqualToValue={(option, value) =>
                                            (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                        }
                                        getOptionLabel={(option) => {
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
                                            <li {...props}>{option.name}</li>}
                                        onChange={handleSupportAreasChange}
                                        renderInput={(params) => <TextField name="mentor_support_areas" {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            {accountDetails[0]?.is_mentee && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <FormLabel id="mentee_support_areas"> What areas would you like to RECEIVE
                                            support
                                            in?</FormLabel>
                                        <FormHelperText>Please select all that apply to you</FormHelperText>
                                        <Autocomplete
                                            multiple
                                            selectOnFocus
                                            includeInputInList
                                            handleHomeEndKeys
                                            id='mentee_support_areas'
                                            aria-labelledby="mentee_support_areas-label"
                                            options={supportAreas || []} // <-- directly provide a default value here
                                            isOptionEqualToValue={(option, value) =>
                                                (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                                            }
                                            getOptionLabel={(option) => {
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
                                                <li {...props}>{option.name}</li>}
                                            onChange={handleMenteeSupportAreasChange}
                                            renderInput={(params) => <TextField
                                                name="mentee_support_areas" {...params} />}
                                        />
                                    </FormControl>
                                </Grid>
                            )}

                        </Grid>
                    </Grid>
                </Grid>
            </>

        </>
    )
}