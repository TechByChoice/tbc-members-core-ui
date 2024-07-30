import { Typography, FormControl, FormLabel, TextField, Button, Input, Grid, Autocomplete, Select, MenuItem, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GenderDropdown from '@/compoents/DropdownGender';
import EthicDropdown from '@/compoents/DropdownEthic';
import SexualityDropdown from '@/compoents/DropdownSexuality';
import { useAuth } from '@/providers/AuthProvider';

const filter = createFilterOptions();

function IdentityQuestionsStep({
    answers, questions, handleAutocompleteChange, handleInputChange 
}) {
    const [ isUserOD, setIsUserOD ] = useState(undefined);
    const { user } = useAuth();
    const userDetails = user[0]?.account_info;

    useEffect(() => {
        setIsUserOD(userDetails?.is_open_doors && !userDetails?.is_member);
    }, [ user ]);

    const filterOptions = (options, { inputValue }) => {
        const matcher = new RegExp(inputValue, 'i');
        return options.filter(option => matcher.test(option));
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h5">Identity Related Questions</Typography>
                <Typography variant="subtitle1">
                    Thanks for all of that info! The next few questions will be about how you self identify. Please feel free to use the &apos;Other&apos; option to type
                    in any part of your identity that&apos;s not listed. This information will be used to help send you resources and events you may be interested in. We
                    will not share the following information with anyone.
                </Typography>
            </Grid>

            {/* Question 1 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="identity_sexuality">Please select the sexual identities that best describe you today.</FormLabel>
                    <SexualityDropdown isRequired={false} handleChange={handleAutocompleteChange} setAnswers={handleAutocompleteChange} />
                    <FormLabel>
                        If you see any terms you&apos;re not sure about we encourage you to check out this site to learn more about people&apos;s experiences
                    </FormLabel>
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_identity_sexuality_displayed" color="primary" size="small" />}
                            label="Would you like to display your sexuality your profile?"
                        />
                    )}
                </FormControl>
            </Grid>

            {/* Question 2 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="gender_identities">Please select the gender identities that best describe you today.</FormLabel>
                    <GenderDropdown isRequired={false} setAnswers={handleAutocompleteChange} handleChange={handleAutocompleteChange} />
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_identity_gender_displayed" color="primary" size="small" />}
                            label="Would you like to display your gender your profile?"
                        />
                    )}
                </FormControl>
            </Grid>

            {/* Question 3 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="identity_ethic">Please select all the identities that best describe your ethic background</FormLabel>
                    <EthicDropdown isRequired={false} setAnswers={handleAutocompleteChange} handleChange={handleAutocompleteChange} />
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_identity_ethic_displayed" color="primary" size="small" />}
                            label="Would you like to display your ethnicity your profile?"
                        />
                    )}
                </FormControl>
            </Grid>

            {/* Question 4 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="disability">
                        Have you ever identified yourself as someone with a disability? Both visible and non-visible disabilities included.
                    </FormLabel>
                    <Select id="disability" name="disability">
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                    </Select>
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_disability_displayed" color="primary" size="small" />}
                            label="Would you like to display your disability status your profile?"
                        />
                    )}
                </FormControl>
            </Grid>

            {/* Question 5 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="care_giver">Do you identify as a care giver?</FormLabel>
                    <Select onChange={handleInputChange} name="care_giver" id="care_giver">
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
                    </Select>
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_care_giver_displayed" color="primary" size="small" />}
                            label="Would you like to display your care giver status your profile?"
                        />
                    )}
                </FormControl>
            </Grid>

            {/* Question 6 */}
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <FormLabel htmlFor="veteran_status">What is your Veteran Status?</FormLabel>
                    <Select onChange={handleInputChange} name="veteran_status" id="veteran_status">
                        <MenuItem value="1">Yes</MenuItem>
                        <MenuItem value="2">No</MenuItem>
                        <MenuItem value="3">Prefer not to answer</MenuItem>
                    </Select>
                    {!isUserOD && (
                        <FormControlLabel
                            control={<Checkbox onChange={handleInputChange} name="is_veteran_status_displayed" color="primary" size="small" />}
                            label="Would you like to display your veteran status your profile?"
                        />
                    )}
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default IdentityQuestionsStep;
