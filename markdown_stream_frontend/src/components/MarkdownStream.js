'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownStream = ({ markdown }) => {
  const [content, setContent] = useState('');
  const [linkData, setLinkData] = useState(null);

  useEffect(() => {
    let currentIndex = 0;
    const lines = markdown.split('\n');
    const interval = setInterval(() => {
      if (currentIndex < lines.length) {
        setContent((prevContent) => prevContent + lines[currentIndex] + '\n');
        currentIndex++;
      } else {
        const linkIndex = lines.findIndex(line => line.includes('—||Sources||—'));
        if (linkIndex !== -1 && linkIndex + 1 < lines.length) {
          const link = lines[linkIndex + 1];  
          const urlMatch = link.match(/\[(.*?)\]\((.*?)\)\{page:(\d+),\s*highlight:\s*(.*?)\}/);
          if (urlMatch) {
            const url = urlMatch[2];
            const page = urlMatch[3];
            const highlight = urlMatch[4];
            setLinkData({ url, page, highlight });
          }
        }
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [markdown]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (linkData) {
      const { url, page, highlight } = linkData;
      const fullUrl = `/highlight?url=${encodeURIComponent(url)}&page=${page}&highlight=${encodeURIComponent(highlight)}`;
      if (typeof window !== 'undefined') {
        window.open(fullUrl, '_blank');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <ReactMarkdown>{content}</ReactMarkdown>
        {linkData && (
          <div className="mt-4">
            <a
              href="#"
              onClick={handleLinkClick}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {linkData.url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownStream;
