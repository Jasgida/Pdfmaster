# Use lightweight Python image

FROM python:3.11-slim


# Set working directory

WORKDIR /app


# Install system dependencies (needed for some PDF/Docx libs)

RUN apt-get update && apt-get install -y \

    libreoffice \

    poppler-utils \

    && rm -rf /var/lib/apt/lists/*


# Copy requirements

COPY requirements.txt .


# Install Python dependencies

RUN pip install --no-cache-dir -r requirements.txt


# Copy backend code

COPY . .


# Expose backend port

EXPOSE 5000


# Run Flask app

CMD ["python", "app.py"]

