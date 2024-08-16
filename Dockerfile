FROM node:20-bullseye-slim AS base
LABEL maintainer="Shahan <shahan.khaan@gmail.com>"
LABEL description="This is a nest-js boilerplate"
ENV NODE_ENV=production
RUN apt-get update \
  && apt-get install -y --no-install-recommends default-mysql-client curl procps \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
EXPOSE 7000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
HEALTHCHECK --retries=5 --timeout=5s CMD curl -f localhost:7000/healthcheck || exit 1

### dev stage
FROM base AS dev
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
RUN npm run build

### test stage
FROM base AS test
ENV NODE_ENV=test
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

FROM base AS source
COPY --chown=node:node . .
COPY --from=dev /app/dist ./dist

### production stage
FROM source AS prod
CMD [ "node", "dist/index.js" ]
