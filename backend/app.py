# backend/app.py


import os

from flask import Flask, request, send_file, jsonify

from PyPDF2 import PdfMerger, PdfReader, PdfWriter

from werkzeug.utils import secure_filename

from io import BytesIO

from transformers import pipeline

import docx

from fpdf import FPDF

from huggingface_hub import login

from dotenv import load_dotenv  # ✅ import dotenv


# --- Load environment variables ---

load_dotenv()  # ✅ loads variables from backend/.env


app = Flask(__name__)


# --- Setup ---

UPLOAD_FOLDER = os.getenv("UPLOAD_DIR", "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --- Hugging Face Login ---

hf_token = os.getenv("HUGGINGFACE_API_KEY")


if hf_token:

    login(hf_token)

else:

    print("⚠ Warning: No Hugging Face API key found. Some features may not work.")


# ✅ Summarization model

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


# --- Routes ---


@app.route("/merge", methods=["POST"])

def merge_pdfs():

    merger = PdfMerger()

    files = request.files.getlist("files")


    for file in files:

        filename = secure_filename(file.filename)

        filepath = os.path.join(UPLOAD_FOLDER, filename)

        file.save(filepath)

        merger.append(filepath)


    output = BytesIO()

    merger.write(output)

    merger.close()

    output.seek(0)


    return send_file(output, as_attachment=True, download_name="merged.pdf")


@app.route("/summarize", methods=["POST"])

def summarize_pdf():

    file = request.files["file"]

    pdf_reader = PdfReader(file)

    text = "".join([page.extract_text() or "" for page in pdf_reader.pages])


    if not text.strip():

        return jsonify({"error": "No text found in PDF"}), 400


    summary = summarizer(text[:1000], max_length=130, min_length=30, do_sample=False)

    return jsonify({"summary": summary[0]["summary_text"]})


@app.route("/docx-to-pdf", methods=["POST"])

def docx_to_pdf():

    file = request.files["file"]

    doc = docx.Document(file)


    pdf = FPDF()

    pdf.add_page()

    pdf.set_font("Arial", size=12)


    for para in doc.paragraphs:

        pdf.multi_cell(0, 10, para.text)


    output = BytesIO()

    pdf.output(output)

    output.seek(0)


    return send_file(output, as_attachment=True, download_name="converted.pdf")


# --- Run App ---

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))

