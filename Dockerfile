# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

ENV ENERGINET_REFRESH_TOKEN=
ENV DATABASE_URL="postgresql://postgres:password@db:5432/ordbogenpower?"


# Build the Nuxt.js application
RUN pnpm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "pnpm", "run", "start" ]