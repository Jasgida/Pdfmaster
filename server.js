const express = require('express');

const multer = require('multer');

const fs = require('fs');

const path = require('path');

const { PDFDocument } = require('pdf-lib');

const { Document, Packer, Paragraph } = require('docx'); // For Word handling

// For PDF to Docx, use a lib like pdf-to-docx if available; placeholder here.


const app = express();

const upload = multer({ dest: 'uploads/' });


app.use(express.static('public'));

app.use(express.json());


// Helper: Clean up files after processing

const cleanup = (files) => files.forEach(file => fs.unlinkSync(file));


// Summarize & Chat (Placeholder: Extracts text; replace with AI API call)

app.post('/summarize', upload.single('pdf'), async (req, res) => {

  const filePath = req.file.path;

  try {

    const pdfDoc = await PDFDocument.load(fs.readFileSync(filePath));

    let text = '';

    for (let i = 0; i < pdfDoc.getPageCount(); i++) {

      // Simple text extraction placeholder. For real AI, call xAI API here.

      // Example: const response = await fetch('https://api.x.ai/v1/chat', { method: 'POST', body: JSON.stringify({ prompt: 'Summarize this PDF text: ' + extractedText }) });

      text += `Page ${i+1}: Placeholder summary.\n`; // Replace with actual extraction/AI.

    }

    res.json({ summary: text });

  } catch (err) {

    res.status(500).send('Error summarizing PDF');

  } finally {

    cleanup([filePath]);

  }

});


// Merge PDFs

app.post('/merge', upload.array('pdfs', 10), async (req, res) => {

  const files = req.files.map(f => f.path);

  try {

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {

      const pdf = await PDFDocument.load(fs.readFileSync(file));

      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      copiedPages.forEach(page => mergedPdf.addPage(page));

    }

    const mergedBytes = await mergedPdf.save();

    res.set('Content-Type', 'application/pdf');

    res.send(mergedBytes);

  } catch (err) {

    res.status(500).send('Error merging PDFs');

  } finally {

    cleanup(files);

  }

});


// Split PDF

app.post('/split', upload.single('pdf'), async (req, res) => {

  const filePath = req.file.path;

  const { page } = req.body; // e.g., page number to split at

  try {

    const pdf = await PDFDocument.load(fs.readFileSync(filePath));

    const splitPdf1 = await PDFDocument.create();

    const splitPdf2 = await PDFDocument.create();

    const pages = await splitPdf1.copyPages(pdf, Array.from({length: page}, (_, i) => i));

    pages.forEach(p => splitPdf1.addPage(p));

    const remainingPages = await splitPdf2.copyPages(pdf, Array.from({length: pdf.getPageCount() - page}, (_, i) => i + page));

    remainingPages.forEach(p => splitPdf2.addPage(p));

    

    const zip = require('adm-zip'); // Add 'adm-zip' to dependencies if needed

    const zipper = new zip();

    zipper.addFile('split1.pdf', await splitPdf1.save());

    zipper.addFile('split2.pdf', await splitPdf2.save());

    res.set('Content-Type', 'application/zip');

    res.send(zipper.toBuffer());

  } catch (err) {

    res.status(500).send('Error splitting PDF');

  } finally {

    cleanup([filePath]);

  }

});


// Compress PDF (Simple: Reduce quality; for advanced, use other libs)

app.post('/compress', upload.single('pdf'), async (req, res) => {

  const filePath = req.file.path;

  try {

    const pdf = await PDFDocument.load(fs.readFileSync(filePath));

    // Placeholder compression: Remove metadata or downsample images (pdf-lib doesn't compress directly; use ghostscript externally if needed).

    const compressedBytes = await pdf.save({ useObjectStreams: false }); // Basic optimization

    res.set('Content-Type', 'application/pdf');

    res.send(compressedBytes);

  } catch (err) {

    res.status(500).send('Error compressing PDF');

  } finally {

    cleanup([filePath]);

  }

});


// PDF to Word (Placeholder: Convert to basic Docx)

app.post('/pdf-to-word', upload.single('pdf'), async (req, res) => {

  const filePath = req.file.path;

  try {

    // Use pdf-to-docx or similar; placeholder with docx lib.

    const doc = new Document({ sections: [{ children: [new Paragraph('Placeholder PDF content converted to Word.')] }] });

    const buffer = await Packer.toBuffer(doc);

    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    res.send(buffer);

  } catch (err) {

    res.status(500).send('Error converting PDF to Word');

  } finally {

    cleanup([filePath]);

  }

});


// Word to PDF (Placeholder: Convert Docx to PDF)

app.post('/word-to-pdf', upload.single('docx'), async (req, res) => {

  const filePath = req.file.path;

  try {

    // Requires a lib like docx-to-pdf; placeholder.

    const pdf = await PDFDocument.create();

    pdf.addPage(); // Add content from Docx parsing.

    const pdfBytes = await pdf.save();

    res.set('Content-Type', 'application/pdf');

    res.send(pdfBytes);

  } catch (err) {

    res.status(500).send('Error converting Word to PDF');

  } finally {

    cleanup([filePath]);

  }

});


app.listen(3000, () => console.log('Server running on port 3000'));
