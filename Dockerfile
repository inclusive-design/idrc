FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.18.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
