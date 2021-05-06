FROM node:14

RUN apt-get update && apt-get wget \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    apt install ./google-chrome-stable_current_amd64.deb

WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .
CMD node app.js