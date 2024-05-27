'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { highlightTextInPDF } from '@/utils/highlightPdf';

const HighlightPage = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const page = parseInt(searchParams.get('page'), 10);
  const highlight = searchParams.get('highlight');

  const canvasRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    if (url && page && highlight) {
      highlightTextInPDF(url, page, highlight).then(setPdfData);
    }
  }, [url, page, highlight]);

  useEffect(() => {
    if (pdfData) {
      const { page, viewport, textItems, highlightText } = pdfData;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise.then(() => {
        highlightTextInCanvas(context, viewport, textItems, highlightText);
      });
    }
  }, [pdfData]);

  const highlightTextInCanvas = (context, viewport, textItems, highlightText) => {
    const lowerCaseHighlightText = highlightText.toLowerCase();

    textItems.forEach((textItem) => {
      const text = textItem.str.toLowerCase();
      const startIndex = text.indexOf(lowerCaseHighlightText);

      if (startIndex !== -1) {
        const { transform, width, height } = textItem;
        const [a, b, c, d, e, f] = transform;

        const beforeText = textItem.str.slice(0, startIndex);
        const matchingText = textItem.str.slice(startIndex, startIndex + highlightText.length);

        const beforeWidth = context.measureText(beforeText).width;
        const highlightWidth = context.measureText(matchingText).width;

        const x = e + e/2 + beforeWidth + (beforeWidth/2);
        const y = f + (f/2) + height/2;

        context.globalAlpha = 0.5;
        context.fillStyle = 'yellow';
        context.fillRect(x, viewport.height - y, highlightWidth + highlightWidth, height + (height/2));
        context.globalAlpha = 1;
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-white text-2xl mb-4">Highlight Page</h1>
      <p className="text-white">Page Number: {page}</p>
      <p className="text-white">Highlight: {highlight}</p>
      <canvas ref={canvasRef} width="100%" height="600px" />
    </div>
  );
};

export default HighlightPage;





// console.log("a: ", a);
//         console.log("b: ", b);
//         console.log("c: ", c);
//         console.log("d: ", d);
//         console.log("e: ", e);
//         console.log("f: ", f);
//         console.log("beforeWidth: ", beforeWidth);
//         console.log("highlightWidth: ", highlightWidth);
//         console.log("height: ", height);
//         console.log("width: ", width);