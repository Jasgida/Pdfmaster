FROM python:3.11-slim-bookworm


WORKDIR /app


RUN apt-get update && apt-get install -y \

    libreoffice \

    libreoffice-writer \

    libreoffice-core \

    poppler-utils \

    ghostscript \

    wget \

    curl \

 && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY . .


EXPOSE 5000

CMD ["python", "app.py"]

