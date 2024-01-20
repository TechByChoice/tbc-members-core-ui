import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import { useStatus } from '../providers/MsgStatusProvider';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { routes } from '@/lib/routes';

const filter = createFilterOptions();

function BookMentorForm({ talentDetails, setOpen }) {
    const [ formData, setFormData ] = useState({});
    const [ supportAreas, setSupportAreas ] = useState();
    const { token } = useAuth();
    const { setStatusMessage, setIsAlertOpen, setStatusType } = useStatus();

    useEffect(() => {
        fetch(routes.api.mentors.getDetails('mentor_support_areas'))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSupportAreas(data.mentor_support_areas);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    const handleSupportAreasChange = (event, newValue) => {
        console.log(formData, 'formData');
        // Call the function passed from the parent component to update the formData state
        setFormData(preValue => ({
            ...preValue,
            mentor_support_areas: newValue.map(item => item.id),
        }));
    };
    const handleSubmit = () => {
        console.log(talentDetails);
        const url = process.env.REACT_APP_API_BASE_URL + `mentorship/mentor/${talentDetails.user.id}/connect/roster/add`;
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    setStatusMessage('Sorry, we ran into an issue, please try again');
                    setIsAlertOpen(true);
                    setStatusType('error');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOpen(false);
                setStatusMessage('Saved your review');
                setIsAlertOpen(true);
                setStatusType('success');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setStatusMessage('Sorry, we ran into an issue, please try again');
                setIsAlertOpen(true);
                setStatusType('error');
            });
    };

    const handelChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Card elevation={0} sx={{ position: 'relative' }}>
            <CardContent>
                <>
                    <FormControl fullWidth>
                        <FormLabel id="mentor_support_areas">Why would you like to connect with this mentor?</FormLabel>
                        <FormHelperText>Please select all that apply to you</FormHelperText>
                        <Autocomplete
                            multiple
                            selectOnFocus
                            includeInputInList
                            handleHomeEndKeys
                            id="mentor_support_areas"
                            aria-labelledby="mentor_support_areas-label"
                            options={supportAreas || []} // <-- directly provide a default value here
                            isOptionEqualToValue={(option, value) =>
                                (option.inputValue && value.inputValue && option.inputValue === value.inputValue) || option === value
                            }
                            getOptionLabel={option => {
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
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            onChange={handleSupportAreasChange}
                            renderInput={params => <TextField name="mentor_support_areas" {...params} />}
                        />
                    </FormControl>
                </>
                <>
                    <FormControl fullWidth>
                        <FormLabel id="mentor_booking_note">
                            Please share any additional details that will help your mentor prep for your next session.
                        </FormLabel>
                        <TextField
                            multiline
                            name="mentor_booking_note"
                            onChange={handelChange}
                            rows={4}
                            aria-label="notes for mentor textarea"
                            placeholder="Leave a note"
                        />
                    </FormControl>
                </>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" onClick={handleSubmit} size="small">
                    Submit
                </Button>
            </Box>
        </Card>
    );
}

export default BookMentorForm;
