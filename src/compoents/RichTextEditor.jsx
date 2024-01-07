import styled from '@emotion/styled';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Heading from '@tiptap/extension-heading';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const EditorContentStyled = styled(EditorContent)`
    padding-left: 16px;
    padding-right: 16px;
`;

const RichTextEditorDiv = styled('div')`
    border: #333954 1px solid;
    border-radius: 3px;
`;

const EditorButton = styled(Button)`
    text-transform: capitalize !important;
    padding: 2px;
    margin: 2px;
    font-size: 12px;
`;

const TextEditorButton = ({ text }, props) => (
    <EditorButton size="small" variant="outline" {...props}>
        {text}
    </EditorButton>
);

export const RichTextEditor = ({ id, onFormDataChange }) => {
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
        const formatMap = {
            h1: e => e.toggleHeading({ level: 1 }),
            h2: e => e.toggleHeading({ level: 2 }),
            h3: e => e.toggleHeading({ level: 3 }),
            body: e => e.setParagraph(),
            bold: e => e.toggleBold(),
            italic: e => e.toggleItalic(),
        };

        if (!formatMap[format]) return;
        formatMap[format](editor.chain()).run();
    };

    return (
        <RichTextEditorDiv>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    borderBottom: '#9797a5 solid 2px',
                }}>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <TextEditorButton text="H1" onClick={() => applyFormat('h1')} />
                    <TextEditorButton text="H2" onClick={() => applyFormat('h2')} />
                    <TextEditorButton text="H3" onClick={() => applyFormat('h3')} />
                    <TextEditorButton text="Body" onClick={() => applyFormat('body')} />
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <TextEditorButton text="Bold" onClick={() => applyFormat('bold')} />
                    <TextEditorButton text="Italic" onClick={() => applyFormat('italic')} />
                </ButtonGroup>
            </div>
            <EditorContentStyled editor={editor} />
        </RichTextEditorDiv>
    );
};
