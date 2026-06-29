FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn global add gulp-cli

COPY . .

RUN gulp build --production --env env/env.production.js && \
    gulp build --production --env env/env.development.js && \
    gulp build --production --env env/env.beta.js && \
    yarn run build:docs

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
