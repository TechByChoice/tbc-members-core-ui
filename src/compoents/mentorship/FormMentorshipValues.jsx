import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import React, { useState } from 'react';

function valuetext(value) {
    return `${value}`;
}

const marks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
];

const ValueItem = ({ description, name, onChange }) => (
    <Grid item xs={12}>
        <FormControl>
            <FormLabel>{description}</FormLabel>
            <Slider
                aria-label={`${name} value`}
                defaultValue={0}
                name={name}
                getAriaValueText={valuetext}
                min={0}
                max={8}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(e, newValue) => onChange(name, newValue)}
            />
        </FormControl>
    </Grid>
);

export default function FormMentorshipValues({ onFormDataChange }) {
    const [ values, setValues ] = useState({
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

    const handleChange = (name, newValue) => {
        const updatedValues = { ...values, [name]: newValue };

        setValues(updatedValues);
        onFormDataChange(updatedValues);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Values Based Questions</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} md={4} spacing={3} mt={3}>
                    <Typography variant="body1">
                        We want to match you with a mentee who shares your values and beliefs, so we would love to learn more about you! Please take a moment to answer
                        the following questions regarding your personal values.
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <ValueItem description="POWER (social power, authority, wealth)" name="power" onChange={handleChange} />
                        <ValueItem description="ACHIEVEMENT (success, capability, ambition, influence on people and events)" name="achievement" onChange={handleChange} />
                        <ValueItem description="HEDONISM (gratification of desires, enjoyment in life, self-indulgence)" name="hedonism" onChange={handleChange} />
                        <ValueItem description="STIMULATION (daring, a varied and challenging life, an exciting life)" name="stimulation" onChange={handleChange} />
                        <ValueItem
                            description="SELF DIRECTION (creativity, freedom, curiosity, independence, choosing one’s own goals)"
                            name="selfDirection"
                            onChange={handleChange}
                        />
                        <ValueItem
                            description="UNIVERSALISM (broadmindedness, beauty of nature and art., social justice, a world at peace, quality, wisdom, unity with nature, environmental protection)"
                            name="universalism"
                            onChange={handleChange}
                        />
                        <ValueItem description="BENEVOLENCE (helpfulness, honesty, forgiveness, loyalty, responsibility)" name="benevolence" onChange={handleChange} />
                        <ValueItem
                            description="TRADITION (respect for tradition, humbleness, accepting one's portion in life, devotion, modesty)"
                            name="tradition"
                            onChange={handleChange}
                        />
                        <ValueItem
                            description="CONFORMITY (obedience, honoring parents and elders, self-discipline, politeness)"
                            name="conformity"
                            onChange={handleChange}
                        />
                        <ValueItem
                            description="SECURITY (national security, family security, social order, cleanliness, reciprocation of favors)"
                            name="security"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
