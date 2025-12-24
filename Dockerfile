FROM node:20.17.0

# App directory
WORKDIR /opt/app

# Copy dependency files first (Docker cache friendly)
COPY package.json package-lock.json ./

# Clean, deterministic install
RUN npm ci

# Copy rest of the app
COPY . .

# Build
RUN npm run build

# Render requires PORT binding
EXPOSE 3002

# Start app
CMD ["npm", "start"]
