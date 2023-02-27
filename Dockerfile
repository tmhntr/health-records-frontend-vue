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

ARG VUE_APP_AUTH0_DOMAIN
ENV VUE_APP_AUTH0_DOMAIN=${VUE_APP_AUTH0_DOMAIN:-dev-mx-lf095.us.auth0.com}

ARG VUE_APP_AUTH0_CLIENT_ID
ENV VUE_APP_AUTH0_CLIENT_ID=${VUE_APP_AUTH0_CLIENT_ID:-Z5B00xA7x09fbsyicDKmZMSPGVikiRGQ}

ARG VUE_APP_AUTH0_REDIRECT_URI
ENV VUE_APP_AUTH0_REDIRECT_URI=${VUE_APP_AUTH0_REDIRECT_URI:-https://health.timhunter.dev}

# build app for production with minification
RUN npm run build

FROM nginx as production-build
LABEL description="Frontend of the health app"

ENV NGINX_API_URL https://timhunter.dev/api


# COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*

# Copy from the stahg 1
COPY --from=builder /build/dist /usr/share/nginx/html

RUN mkdir /etc/nginx/templates
COPY nginx/prod.conf.template /etc/nginx/templates/default.conf.template
