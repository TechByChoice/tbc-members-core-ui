import {
    Autocomplete,
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createFilterOptions} from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";


export default function FormMentorshipValues({onFormDataChange}) {
    const [values, setValues] = useState({
        power: 0,
        achievement: 0,
        hedonism: 0,
        stimulation: 0,
        selfDirection: 0,
        universalism: 0,
        benevolence: 0,
        tradition: 0,
        conformity: 0,
        security: 0,
    });
    const marks = [
        {value: 0, label: "0"},
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"},
        {value: 6, label: "6"},
        {value: 7, label: "7"},
        {value: 8, label: "8"}
    ]

    function valuetext(value) {
        return `${value}`;
    }

    const handelChange = (name, newValue) => {
        const updatedValues = {...values, [name]: newValue};
        setValues(updatedValues);
        onFormDataChange(updatedValues);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Values Based Questions</Typography>
                    <hr/>
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body">
                        We want to match you with a mentee who shares your values and beliefs, so we would love to learn
                        more about you! Please take a moment to answer the following questions regarding your personal
                        values.
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    POWER (social power, authority, wealth)
                                </FormLabel>
                                <Slider
                                    aria-label="Power value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="power"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('power', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    ACHIEVEMENT (success, capability, ambition, influence on people and events)
                                </FormLabel>
                                <Slider
                                    aria-label="Achievement value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="achievement"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('achievement', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    HEDONISM (gratification of desires, enjoyment in life, self-indulgence)
                                </FormLabel>
                                <Slider
                                    aria-label="hedonism value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="hedonism"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('hedonism', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    STIMULATION (daring, a varied and challenging life, an exciting life)
                                </FormLabel>
                                <Slider
                                    aria-label="stimulation value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="stimulation"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('stimulation', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    SELF DIRECTION (creativity, freedom, curiosity, independence, choosing one’s own
                                    goals)
                                </FormLabel>
                                <Slider
                                    aria-label="self direction value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="self_direction"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('self_direction', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    Universalism (broadmindedness, beauty of nature and art., social justice, a world at
                                    peace, quality, wisdom, unity with nature, environmental protection)
                                </FormLabel>
                                <Slider
                                    aria-label="universalism value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="universalism"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('universalism', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    BENEVOLENCE (helpfulness, honesty, forgiveness, loyalty, responsibility)
                                </FormLabel>
                                <Slider
                                    aria-label="benevolence value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="benevolence"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('benevolence', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    TRADITION (respect for tradition, humbleness, accepting one's portion in life,
                                    devotion, modesty)
                                </FormLabel>
                                <Slider
                                    aria-label="tradition value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="tradition"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('tradition', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    CONFORMITY (obedience, honoring parents and elders, self-discipline, politeness)
                                </FormLabel>
                                <Slider
                                    aria-label="conformity value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="conformity"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('conformity', newValue)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl>
                                <FormLabel>
                                    SECURITY (national security, family security, social order, cleanliness,
                                    reciprocation of favors)
                                </FormLabel>
                                <Slider
                                    aria-label="security value"
                                    defaultValue={0}
                                    // valueLabelFormat={valueLabelFormat}
                                    name="security"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={8}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={(e, newValue) => handelChange('security', newValue)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}