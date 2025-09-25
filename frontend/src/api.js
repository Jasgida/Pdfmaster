// frontend/src/api.js

const API_BASE = "http://localhost:5000"; // adjust if your backend host is different


export async function splitPdf(file, startPage, endPage) {

  const formData = new FormData();

  formData.append("file", file);

  formData.append("start_page", startPage);

  formData.append("end_page", endPage);


  const res = await fetch(`${API_BASE}/split-pdf`, {

    method: "POST",

    body: formData,

  });


  const blob = await res.blob();

  return blob;

}


export async function mergePdfs(files) {

  const formData = new FormData();

  files.forEach(f => formData.append("files", f));


  const res = await fetch(`${API_BASE}/merge-pdf`, {

    method: "POST",

    body: formData,

  });


  const blob = await res.blob();

  return blob;

}


export async function compressPdf(file) {

  const formData = new FormData();

  formData.append("file", file);


  const res = await fetch(`${API_BASE}/compress-pdf`, {

    method: "POST",

    body: formData,

  });


  const blob = await res.blob();

  return blob;

}


export async function wordToPdf(file) {

  const formData = new FormData();

  formData.append("file", file);


  const res = await fetch(`${API_BASE}/word-to-pdf`, {

    method: "POST",

    body: formData,

  });


  const blob = await res.blob();

  return blob;

}


export async function pdfToWord(file) {

  const formData = new FormData();

  formData.append("file", file);


  const res = await fetch(`${API_BASE}/pdf-to-word`, {

    method: "POST",

    body: formData,

  });


  const blob = await res.blob();

  return blob;

}


export async function summarizePdf(file) {

  const formData = new FormData();

  formData.append("file", file);


  const res = await fetch(`${API_BASE}/summarize-pdf`, {

    method: "POST",

    body: formData,

  });


  const data = await res.json();

  return data;

}

