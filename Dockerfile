FROM node:12

WORKDIR /app
COPY package.json package.json
RUN sudo yarn
COPY . .
CMD node app.js