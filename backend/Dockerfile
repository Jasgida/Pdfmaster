# backend/Dockerfile

FROM python:3.12-slim


# Set working directory

WORKDIR /app


# Copy backend files

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY backend/ .


# Expose the backend port

EXPOSE 5000


# Run Flask app

CMD ["python", "app.py"]

