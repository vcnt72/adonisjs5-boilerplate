FROM node:16-buster-slim

WORKDIR /src

COPY package*.json ./

RUN npm install -g typescript

RUN npm install

COPY . ./

RUN npm run build

COPY .env /src/build/

CMD [ "node", "./build/server.js" ]
