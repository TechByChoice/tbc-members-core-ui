import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import Button from '@mui/material/Button';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { ButtonGroup } from '@mui/material';
import styled from '@emotion/styled';

const EditorContentStyled = styled(EditorContent)`
    white-space: pre-wrap;
    padding-left: 16px;
    padding-right: 16px;
`;

const EditorButton = styled(Button)`
    text-transform: capitalize !important;
    padding: 2px;
    margin: 2px;
    font-size: 12px;
`;
export default function TipTapEditor({
    id, onFormDataChange, error, value, onFormDataChangeUpdate
}) {
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
        content: value,
        onUpdate: ({ editor }) => {
            if(onFormDataChangeUpdate){
                onFormDataChangeUpdate(editor.getHTML());
            } else {
                onFormDataChange(id, editor.getHTML());
            }
        },
    });
    // Set editor content when `value` prop changes
    useEffect(() => {
        if (editor && value !== undefined && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [ editor, value ]);
    const applyFormat = format => {
        if (!editor) return;

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
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('h1')}>
                        H1
                    </EditorButton>
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('h2')}>
                        H2
                    </EditorButton>
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('h3')}>
                        H3
                    </EditorButton>
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('body')}>
                        Body
                    </EditorButton>
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="text formatting">
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('bold')}>
                        Bold
                    </EditorButton>
                    <EditorButton size="small" variant="text" onClick={() => applyFormat('italic')}>
                        Italic
                    </EditorButton>
                </ButtonGroup>
            </div>
            <EditorContentStyled editor={editor} />
        </div>
    );
}
