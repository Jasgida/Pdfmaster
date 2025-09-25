// server.js


import express from "express";

import multer from "multer";

import fs from "fs";

import path from "path";

import libre from "libreoffice-convert";


const app = express();


// ⚡ Change port to 3000 to avoid conflict with backend

const PORT = process.env.PORT || 3000;


// File upload middleware

const upload = multer({ dest: "uploads/" });


// ========== ROUTES ==========


// Merge PDFs (placeholder)

app.post("/merge", upload.array("pdfs"), (req, res) => {

  res.send("Merging not implemented yet");

});


// Word → PDF

app.post("/word-to-pdf", upload.single("word"), (req, res) => {

  const filePath = req.file.path;

  const ext = ".pdf";

  const outputPath = `${filePath}${ext}`;


  const file = fs.readFileSync(filePath);


  libre.convert(file, ext, undefined, (err, done) => {

    if (err) {

      console.error(`Error converting file: ${err}`);

      return res.status(500).send("Conversion failed");

    }


    fs.writeFileSync(outputPath, done);

    res.download(outputPath, "converted.pdf", (err) => {

      fs.unlinkSync(filePath);

      fs.unlinkSync(outputPath);

    });

  });

});


// PDF → Word

app.post("/pdf-to-word", upload.single("pdf"), (req, res) => {

  const filePath = req.file.path;

  const ext = ".docx";

  const outputPath = `${filePath}${ext}`;


  const file = fs.readFileSync(filePath);


  libre.convert(file, ext, undefined, (err, done) => {

    if (err) {

      console.error(`Error converting file: ${err}`);

      return res.status(500).send("Conversion failed");

    }


    fs.writeFileSync(outputPath, done);

    res.download(outputPath, "converted.docx", (err) => {

      fs.unlinkSync(filePath);

      fs.unlinkSync(outputPath);

    });

  });

});


// Health check

app.get("/", (req, res) => {

  res.send("PDFMaster frontend server is running ✅");

});


// Start server

app.listen(PORT, () => {

  console.log(`Frontend server running on http://localhost:${PORT}`);

});

