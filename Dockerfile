FROM node:16

WORKDIR /usr/src

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 65005

CMD [ "node", "mainController.js" ]