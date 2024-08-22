# Build

FROM node:18 as build

WORKDIR  /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

RUN yarn

COPY . .

RUN yarn run build

# Execução

FROM node:18-alpine3.19

WORKDIR  /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "run", "start"]
