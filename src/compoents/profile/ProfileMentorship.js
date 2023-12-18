import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
import FormMentorApplication from "../mentorship/FormMentorApplication";
import FormMentorshipValues from "../mentorship/FormMentorshipValues";

const filter = createFilterOptions();

export default function ProfileMentorship({handleChange, questions, formErrors, formData}) {

    function handleSave() {
        console.log('saved')
    }


    return (
        <>
            <Grid container>
                <FormMentorApplication questions={questions}/>
                <FormMentorshipValues questions={questions}/>
            </Grid>
        </>
    )
}