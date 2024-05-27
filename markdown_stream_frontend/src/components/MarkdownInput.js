'use client';

import { useState } from 'react';

const MarkdownInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdownText: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit markdown text');
      }

      onSubmit(input);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full max-w-lg mx-auto pb-4">
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded-md text-black"
        placeholder="Enter your markdown text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default MarkdownInput;
