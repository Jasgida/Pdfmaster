# Build stage for frontend

FROM node:18 AS build


WORKDIR /app


COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build


# Final stage for running the app

FROM node:18-slim


WORKDIR /app


COPY --from=build /app/dist ./dist

COPY --from=build /app/server.js .

COPY --from=build /app/package*.json ./

COPY --from=build /app/node_modules ./node_modules


# Create uploads directory

RUN mkdir -p uploads


EXPOSE 3000


CMD ["node", "server.js"]
