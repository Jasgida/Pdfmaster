import os

import tempfile

import zipfile

from flask import Flask, request, jsonify, send_file

from werkzeug.utils import secure_filename

from PyPDF2 import PdfReader, PdfWriter

from fpdf import FPDF

import docx2pdf

from pdf2docx import Converter


app = Flask(__name__)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER



# ---------------------------

# ✅ SUMMARIZE PDF

# ---------------------------

@app.route("/summarize", methods=["POST"])

def summarize_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    if file.filename == "":

        return jsonify({"error": "No selected file"}), 400


    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))

    file.save(filepath)


    # Extract text (basic)

    reader = PdfReader(filepath)

    text = ""

    for page in reader.pages[:5]:  # limit to first 5 pages

        text += page.extract_text() or ""


    summary = text[:1000] + "..." if len(text) > 1000 else text  # naive summary


    return jsonify({"summary": summary})



# ---------------------------

# ✅ MERGE PDF

# ---------------------------

@app.route("/merge-pdf", methods=["POST"])

def merge_pdf():

    files = request.files.getlist("files")

    if len(files) < 2:

        return jsonify({"error": "Upload at least 2 PDFs"}), 400


    merger = PdfWriter()

    for f in files:

        filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(f.filename))

        f.save(filepath)

        merger.append(filepath)


    output_path = os.path.join(tempfile.gettempdir(), "merged.pdf")

    with open(output_path, "wb") as out:

        merger.write(out)


    return send_file(output_path, as_attachment=True, download_name="merged.pdf")



# ---------------------------

# ✅ SPLIT PDF

# ---------------------------

@app.route("/split-pdf", methods=["POST"])

def split_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))

    file.save(filepath)


    reader = PdfReader(filepath)

    zip_path = os.path.join(tempfile.gettempdir(), "split_pages.zip")


    with zipfile.ZipFile(zip_path, "w") as zipf:

        for i, page in enumerate(reader.pages):

            writer = PdfWriter()

            writer.add_page(page)


            page_path = os.path.join(tempfile.gettempdir(), f"page_{i+1}.pdf")

            with open(page_path, "wb") as f:

                writer.write(f)


            zipf.write(page_path, os.path.basename(page_path))


    return send_file(zip_path, as_attachment=True, download_name="split_pages.zip")



# ---------------------------

# ✅ COMPRESS PDF (simple)

# ---------------------------

@app.route("/compress-pdf", methods=["POST"])

def compress_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))

    file.save(filepath)


    # ⚠️ Basic compression = re-writing PDF

    reader = PdfReader(filepath)

    writer = PdfWriter()


    for page in reader.pages:

        writer.add_page(page)


    output_path = os.path.join(tempfile.gettempdir(), "compressed.pdf")

    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True, download_name="compressed.pdf")



# ---------------------------

# ✅ WORD → PDF

# ---------------------------

@app.route("/word-to-pdf", methods=["POST"])

def word_to_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))

    file.save(filepath)


    output_path = os.path.join(tempfile.gettempdir(), "converted.pdf")

    docx2pdf.convert(filepath, output_path)


    return send_file(output_path, as_attachment=True, download_name="converted.pdf")



# ---------------------------

# ✅ PDF → WORD

# ---------------------------

@app.route("/pdf-to-word", methods=["POST"])

def pdf_to_word():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))

    file.save(filepath)


    output_path = os.path.join(tempfile.gettempdir(), "converted.docx")

    cv = Converter(filepath)

    cv.convert(output_path, start=0, end=None)

    cv.close()


    return send_file(output_path, as_attachment=True, download_name="converted.docx")



if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True)

