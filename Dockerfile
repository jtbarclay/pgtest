FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

# Bundle app source
COPY . .

# Map port
EXPOSE 5000

# Run server
CMD [ "node", "server.js" ]