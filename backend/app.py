from flask import Flask, request, send_file

from flask_cors import CORS

from PyPDF2 import PdfMerger

import tempfile


app = Flask(__name__)

CORS(app)


@app.route('/api/convert', methods=['GET'])

def convert():

    return {"status": "ok", "message": "Convert endpoint working"}, 200


@app.route('/api/merge', methods=['POST'])

def merge_pdfs():

    merger = PdfMerger()

    files = request.files.getlist('pdfs')

    if not files:

        return {"error": "No files uploaded"}, 400

    for file in files:

        merger.append(file.stream)

    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as output_file:

        merger.write(output_file.name)

        merger.close()

        return send_file(output_file.name, as_attachment=True, download_name='merged.pdf')


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000)
