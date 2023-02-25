# Choose the Image which has Node installed already
FROM node:14-alpine as builder
# set dockerignore file


# make the 'app' folder the current working directory
WORKDIR /build

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# ignore the .dockerignore file
COPY . .

# build app for production with minification
RUN npm run build

FROM nginx as production-build
LABEL "dev.timhunter.health.vendor"="Tim Hunter"
LABEL version="1.0"
LABEL description="Frontend of the health app"
LABEL maintainer="Tim Hunter <thunte27@uwo.ca>"
LABEL "dev.timhunter.health.release-date"="2021-03-01"

ENV NGINX_API_URL https://timhunter.dev/api


# COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*

# Copy from the stahg 1
COPY --from=builder /build/dist /usr/share/nginx/html

RUN mkdir /etc/nginx/templates
COPY nginx/prod.conf.template /etc/nginx/templates/default.conf.template
