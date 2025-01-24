FROM public.ecr.aws/docker/library/node:16


# Setting up the working directory
WORKDIR /opt/

# Copying package.json and installing dependencies
COPY package.json ./
RUN npm install -g node-gyp
RUN npm install --timeout=600000
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm install --save-dev webpack webpack-cli
RUN npm install webpack-node-externals


#RUN npm config set timeout 600000 && npm install

# Adding node_modules to PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Moving to the app directory and copying source files
WORKDIR /opt/app
COPY . .

# Setting permissions and user
RUN chown -R node:node /opt/app
USER node

# Building the application
RUN npm install
RUN npm run build

# Exposing the port and starting the application
EXPOSE 3002
CMD ["npm", "start"]

