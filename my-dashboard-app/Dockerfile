# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application 
RUN npm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Command to run the Next.js application in production mode
CMD ["npm", "run", "start"]
