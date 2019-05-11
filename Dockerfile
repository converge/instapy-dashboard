FROM alpine:3.9
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN apk update; apk add npm; npm install