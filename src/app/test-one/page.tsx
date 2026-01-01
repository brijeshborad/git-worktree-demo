// src/app/test-one/page.tsx
'use client'; // Enables client-side interactivity

import { useState } from 'react';

export default function TestOne() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <h1 className="text-3xl font-bold mb-4">Test One: User Profile Module</h1>
            <p className="mb-4">This is a simple counter for demo purposes.</p>
            <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Count: {count}
            </button>
            <button
                onClick={() => setCount(0)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
                Reset
            </button>
        </div>
    );
}