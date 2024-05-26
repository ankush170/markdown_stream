import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

let storedMarkdownText = '';

router.post('/', (req, res) => {
  const { markdownText } = req.body;
  if (markdownText) {
    storedMarkdownText = markdownText;
    res.status(200).json({ message: 'Markdown text received' });
  } else {
    res.status(400).json({ error: 'No markdown text provided' });
  }
});

router.get('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    if (!storedMarkdownText) {
      throw new Error('No markdown text stored');
    }

    const markdownText = storedMarkdownText;
    let count = 0;
    const interval = setInterval(() => {
      if (count < markdownText.length) {
        res.write(`data: ${markdownText[count]}\n\n`);
        count++;
      } else {
        clearInterval(interval);
        res.end();
      }
    }, 100);

    req.on('close', () => {
      clearInterval(interval);
    });

  } catch (error) {
    console.error('Error streaming markdown data:', error);
    res.status(500).end();
  }
});

export default router;
