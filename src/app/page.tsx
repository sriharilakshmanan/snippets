import Link from 'next/link';
import { db } from './db';

export default async function Home() {
    const snippets = await db.snippet.findMany();

    const renderedSnippets = snippets.map((snippet) => {
        return (
            <Link
                key={snippet.id}
                href={`/snippets/${snippet.id}`}
                className="flex items-center justify-between border p-2 rounded"
            >
                <div> {`${snippet.id}. ${snippet.title}`}</div>
                <div>View</div>
            </Link>
        );
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Snippets</h2>
                <Link className="border p-2 rounded" href={`/snippets/new`}>
                    New
                </Link>
            </div>
            <div className="my-2 flex flex-col gap-2">{renderedSnippets}</div>
        </div>
    );
}
