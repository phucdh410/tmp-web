FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean && yarn install

COPY . .

RUN yarn build

EXPOSE 2906

CMD ["yarn", "dev"]