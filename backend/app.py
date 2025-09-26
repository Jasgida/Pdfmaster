import os

from flask import Flask, request, jsonify, send_file

from werkzeug.utils import secure_filename

from PyPDF2 import PdfReader, PdfWriter

from fpdf import FPDF

from docx import Document

from pdf2docx import Converter

from docx2pdf import convert


# -----------------------

# Setup

# -----------------------

app = Flask(__name__)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)



# -----------------------

# Word → PDF

# -----------------------

@app.route("/api/word-to-pdf", methods=["POST"])

def word_to_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_filename = f"{os.path.splitext(filename)[0]}.pdf"

    output_path = os.path.join(UPLOAD_FOLDER, output_filename)

    file.save(input_path)


    try:

        convert(input_path, output_path)

    except Exception as e:

        return jsonify({"error": str(e)}), 500


    return send_file(output_path, as_attachment=True, download_name=output_filename)



# -----------------------

# PDF → Word

# -----------------------

@app.route("/api/pdf-to-word", methods=["POST"])

def pdf_to_word():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_filename = f"{os.path.splitext(filename)[0]}.docx"

    output_path = os.path.join(UPLOAD_FOLDER, output_filename)

    file.save(input_path)


    try:

        cv = Converter(input_path)

        cv.convert(output_path, start=0, end=None)

        cv.close()

    except Exception as e:

        return jsonify({"error": str(e)}), 500


    return send_file(output_path, as_attachment=True, download_name=output_filename)



# -----------------------

# Merge PDFs

# -----------------------

@app.route("/api/merge", methods=["POST"])

def merge_pdfs():

    files = request.files.getlist("files")

    if not files:

        return jsonify({"error": "No files uploaded"}), 400


    output_path = os.path.join(UPLOAD_FOLDER, "merged.pdf")

    writer = PdfWriter()


    for file in files:

        reader = PdfReader(file)

        for page in reader.pages:

            writer.add_page(page)


    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True, download_name="merged.pdf")



# -----------------------

# Split PDF

# -----------------------

@app.route("/api/split", methods=["POST"])

def split_pdf():

    if "file" not in request.files or "start" not in request.form or "end" not in request.form:

        return jsonify({"error": "Missing parameters"}), 400


    file = request.files["file"]

    start = int(request.form["start"])

    end = int(request.form["end"])

    input_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))

    file.save(input_path)


    reader = PdfReader(input_path)

    writer = PdfWriter()


    for i in range(start - 1, min(end, len(reader.pages))):

        writer.add_page(reader.pages[i])


    output_path = os.path.join(UPLOAD_FOLDER, "split.pdf")

    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True, download_name="split.pdf")



# -----------------------

# Compress PDF (naive)

# -----------------------

@app.route("/api/compress", methods=["POST"])

def compress_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    input_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))

    output_path = os.path.join(UPLOAD_FOLDER, "compressed.pdf")

    file.save(input_path)


    reader = PdfReader(input_path)

    writer = PdfWriter()


    for page in reader.pages:

        writer.add_page(page)


    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True, download_name="compressed.pdf")



# -----------------------

# Summarize PDF → PDF

# -----------------------

@app.route("/api/summarize", methods=["POST"])

def summarize_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_filename = f"summarized_{os.path.splitext(filename)[0]}.pdf"

    output_path = os.path.join(UPLOAD_FOLDER, output_filename)

    file.save(input_path)


    # Extract text

    reader = PdfReader(input_path)

    text = ""

    for page in reader.pages[:3]:  # summarize first 3 pages

        page_text = page.extract_text()

        if page_text:

            text += page_text + "\n"


    # Naive summary

    summary = " ".join(text.split()[:100]) + "..." if text else "No text available."


    # Write summary into a PDF

    pdf = FPDF()

    pdf.add_page()

    pdf.set_font("Arial", size=12)

    pdf.multi_cell(0, 10, summary)


    pdf.output(output_path)  # write file


    # Validation

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:

        return jsonify({"error": "Failed to generate summary PDF"}), 500


    return send_file(

        output_path,

        as_attachment=True,

        download_name=output_filename,

        mimetype="application/pdf"

    )



# -----------------------

# Run

# -----------------------

if __name__ == "__main__":

    app.run(debug=True, host="0.0.0.0", port=5000)

