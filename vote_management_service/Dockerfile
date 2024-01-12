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
EXPOSE 8080 

ENV DB_NAME ''
ENV DB_PASSWORD ''
ENV DB_PORT ''
ENV DB_HOST ''
ENV DB_USER ''
ENV APP_PORT ''
ENV AES_KEY ''
ENV IV_KEY ''
ENV JWT_SECRET_KEY ''
ENV RABBITMQ_SERVER_URI ''
ENV ELECTION_MANAGEMENT_SERVICE_HOST ''
ENV ELECTION_MANAGEMENT_SERVICE_PORT ''

# Define the command to run your application
CMD ["nodemon"]