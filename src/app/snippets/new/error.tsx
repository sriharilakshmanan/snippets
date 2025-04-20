'use client';

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

function ErrorPage({ error }: ErrorPageProps) {
    <div>{error.message}</div>;
}

export default ErrorPage;
