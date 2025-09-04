const express = require('express');

const multer = require('multer');

const { PDFDocument } = require('pdf-lib');

const fs = require('fs').promises;

const path = require('path');

require('dotenv').config();


const app = express();

const port = process.env.PORT || 3000;


// Set up storage for uploaded files

const storage = multer.diskStorage({

    destination: './uploads/',

    filename: (req, file, cb) => {

        cb(null, Date.now() + '-' + file.originalname);

    }

});

const upload = multer({ 

    storage: storage, 

    limits: { fileSize: parseInt(process.env.UPLOAD_LIMIT) || 10 * 1024 * 1024 }

});


// Serve static files with caching in production

app.use(express.static('public', { maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0 }));

app.use(express.urlencoded({ extended: true }));


// Task status tracking

const tasks = {};


function generateTaskId() {

    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));

}


// Merge PDFs

app.post('/merge', upload.array('files'), async (req, res) => {

    const taskId = generateTaskId();

    tasks[taskId] = { state: 'PENDING' };

    res.redirect(`/processing?task_id=${taskId}`);


    try {

        const mergedPdf = await PDFDocument.create();

        for (const file of req.files) {

            const pdfBytes = await fs.readFile(file.path);

            const pdf = await PDFDocument.load(pdfBytes);

            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

            copiedPages.forEach(page => mergedPdf.addPage(page));

        }

        const mergedPdfBytes = await mergedPdf.save();

        const outputPath = path.join('uploads', `merged-${Date.now()}.pdf`);

        await fs.writeFile(outputPath, mergedPdfBytes);

        tasks[taskId] = { state: 'SUCCESS', result: outputPath };

    } catch (error) {

        tasks[taskId] = { state: 'FAILURE' };

    }

});


// Split PDFs

app.post('/split', upload.single('file'), async (req, res) => {

    const taskId = generateTaskId();

    tasks[taskId] = { state: 'PENDING' };

    res.redirect(`/processing?task_id=${taskId}`);


    try {

        const pdfBytes = await fs.readFile(req.file.path);

        const pdf = await PDFDocument.load(pdfBytes);

        const ranges = req.body.ranges ? req.body.ranges.split(',').map(r => r.trim()) : [];

        const outputFiles = [];


        if (ranges.length === 0) {

            for (let i = 0; i < pdf.getPageCount(); i++) {

                const newPdf = await PDFDocument.create();

                newPdf.addPage(await pdf.getPage(i).copy());

                const outputPath = path.join('uploads', `split-${Date.now()}-${i + 1}.pdf`);

                await fs.writeFile(outputPath, await newPdf.save());

                outputFiles.push(outputPath);

            }

        } else {

            for (const range of ranges) {

                const [start, end] = range.split('-').map(n => n ? parseInt(n) - 1 : null);

                const pages = end ? pdf.getPages().slice(start, end) : pdf.getPages().slice(start);

                const newPdf = await PDFDocument.create();

                pages.forEach(page => newPdf.addPage(page.copy()));

                const outputPath = path.join('uploads', `split-${Date.now()}-${start + 1}.pdf`);

                await fs.writeFile(outputPath, await newPdf.save());

                outputFiles.push(outputPath);

            }

        }

        tasks[taskId] = { state: 'SUCCESS', result: outputFiles[0] };

    } catch (error) {

        tasks[taskId] = { state: 'FAILURE' };

    }

});


// PDF to Word (placeholder)

app.post('/pdf-to-word', upload.single('file'), (req, res) => {

    const taskId = generateTaskId();

    tasks[taskId] = { state: 'PENDING' };

    res.redirect(`/processing?task_id=${taskId}`);


    setTimeout(() => {

        const outputPath = path.join('uploads', `converted-${Date.now()}.docx`);

        fs.writeFile(outputPath, 'Converted content', (err) => {

            if (err) tasks[taskId] = { state: 'FAILURE' };

            else tasks[taskId] = { state: 'SUCCESS', result: outputPath };

        });

    }, 2000);

});


// Word to PDF (placeholder)

app.post('/word-to-pdf', upload.single('file'), (req, res) => {

    const taskId = generateTaskId();

    tasks[taskId] = { state: 'PENDING' };

    res.redirect(`/processing?task_id=${taskId}`);


    setTimeout(() => {

        const outputPath = path.join('uploads', `converted-${Date.now()}.pdf`);

        fs.writeFile(outputPath, 'Converted content', (err) => {

            if (err) tasks[taskId] = { state: 'FAILURE' };

            else tasks[taskId] = { state: 'SUCCESS', result: outputPath };

        });

    }, 2000);

});


// Summarize and Chat (placeholder)

app.post('/summarize', upload.single('file'), (req, res) => {

    const taskId = generateTaskId();

    tasks[taskId] = { state: 'PENDING' };

    res.redirect(`/processing?task_id=${taskId}`);


    setTimeout(() => {

        const outputPath = path.join('uploads', `summary-${Date.now()}.txt`);

        fs.writeFile(outputPath, 'Summary content', (err) => {

            if (err) tasks[taskId] = { state: 'FAILURE' };

            else tasks[taskId] = { state: 'SUCCESS', result: outputPath };

        });

    }, 2000);

});


// Status polling

app.get('/status/:taskId', (req, res) => {

    const task = tasks[req.params.taskId];

    res.json(task || { state: 'NOT_FOUND' });

});


// Download endpoint

app.get('/download/:filename', (req, res) => {

    const filePath = path.join('uploads', req.params.filename);

    res.download(filePath, err => {

        if (err) res.status(404).send('File not found');

    });

});


// Error handling

app.use((err, req, res, next) => {

    res.redirect(`/error?message=${encodeURIComponent(err.message || 'An unexpected error occurred.')}`);

});


app.listen(port, () => {

    console.log(`Server running on http://localhost:${port}`);

});
