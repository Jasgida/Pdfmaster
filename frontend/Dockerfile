# frontend/Dockerfile

FROM node:20-alpine


WORKDIR /app


# Copy package files and install dependencies

COPY package*.json ./

RUN npm install


# Copy all frontend source

COPY . .


# Build the frontend

RUN npm run build


# Expose port (optional, since Nginx will serve)

EXPOSE 3000


CMD ["npm", "run", "dev"]

