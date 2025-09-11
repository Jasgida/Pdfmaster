const express = require('express');

const path = require('path');

const multer = require('multer');

const { PDFDocument } = require('pdf-lib');

const fs = require('fs/promises');


const app = express();

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'dist', 'index.html'));

});


const storage = multer.diskStorage({

  destination: (req, file, cb) => cb(null, 'uploads/'),

  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)

});

const upload = multer({ storage });


app.post('/merge', upload.array('files'), async (req, res) => {

  try {

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {

      const bytes = await fs.readFile(file.path);

      const doc = await PDFDocument.load(bytes);

      const copiedPages = await pdfDoc.copyPages(doc, doc.getPageIndices());

      copiedPages.forEach((page) => pdfDoc.addPage(page));

    }

    const pdfBytes = await pdfDoc.save();

    res.contentType('application/pdf');

    res.send(pdfBytes);

  } catch (error) {

    res.status(500).send('Error merging PDFs');

  }

});


app.post('/compress', upload.single('file'), async (req, res) => {

  try {

    const bytes = await fs.readFile(req.file.path);

    const pdfDoc = await PDFDocument.load(bytes);

    const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

    res.contentType('application/pdf');

    res.send(pdfBytes);

  } catch (error) {

    res.status(500).send('Error compressing PDF');

  }

});


app.post('/split', upload.single('file'), async (req, res) => {

  try {

    const bytes = await fs.readFile(req.file.path);

    const pdfDoc = await PDFDocument.load(bytes);

    const pageNumber = 1; // Split at page 1 (example)

    const newPdf = await PDFDocument.create();

    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNumber - 1]);

    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();

    res.contentType('application/pdf');

    res.send(pdfBytes);

  } catch (error) {

    res.status(500).send('Error splitting PDF');

  }

});


app.post('/pdf-to-word', upload.single('file'), (req, res) => {

  res.status(501).send('PDF to Word conversion not implemented yet.');

});


app.post('/word-to-pdf', upload.single('file'), (req, res) => {

  res.status(501).send('Word to PDF conversion not implemented yet.');

});


fs.mkdir('uploads', { recursive: true }).catch(console.error);


app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

}).on('error', (err) => {

  console.error('Server error:', err.message);

});
