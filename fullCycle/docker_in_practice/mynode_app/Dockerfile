ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}

ENV PORT=3001
ENV MESSAGE="Hello from MyNodeApp!"

RUN useradd -m mynode

USER mynode

WORKDIR /app

COPY . .

CMD ["node", "index.js"]
