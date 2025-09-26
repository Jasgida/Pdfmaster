import os

from flask import Flask, request, jsonify, send_file

from flask_cors import CORS

from werkzeug.utils import secure_filename

from PyPDF2 import PdfReader, PdfWriter

from fpdf import FPDF

from pdf2docx import Converter


app = Flask(__name__)

CORS(app)


UPLOAD_FOLDER = "data"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)



# -----------------------

# Compress PDF

# -----------------------

@app.route("/api/compress-pdf", methods=["POST"])

def compress_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_path = os.path.join(UPLOAD_FOLDER, f"compressed_{filename}")

    file.save(input_path)


    reader = PdfReader(input_path)

    writer = PdfWriter()

    for page in reader.pages:

        writer.add_page(page)


    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True)



# -----------------------

# Merge PDFs

# -----------------------

@app.route("/api/merge-pdf", methods=["POST"])

def merge_pdf():

    files = request.files.getlist("files")

    if not files:

        return jsonify({"error": "No files uploaded"}), 400


    output_path = os.path.join(UPLOAD_FOLDER, "merged.pdf")

    writer = PdfWriter()


    for file in files:

        filename = secure_filename(file.filename)

        input_path = os.path.join(UPLOAD_FOLDER, filename)

        file.save(input_path)

        reader = PdfReader(input_path)

        for page in reader.pages:

            writer.add_page(page)


    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True)



# -----------------------

# Split PDF

# -----------------------

@app.route("/api/split-pdf", methods=["POST"])

def split_pdf():

    if "file" not in request.files or "start" not in request.form or "end" not in request.form:

        return jsonify({"error": "File, start, and end are required"}), 400


    file = request.files["file"]

    start = int(request.form["start"])

    end = int(request.form["end"])


    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_path = os.path.join(UPLOAD_FOLDER, f"split_{filename}")

    file.save(input_path)


    reader = PdfReader(input_path)

    writer = PdfWriter()

    for i in range(start - 1, end):

        writer.add_page(reader.pages[i])


    with open(output_path, "wb") as f:

        writer.write(f)


    return send_file(output_path, as_attachment=True)



# -----------------------

# PDF to Word

# -----------------------

@app.route("/api/pdf-to-word", methods=["POST"])

def pdf_to_word():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_path = os.path.join(UPLOAD_FOLDER, f"{os.path.splitext(filename)[0]}.docx")

    file.save(input_path)


    cv = Converter(input_path)

    cv.convert(output_path, start=0, end=None)

    cv.close()


    return send_file(output_path, as_attachment=True)



# -----------------------

# Word to PDF

# -----------------------

@app.route("/api/word-to-pdf", methods=["POST"])

def word_to_pdf():

    if "file" not in request.files:

        return jsonify({"error": "No file uploaded"}), 400


    file = request.files["file"]

    filename = secure_filename(file.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_path = os.path.join(UPLOAD_FOLDER, f"{os.path.splitext(filename)[0]}.pdf")

    file.save(input_path)


    # NOTE: This is a simple text-to-PDF (not layout accurate).

    pdf = FPDF()

    pdf.add_page()

    pdf.set_font("Arial", size=12)


    try:

        text = file.read().decode("utf-8", errors="ignore")

        pdf.multi_cell(200, 10, text)

    except Exception:

        pdf.multi_cell(200, 10, "Unable to parse Word file content as text.")


    pdf.output(output_path)


    return send_file(output_path, as_attachment=True)



# -----------------------

# Health Check

# -----------------------

@app.route("/api/health", methods=["GET"])

def health():

    return jsonify({"status": "ok"})



if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000)

