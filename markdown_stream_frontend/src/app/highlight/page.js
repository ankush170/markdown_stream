'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const HighlightPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const highlight = searchParams.get('highlight');

  useEffect(() => {
    if (highlight) {
      // Implement your logic to highlight text
      // For now, simply log it
      console.log('Highlight:', highlight);
    }
  }, [highlight]);

  return (
    <div>
      <h1>Highlight Page</h1>
      <p>Page Number: {page}</p>
      <p>Highlight: {highlight}</p>
    </div>
  );
};

export default HighlightPage;
