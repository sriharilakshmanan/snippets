'use client';

import { Editor } from '@monaco-editor/react';
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
    snippet: Snippet;
}
function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [codeSnippet, setCodeSnippet] = useState(snippet.code);
    const handleCodeChange = (value: string = '') => {
        setCodeSnippet(value);
    };
    const editSnippet = actions.editSnippet.bind(null, snippet.id, codeSnippet);

    return (
        <>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={snippet.code}
                options={{
                    minimap: { enabled: false },
                }}
                onChange={handleCodeChange}
            />
            <form action={editSnippet}>
                <button
                    type="submit"
                    className="w-full my-2 p-2 border rounded bg-blue-200"
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default SnippetEditForm;
