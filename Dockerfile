FROM node:11

ENV NODE_ENV=production

RUN mkdir /src
WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

CMD ["yarn", "start"]
