# Use an official Node.js runtime as the base image
FROM node:14

# Set environment variables
ENV NODE_ENV=production
ENV API_URL=localhost
ENV NOTIFICATION_BASH_ID=1
ENV LAABS_AUTH=1
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "cron"]
