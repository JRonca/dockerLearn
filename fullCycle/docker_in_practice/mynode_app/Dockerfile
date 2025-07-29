ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}

ENV PORT=3001
ENV MESSAGE="Hello from MyNodeApp!"

RUN useradd -m mynode

USER mynode

WORKDIR /app

COPY . .

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD [ "curl","-f","http://localhost:3001" ]

CMD ["node", "index.js"]
