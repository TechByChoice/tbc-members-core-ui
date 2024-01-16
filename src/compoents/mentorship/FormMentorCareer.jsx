import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RichTextEditor } from '../RichTextEditor';

const FormQuestion = (question, propName, onUpdate) => {
    return (
        <>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="company-label">{question.question}</FormLabel>
                    <RichTextEditor onFormDataChange={onUpdate} id={propName} />
                </FormControl>
            </Grid>
        </>
    );
};

const questions = [
    {
        question: 'What do you consider to be your biggest strengths in your current role?',
        propName: 'biggest_strengths',
    },
    {
        question: 'What do you believe is the key to success in your career?',
        propName: 'career_success',
    },
    {
        question: 'What are your biggest career milestones and things you would like to celebrate?',
        propName: 'career_milestones',
    },
    {
        question: 'What are some of your long-term career goals?',
        propName: 'career_goals',
    },
    {
        question: 'What keeps you motivated at work?',
        propName: 'work_motivation',
    },
];

export default function FormMentorCareer({ onFormDataChange }) {
    const [ formData, setFormData ] = useState({
        biggest_strengths: '',
        career_success: '',
        career_milestones: '',
        career_goals: '',
        work_motivation: '',
    });

    const handleEditorUpdate = (editorId, content) => {
        const newFormData = { ...formData, [editorId]: content };
        setFormData(newFormData);
        onFormDataChange(newFormData);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Career Questions</Typography>
                    <hr />
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={10} sm={10}>
                            <Typography variant="body">
                                Let&apos;s get to know you better! Your career success and goals are essential in matching you with a mentee who shares a
                                similar path. Please take a moment to answer the following career based questions below.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container>
                        {questions.map(q => (
                            <FormQuestion key={q.propName} {...q} onUpdate={handleEditorUpdate} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
