FROM public.ecr.aws/docker/library/node:20

# Set the working directory
WORKDIR /opt/app

# Copy only package.json and package-lock.json first for dependency installation
COPY package.json package-lock.json ./

# Install global dependencies
RUN npm install -g node-gyp

# Install application dependencies
RUN npm install --timeout=600000

# Copy the rest of the application files
COPY . .

# Install Webpack and related dev dependencies for building the app
RUN npm install --save-dev webpack webpack-cli webpack-node-externals

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3002

# Set permissions to ensure the application runs as a non-root user
RUN chown -R node:node /opt/app
USER node

# Start the application
CMD ["npm", "start"]
