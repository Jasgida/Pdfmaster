FROM python:3.11-slim


# Set working directory

WORKDIR /app


# Copy requirements

COPY requirements.txt .


# Install dependencies

RUN pip install --no-cache-dir -r requirements.txt


# Copy backend code

COPY . .


# Expose the backend port

EXPOSE 5000


# Start the app

CMD ["python", "app.py"]

