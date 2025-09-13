# Stage 1: Build React frontend

FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Setup backend + serve frontend

FROM node:18-slim

WORKDIR /app


# Copy backend dependencies

COPY package*.json ./

RUN npm install --omit=dev


# Copy backend server

COPY server.js ./


# Copy frontend build into /public (for Express)

COPY --from=build /app/dist ./public


# Copy uploads directory

RUN mkdir -p uploads


EXPOSE 3000

CMD ["node", "server.js"]

