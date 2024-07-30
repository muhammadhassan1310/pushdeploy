# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (this will be overridden by Docker Compose)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
