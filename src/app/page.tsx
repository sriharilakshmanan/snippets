import Link from 'next/link';
import { db } from '@/db';

export default async function Home() {
    const snippets = await db.snippet.findMany();

    const renderedSnippets = snippets.map((snippet) => {
        return (
            <Link
                key={snippet.id}
                href={`/snippets/${snippet.id}`}
                className="flex items-center justify-between border p-2 rounded hover:bg-gray-200"
            >
                <div> {`${snippet.id}. ${snippet.title}`}</div>
            </Link>
        );
    });

    return (
        <>
            <div className="flex flex-col gap-2">{renderedSnippets}</div>
            <div className="flex justify-end items-center my-2">
                <Link
                    className="border p-2 rounded hover:text-blue-600"
                    href={`/snippets/new`}
                >
                    New
                </Link>
            </div>
        </>
    );
}
