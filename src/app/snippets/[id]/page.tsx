import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as actions from '@/actions';

interface SnippetShowPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function ShowSnippetPage(props: SnippetShowPageProps) {
    // await new Promise((r) => setTimeout(r, 2000));
    const { id } = await props.params;
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(id),
        },
    });

    if (!snippet) {
        notFound();
    }

    const deleteSnippet = actions.deleteSnippet.bind(null, snippet.id);
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-2">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="p-2 border rounded hover:text-blue-600"
                    >
                        Edit
                    </Link>
                    <form action={deleteSnippet}>
                        <button
                            type="submit"
                            className="p-2 border rounded text-white bg-red-600 hover:bg-red-800"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            <pre className="p-4 my-4 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </>
    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    return snippets.map(({ id }) => ({
        id: id.toString(),
    }));
}

export default ShowSnippetPage;
