import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SnippetShowPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function ShowSnippetPage(props: SnippetShowPageProps) {
    await new Promise((r) => setTimeout(r, 2000));
    const { id } = await props.params;
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(id),
        },
    });

    if (!snippet) {
        notFound();
    }

    return (
        <div>
            <div className="flex my-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-2">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="p-2 border rounded"
                    >
                        Edit
                    </Link>
                    <button className="p-2 border rounded">Delete</button>
                </div>
            </div>
            <pre className="p-4 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}

export default ShowSnippetPage;
