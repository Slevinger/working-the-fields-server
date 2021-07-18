FROM mhart/alpine-node:latest

WORKDIR /app
COPY /src /app/src
COPY /package.json /app

RUN npm install

CMD ["node", "src/index.js"]