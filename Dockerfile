FROM selenium/standalone-chrome:latest

RUN sudo apt-get update && sudo apt-get install unzip -y
RUN sudo curl -fsSL https://deb.nodesource.com/setup_12.x | sudo bash -
RUN sudo apt-get install -y nodejs && sudo npm install -g yarn

WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .
CMD node app.js