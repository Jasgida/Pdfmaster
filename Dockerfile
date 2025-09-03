FROM node:20-alpine


# Set working directory

WORKDIR /app


# Copy package.json and install dependencies

COPY package*.json ./

RUN npm install --production


# Copy app code

COPY . .


# Expose port

EXPOSE 3000


# Start the server

CMD ["npm", "start"]
