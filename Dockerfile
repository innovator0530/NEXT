FROM node:14.18.1-alpine3.14

RUN apk add --no-cache ffmpeg imagemagick

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3141 3142 3000 27017

CMD [ "npm", "start" ]
