import { db } from '@/app/db';
import { redirect } from 'next/navigation';

function CreateSnippetPage() {
    async function createSnippet(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
        const snippet = await db.snippet.create({
            data: {
                title,
                code,
            },
        });
        console.log(snippet);
        redirect('/');
    }
    return (
        <form action={createSnippet}>
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
                <button type="submit" className="rounded p-2 bg-blue-200">
                    Create
                </button>
            </div>
        </form>
    );
}

export default CreateSnippetPage;
