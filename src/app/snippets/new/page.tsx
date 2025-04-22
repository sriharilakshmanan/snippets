'use client';

import * as actions from '@/actions';
import { Editor } from '@monaco-editor/react';
import { startTransition, useActionState, useState } from 'react';

function CreateSnippetPage() {
    const [formState, action] = useActionState(actions.createSnippet, {
        message: '',
    });
    const [codeSnippet, setCodeSnippet] = useState('');
    const handleCodeChange = (value: string = '') => {
        setCodeSnippet(value);
    };
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3 className="font-bold my-2">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <input
                    className="border rounded p-2 w-full"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                />
                <input
                    id="code"
                    name="code"
                    type="text"
                    value={codeSnippet}
                    readOnly
                    hidden
                />
                <Editor
                    height="40vh"
                    theme="vs-dark"
                    language="javascript"
                    options={{
                        minimap: { enabled: false },
                    }}
                    onChange={handleCodeChange}
                    defaultValue="// Code"
                />
                {formState.message ? (
                    <div className="my-2 p-2 bg-red-400 border rounded border-red-800">
                        {formState.message}
                    </div>
                ) : null}
                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    );
}

export default CreateSnippetPage;
