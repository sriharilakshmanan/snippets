'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
        return {
            message: 'Title must be atleast 3 characters',
        };
    }
    if (typeof code !== 'string' || code.length < 10) {
        return {
            message: 'Code must be atleast 10 characters',
        };
    }

    const snippet = await db.snippet.create({
        data: {
            title,
            code,
        },
    });
    console.log(snippet);
    redirect('/');
}

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id },
    });
    redirect('/');
}
