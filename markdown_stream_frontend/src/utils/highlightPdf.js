import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function highlightTextInPDF(url, pageNumber, highlightText) {
  try {
    const proxyUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/proxy?url=${encodeURIComponent(url)}`;
    console.log(`Fetching from proxy URL: ${proxyUrl}`);

    const loadingTask = pdfjsLib.getDocument(proxyUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });

    const textContent = await page.getTextContent();
    const textItems = textContent.items;

    return { page, viewport, textItems, highlightText };
  } catch (error) {
    console.error('Error highlighting text in PDF:', error);
    throw error;
  }
}
