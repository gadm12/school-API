FROM node:24 AS build

WORKDIR /app

COPY package*json ./

RUN NPM install

COPY  . .

RUN npm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html