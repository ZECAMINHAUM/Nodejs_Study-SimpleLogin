FROM node:11-alpine

WORKDIR /login-app

COPY package.json .

RUN npm install

RUN npm install nodemon -g

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . server.js