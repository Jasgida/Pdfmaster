# Stage 1: Build frontend

FROM node:20 AS build

WORKDIR /app

# Install dependencies

COPY package*.json ./

RUN npm install

# Copy source and build with environment variable

COPY . .

RUN npm run build

# Stage 2: Serve with Nginx

FROM nginx:alpine

# Copy nginx server block into conf.d

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output   

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
