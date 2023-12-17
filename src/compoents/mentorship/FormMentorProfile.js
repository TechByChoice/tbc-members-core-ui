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

export default function FormMentorProfile({questions, formErrors}) {
    const [formData, setFormData] = useState({
        mentor_how_to_help: '',
        mentorship_goals: '',
    });

    const handleQuillChange = (value, name) => {
        const newFormData = {...formData, [name]: value};
        setFormData(newFormData);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Your Mentor Profile</Typography>
                    <hr/>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={10} sm={10}>
                            <Typography variant="body">
                                The following questions will be displayed on your mentor profile.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="mentorship_goals">
                                    What goals do you have as a mentor and how do
                                    you see yourself making a positive impact?
                                </FormLabel>
                                {/*<ReactQuill*/}
                                {/*    theme="snow"*/}
                                {/*    onChange={(content) => handleQuillChange(content, 'mentorship_goals')}*/}
                                {/*/>*/}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="mentor_how_to_help">
                                    In what ways would you like to contribute
                                    and support your mentee's growth and development?
                                </FormLabel>
                                {/*<ReactQuill*/}
                                {/*    theme="snow"*/}
                                {/*    onChange={(content) => handleQuillChange(content, 'mentor_how_to_help')}*/}
                                {/*/>*/}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}