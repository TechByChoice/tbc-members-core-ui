import {ButtonGroup, FormControl, FormLabel, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import Heading from '@tiptap/extension-heading'
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const EditorContentStyled = styled(EditorContent)`
  padding-left: 16px;
  padding-right: 16px;
`;

const RichTextEditor = styled('div')`
  border: #333954 1px solid;
  border-radius: 3px;
`

const EditorButton = styled(Button)`
  text-transform: capitalize !important;
  padding: 2px;
  margin: 2px;
  font-size: 12px;
`
const MyEditor = ({id, onFormDataChange}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3],
            }),
        ],
        onUpdate: ({ editor }) => {
            onFormDataChange(id, editor.getHTML());
        }
    });

    const applyFormat = (format) => {
        switch (format) {
            case 'h1':
                editor.chain().focus().toggleHeading({level: 1}).run();
                break;
            case 'h2':
                editor.chain().focus().toggleHeading({level: 2}).run();
                break;
            case 'h3':
                editor.chain().focus().toggleHeading({level: 3}).run();
                break;
            case 'body':
                editor.chain().focus().setParagraph().run();
                break;
            case 'bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            default:
                break;
        }
    };

    return (
        <RichTextEditor>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                borderBottom: "#9797a5 solid 2px"
            }}>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('h1')}>H1</EditorButton>
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('h2')}>H2</EditorButton>
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('h3')}>H3</EditorButton>
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('body')}>Body</EditorButton>
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('bold')}>Bold</EditorButton>
                    <EditorButton size="small" variant="outline"
                                  onClick={() => applyFormat('italic')}>Italic</EditorButton>
                </ButtonGroup>
            </div>
            <EditorContentStyled editor={editor}/>
        </RichTextEditor>
    );
};
export default function FormMentorCareer({onFormDataChange}) {

    const [formData, setFormData] = useState({
        biggest_strengths: '',
        career_success: '',
        career_milestones: '',
        career_goals: '',
        work_motivation: ''
    });

    const handleEditorUpdate = (editorId, content) => {
        const newFormData = {...formData, [editorId]: content};
        setFormData(newFormData);
        onFormDataChange(newFormData);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Career Questions</Typography>
                    <hr/>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={10} sm={10}>
                            <Typography variant="body">
                                Let's get to know you better! Your career success
                                and goals are essential in matching you with a mentee
                                who shares a similar path. Please take a moment to answer
                                the following career based questions below.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="company-label">What do you consider to be your biggest strengths in
                                    your current role?</FormLabel>
                                <MyEditor onFormDataChange={handleEditorUpdate} id='biggest_strengths' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="company-label">What do you believe is the key to success in your
                                    career?</FormLabel>
                                <MyEditor onFormDataChange={handleEditorUpdate} id='career_success' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="company-label">
                                    What are your biggest career milestones and things you would like to celebrate?
                                </FormLabel>
                                <MyEditor onFormDataChange={handleEditorUpdate} id='career_milestones' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="company-label">
                                    What are some of your long-term career goals?
                                </FormLabel>
                                <MyEditor onFormDataChange={handleEditorUpdate} id='career_goals' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel id="company-label">
                                    What keeps you motivated at work?
                                </FormLabel>
                                <MyEditor onFormDataChange={handleEditorUpdate} id='work_motivation' />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}