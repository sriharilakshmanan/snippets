'use client';

import * as actions from '@/actions';
import { startTransition, useActionState } from 'react';

function CreateSnippetPage() {
    const [formState, action] = useActionState(actions.createSnippet, {
        message: '',
    });
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
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="border rounded p-2 w-full"
                        id="title"
                        name="title"
                        type="text"
                    />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        className="border rounded p-2 w-full"
                        id="code"
                        name="code"
                    />
                </div>
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
