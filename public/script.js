document.getElementById('darkModeToggle').addEventListener('click', () => {

  document.body.classList.toggle('dark');

});


function downloadBlob(blob, filename) {

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  a.download = filename;

  a.click();

  URL.revokeObjectURL(url);

}


async function handleSummarize() {

  const file = document.getElementById('summarizeFile').files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append('pdf', file);

  const res = await fetch('/summarize', { method: 'POST', body: formData });

  const data = await res.json();

  document.getElementById('summarizeResult').innerText = data.summary;

}


async function handleMerge() {

  const files = document.getElementById('mergeFiles').files;

  if (files.length < 2) return;

  const formData = new FormData();

  Array.from(files).forEach(file => formData.append('pdfs', file));

  const res = await fetch('/merge', { method: 'POST', body: formData });

  const blob = await res.blob();

  downloadBlob(blob, 'merged.pdf');

}


async function handleSplit() {

  const file = document.getElementById('splitFile').files[0];

  const page = document.getElementById('splitPage').value;

  if (!file || !page) return;

  const formData = new FormData();

  formData.append('pdf', file);

  const res = await fetch('/split', { method: 'POST', body: formData, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page }) }); // Note: Mix form and JSON; adjust if needed.

  const blob = await res.blob();

  downloadBlob(blob, 'split.zip');

}


async function handleCompress() {

  const file = document.getElementById('compressFile').files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append('pdf', file);

  const res = await fetch('/compress', { method: 'POST', body: formData });

  const blob = await res.blob();

  downloadBlob(blob, 'compressed.pdf');

}


async function handlePdfToWord() {

  const file = document.getElementById('pdfToWordFile').files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append('pdf', file);

  const res = await fetch('/pdf-to-word', { method: 'POST', body: formData });

  const blob = await res.blob();

  downloadBlob(blob, 'converted.docx');

}


async function handleWordToPdf() {

  const file = document.getElementById('wordToPdfFile').files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append('docx', file);

  const res = await fetch('/word-to-pdf', { method: 'POST', body: formData });

  const blob = await res.blob();

  downloadBlob(blob, 'converted.pdf');

}
