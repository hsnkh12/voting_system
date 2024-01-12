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
EXPOSE 3000 

ENV REACT_APP_ELECTION_SERVICE_HOST ''
ENV REACT_APP_VOTE_SERVICE_HOST ''

# Define the command to run your application
CMD ["npm","start"]