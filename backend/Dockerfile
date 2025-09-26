# ------------------------------

# Backend Dockerfile

# ------------------------------

FROM python:3.11-slim-bookworm


# Set working directory

WORKDIR /app


# Install system dependencies (needed for PDF/Word processing)

RUN apt-get update && apt-get install -y \

    libreoffice \

    libreoffice-writer \

    libreoffice-core \

    poppler-utils \

    wget \

    curl \

 && rm -rf /var/lib/apt/lists/*


# Copy requirements first (for caching)

COPY requirements.txt .


# Install Python dependencies

RUN pip install --no-cache-dir -r requirements.txt


# Copy backend code

COPY . .


# Expose backend port

EXPOSE 5000


# Run Flask app

CMD ["python", "app.py"]

