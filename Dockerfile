FROM node:14

RUN apt-get -y update && apt-get install -y google-chrome-stable

WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
CMD node app.js