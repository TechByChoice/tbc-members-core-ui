import { FormControl, FormLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RichTextEditor } from '../RichTextEditor';

const FormQuestion = ({ question, propName, onUpdate }) => {
    return (
        <>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FormLabel id="company-label">{question}</FormLabel>
                    <RichTextEditor onFormDataChange={onUpdate} id={propName} />
                </FormControl>
            </Grid>
        </>
    );
};

const questions = [
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

export default function FormMentorCareer({ onFormDataChange, setMainFormData, mainFormData }) {
    const [ formData, setFormData ] = useState({
        career_milestones: '',
        career_goals: '',
        work_motivation: '',
    });

    const handleEditorUpdate = (editorId, content) => {
        const updatedCareerData = { ...mainFormData.careerQuestions, [editorId]: content };
        const newFormData = { ...formData, careerQuestions: updatedCareerData };
        console.log('updatedCareerData', updatedCareerData);
        setFormData(newFormData);
        setMainFormData(prevMainFormData => ({
            ...prevMainFormData,
            careerQuestions: updatedCareerData,
        }));
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
                            <Typography variant="body1">
                                Let&apos;s get to know you better! Your career success and goals are essential in matching you with a mentee who shares a similar path.
                                Please take a moment to answer the following career based questions below.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container>
                        {questions.map(q => (
                            <FormQuestion key={q.propName} question={q.question} propName={q.propName} onUpdate={handleEditorUpdate} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
