"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

const MarkdownStream = () => {
  const [content, setContent] = useState('');
  const [linkData, setLinkData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource(process.env.NEXT_PUBLIC_STREAM_API);

    eventSource.onmessage = (event) => {
      const data = event.data;
      if (data.includes('—||Sources||—')) {
        const parts = content.split('—||Sources||—');
        setContent(parts[0]);
        const linkInfo = parts[1].match(/\[.*?\]\((.*?)\)\{page:(\d+), highlight: (.*?)\}/);
        if (linkInfo) {
          const url = linkInfo[1];
          const page = linkInfo[2];
          const highlight = linkInfo[3];
          setLinkData({ url, page, highlight });
        }
        eventSource.close();
      } else {
        setContent((prev) => prev + data);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [router]);

  const handleClick = () => {
    if (linkData) {
      const { url, page, highlight } = linkData;
      router.push(`${url}?page=${page}&highlight=${encodeURIComponent(highlight)}`);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <ReactMarkdown className="prose prose-invert">{content}</ReactMarkdown>
        {linkData && (
          <div className="mt-4">
            <button
              className="text-blue-500 underline"
              onClick={handleClick}
            >
              Open Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownStream;
