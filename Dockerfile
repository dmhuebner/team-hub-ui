FROM node:11

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Set ENV
#ENV PATH /app/node_modules/.bin:$PATH

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install
RUN npm install -g @angular/cli@7.3.0

# Get all the code needed to run the app
COPY . /app

RUN npm run build:prod

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
