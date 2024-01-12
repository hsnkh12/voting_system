# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 8082

ENV DB_NAME ''
ENV DB_PASSWORD ''
ENV DB_PORT ''
ENV DB_HOST ''
ENV RABBITMQ_SERVER_URI ''
ENV AES_KEY ''

# Define the command to run your application
CMD ["nodemon"]