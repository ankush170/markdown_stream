'use client';

import { useState } from 'react';
import MarkdownInput from '../components/MarkdownInput';
import MarkdownStream from '../components/MarkdownStream';

const HomePage = () => {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownSubmit = (input) => {
    setMarkdown(input);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl text-center mb-8">Markdown Streamer</h1>
      <MarkdownInput onSubmit={handleMarkdownSubmit} />
      {markdown && <MarkdownStream markdown={markdown} />}
    </div>
  );
};

export default HomePage;
