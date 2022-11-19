FROM node:18-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

CMD [ "npm", "run", "dev" ]