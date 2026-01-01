// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-black">Mock Next.js Dashboard</h1>
        <div className="space-x-4">
          <Link href="/test-one" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Test One (User Profile)
          </Link>
          <Link href="/test-two" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Go to Test Two (Task List)
          </Link>
        </div>
      </div>
  );
}