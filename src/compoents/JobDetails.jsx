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
import SkillsDropdown from './SkillsDropdown';
import SalaryDropdown from './SalaryDropdown';
import RolesDropdown from './RolesDropdown';
import DepartmentsDropdown from './DepartmentsDropdown';
// import ReactQuill from "react-quill";
import ExperiencesDropdown from './ExpericesDropdown';
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

const MyEditor = ({ id, onFormDataChange }) => {
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
        <RichTextEditor>
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
        </RichTextEditor>
    );
};
export default function JobForm({ answers, setAnswers }) {
    const handleChange = event => {
        const { name, value } = event.target;
        setAnswers(prevFormData => ({ ...prevFormData, [name]: value }));
        console.log(answers);
    };

    const handleEditorUpdate = (editorId, content) => {
        setAnswers(prevFormData => ({
            ...prevFormData,
            [editorId]: content,
        }));
    };
    const handleSkills = selectedCompanyId => {
        setAnswers(prevState => ({
            ...prevState,
            job_skills: selectedCompanyId,
        }));
    };
    const handleMinSalary = selectedMinSalaryId => {
        setAnswers(prevState => ({
            ...prevState,
            min_compensation: selectedMinSalaryId,
        }));
    };
    const handleMaxSalary = selectedMaxSalaryId => {
        setAnswers(prevState => ({
            ...prevState,
            max_compensation: selectedMaxSalaryId,
        }));
    };
    const handleRole = selectedMaxSalaryId => {
        setAnswers(prevState => ({
            ...prevState,
            max_compensation: selectedMaxSalaryId,
        }));
    };
    const handleDepartment = selectedDepartmentId => {
        setAnswers(prevState => ({
            ...prevState,
            job_department: selectedDepartmentId,
        }));
    };
    return (
        <Container maxWidth="md">
            <TextField fullWidth label="Job Title" name="job_title" variant="outlined" margin="normal" onChange={handleChange} />
            <FormControl fullWidth margin="normal">
                <InputLabel>What type of job is this?</InputLabel>
                <Select label="What type of job is this?" name="job_type" defaultValue="" variant="outlined" onChange={handleChange}>
                    <MenuItem value="full_time">Full Time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="temporary">Temporary</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="apprenticeship">Apprenticeship</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>On-site/Remote</InputLabel>
                <Select label="On-site/Remote" name="on_site_remote" defaultValue="" variant="outlined" onChange={handleChange}>
                    <MenuItem value="On-site">On-site</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>What type of job is this?</InputLabel>
                <Select label="What type of job is this?" name="job_type" defaultValue="" variant="outlined" onChange={handleChange}>
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
                <ExperiencesDropdown setAnswers={setAnswers} onRoleSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <RolesDropdown setAnswers={setAnswers} onRoleSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <DepartmentsDropdown setAnswers={setAnswers} onDepartmentSelect={handleChange} />
            </FormControl>
            <TextField fullWidth label="Job Location" name="location" variant="outlined" margin="normal" onChange={handleChange} />

            <FormControl fullWidth>
                <FormLabel id="job-description">Job Description</FormLabel>
                <MyEditor id="external_description" onFormDataChange={handleEditorUpdate} />
                {/*<ReactQuill theme="snow"*/}
                {/*            onChange={(content) => handleQuillChange(content, 'external_description')}/>*/}
            </FormControl>

            <FormControl fullWidth>
                <FormLabel id="job-interview-process">Interview Process</FormLabel>
                <MyEditor id="external_interview_process" onFormDataChange={handleEditorUpdate} />
            </FormControl>
            <FormControl fullWidth>
                <SkillsDropdown setAnswers={setAnswers} onSkillSelect={handleChange} />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel htmlFor="company_url">Link to Job Application</FormLabel>
                <OutlinedInput
                    fullWidth
                    name="url"
                    variant="outlined"
                    margin="normal"
                    startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                    onChange={handleChange}
                />
            </FormControl>
            <SalaryDropdown setAnswers={setAnswers} onSalarySelect={handleChange} labelName="Min Salary" />
            <SalaryDropdown setAnswers={setAnswers} onSalarySelect={handleChange} labelName="Max Salary" />

            <TextField fullWidth label="Team Size" name="team_size" variant="outlined" margin="normal" onChange={handleChange} />
            <TextField fullWidth label="Department Size" name="department_size" variant="outlined" margin="normal" onChange={handleChange} />
        </Container>
    );
}
