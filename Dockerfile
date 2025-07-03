# Use the latest microsoft playwright image
FROM mcr.microsoft.com/playwright:v1.53.0-noble

# Set the working directory inside the container to /app
WORKDIR /tests

# Copy package.json and package-lock.json from the host to the container's working directory
# COPY package.json package-lock.json ./
# COPY .env ./

# Install Node.js dependencies using npm ci (clean install)
RUN npm ci --include=dev

# Copy the application code from the host to the container's working directory
COPY . .

# Install Chrome browser for use with Playwright
RUN npx playwright install