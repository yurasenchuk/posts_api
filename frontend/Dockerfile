FROM node:12-alpine as builder
WORKDIR /frontend
COPY . .
RUN npm install
COPY . /app
RUN npm run build