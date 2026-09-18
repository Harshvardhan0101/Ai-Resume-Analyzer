import { extractText as unpdfExtract } from 'unpdf';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch {
  // Optional fallback
}

/**
 * Normalizes and cleans raw text extracted from a PDF.
 * @param {string} rawText
 * @returns {string}
 */
function cleanExtractedText(rawText) {
  return (rawText || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Extracts clean text from a PDF buffer using modern unpdf with pdf-parse fallback.
 * Supports modern PDF 1.5+ cross-reference streams as well as legacy formats.
 *
 * @param {Buffer} dataBuffer - Buffer containing PDF file data
 * @returns {Promise<{ text: string, numPages: number }>} Extracted text and metadata
 */
export async function extractTextFromPDF(dataBuffer) {
  if (!dataBuffer || !Buffer.isBuffer(dataBuffer)) {
    throw new Error('Invalid PDF data: Buffer expected.');
  }

  let extractedText = '';
  let numPages = 1;

  // Primary strategy: modern unpdf (handles modern XRef streams, PDF 1.5–2.0, Canva, Google Docs, LaTeX)
  try {
    const uint8Data = new Uint8Array(dataBuffer);
    const result = await unpdfExtract(uint8Data);
    numPages = result.totalPages || 1;
    const pagesArray = Array.isArray(result.text) ? result.text : [result.text || ''];
    extractedText = cleanExtractedText(pagesArray.join('\n\n'));
  } catch (primaryErr) {
    console.warn('[PDF Service]: unpdf primary extractor failed, trying fallback:', primaryErr.message);

    // Secondary fallback: pdf-parse
    if (pdfParse) {
      try {
        const data = await pdfParse(dataBuffer, { max: 0 });
        numPages = data.numpages || 1;
        extractedText = cleanExtractedText(data.text);
      } catch (fallbackErr) {
        throw new Error(
          `Unable to parse resume PDF: ${primaryErr.message || fallbackErr.message || 'Corrupted or unreadable format'}`
        );
      }
    } else {
      throw new Error(`Unable to parse resume PDF: ${primaryErr.message}`);
    }
  }

  // Validate extracted text content
  if (!extractedText || extractedText.length < 30) {
    throw new Error(
      'Unable to extract readable text from this PDF. It may be scanned as an image or password-protected. Please upload a text-based PDF resume.'
    );
  }

  return {
    text: extractedText,
    numPages,
  };
}
