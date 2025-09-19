# Stage 1: Build frontend

FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Serve with Nginx

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf   # <-- correct path

COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

