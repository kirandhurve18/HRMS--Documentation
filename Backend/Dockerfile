# Use official Node.js LTS image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 3005

# Start the backend server
CMD ["npm", "start"]
