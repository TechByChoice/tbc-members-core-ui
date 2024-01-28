import React from 'react';
import {Container,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormLabel,
    InputAdornment,
    OutlinedInput,
    ButtonGroup,} from '@mui/material';
import DropdownSkills from './DropdownSkills';
import DropdownSalary from './DropdownSalary';
import DropdownRoles from './DropdownRoles';
import DropdownDepartments from './DropdownDepartments';
import ExperiencesDropdown from './DropdownExperices';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import styled from '@emotion/styled';

const EditorContentStyled = styled(EditorContent)`
    padding-left: 16px;
    padding-right: 16px;
`;

const RichTextEditor = styled('div')`
    border: #333954 1px solid;
    border-radius: 3px;
`;

const EditorButton = styled(Button)`
    text-transform: capitalize !important;
    padding: 2px;
    margin: 2px;
    font-size: 12px;
`;

const MyEditor = ({ id, onFormDataChange, error }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [
                    1,
                    2,
                    3 
                ],
            }),
        ],
        onUpdate: ({ editor }) => {
            onFormDataChange(id, editor.getHTML());
        },
    });

    const applyFormat = format => {
        switch (format) {
            case 'h1':
                editor.chain().focus()
                    .toggleHeading({ level: 1 })
                    .run();
                break;
            case 'h2':
                editor.chain().focus()
                    .toggleHeading({ level: 2 })
                    .run();
                break;
            case 'h3':
                editor.chain().focus()
                    .toggleHeading({ level: 3 })
                    .run();
                break;
            case 'body':
                editor.chain().focus()
                    .setParagraph()
                    .run();
                break;
            case 'bold':
                editor.chain().focus()
                    .toggleBold()
                    .run();
                break;
            case 'italic':
                editor.chain().focus()
                    .toggleItalic()
                    .run();
                break;
            default:
                break;
        }
    };

    return (
        <div
            style={{
                border: error && error[id] ? 'red 1px solid' : '#333954 1px solid',
                borderRadius: '3px',
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    borderBottom: '#9797a5 solid 2px',
                }}>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('h1')}>
                        H1
                    </EditorButton>
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('h2')}>
                        H2
                    </EditorButton>
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('h3')}>
                        H3
                    </EditorButton>
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('body')}>
                        Body
                    </EditorButton>
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('bold')}>
                        Bold
                    </EditorButton>
                    <EditorButton size="small" variant="outline" onClick={() => applyFormat('italic')}>
                        Italic
                    </EditorButton>
                </ButtonGroup>
            </div>
            <EditorContentStyled editor={editor} />
        </div>
    );
};
export default function JobForm({ formErrors, answers, setAnswers }) {
    const handleChange = event => {
        const { name, value } = event.target;
        setAnswers(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleEditorUpdate = (editorId, content) => {
        setAnswers(prevFormData => ({
            ...prevFormData,
            [editorId]: content,
        }));
    };

    return (
        <Container maxWidth="md">
            <TextField
                fullWidth
                required
                label="Job Title"
                error={!!formErrors.job_title}
                name="job_title"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>* What type of job is this?</InputLabel>
                <Select
                    required
                    label="What type of job is this?"
                    error={!!formErrors.job_type}
                    name="job_type"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}>
                    <MenuItem value="full_time">Full Time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="temporary">Temporary</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="apprenticeship">Apprenticeship</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>* On-site/Remote</InputLabel>
                <Select
                    required
                    label="On-site/Remote"
                    error={!!formErrors.on_site_remote}
                    name="on_site_remote"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}>
                    <MenuItem value="On-site">On-site</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>* What type of job is this?</InputLabel>
                <Select
                    label="What type of job is this?"
                    error={!!formErrors.job_type}
                    name="job_type"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}>
                    <MenuItem value="full time">Full Time</MenuItem>
                    <MenuItem value="part time">Part Time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="temporary">Temporary</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="apprenticeship">Apprenticeship</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <ExperiencesDropdown isRequired={true} error={formErrors} setAnswers={setAnswers} onRoleSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <DropdownRoles isRequired={true} error={formErrors} setAnswers={setAnswers} onRoleSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <DropdownDepartments isRequired={true} error={formErrors} setAnswers={setAnswers} onDepartmentSelect={handleChange} />
            </FormControl>
            <TextField
                fullWidth
                label="Job Location"
                error={!!formErrors.location}
                name="location"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
            />
            <FormControl fullWidth>
                <FormLabel id="job-description">* Job Description</FormLabel>
                <MyEditor error={formErrors} id="external_description" onFormDataChange={handleEditorUpdate} />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel id="job-interview-process">Interview Process</FormLabel>
                <MyEditor id="external_interview_process" onFormDataChange={handleEditorUpdate} error={formErrors} />
            </FormControl>
            <FormControl fullWidth>
                <DropdownSkills isRequired={true} error={formErrors} setAnswers={setAnswers} onSkillSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel htmlFor="company_url">* Link to Job Application</FormLabel>
                <OutlinedInput
                    required
                    fullWidth
                    error={!!formErrors.url}
                    name="url"
                    variant="outlined"
                    margin="normal"
                    startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                    onChange={handleChange}
                />
            </FormControl>
            <DropdownSalary error={formErrors} setAnswers={setAnswers} onSalarySelect={handleChange} labelName="Min Salary" />
            <DropdownSalary error={formErrors} setAnswers={setAnswers} onSalarySelect={handleChange} labelName="Max Salary" />

            <TextField
                fullWidth
                label="Team Size"
                error={!!formErrors.team_size}
                name="team_size"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Department Size"
                error={!!formErrors.department_size}
                name="department_size"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
            />
        </Container>
    );
}
