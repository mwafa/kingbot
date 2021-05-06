FROM node:14

RUN apt-get install -y google-chrome-stable

WORKDIR /app
COPY package.json package.json
RUN npm install && npm install chromedriver --chromedriver-force-download
COPY . .
CMD node app.js