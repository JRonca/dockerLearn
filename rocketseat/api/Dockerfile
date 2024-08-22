# Build

FROM node:18-alpine3.19

WORKDIR  /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

RUN yarn

COPY . .

RUN yarn run build

# Execução

EXPOSE 3000

CMD ["yarn", "run", "start"]
