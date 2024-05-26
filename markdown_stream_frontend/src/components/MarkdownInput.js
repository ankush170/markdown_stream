"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MarkdownInput = () => {
  const [markdownText, setMarkdownText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.NEXT_PUBLIC_MARKDOWN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdownText }),
    });
    if (response.ok) {
      router.push('/stream');
    } else {
      console.error('Failed to send markdown text');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <textarea
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        placeholder="Enter your markdown text here..."
        className="w-full h-40 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default MarkdownInput;
 