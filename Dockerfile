#FROM ubuntu:latest as build
#RUN apt-get update 
#RUN apt-get -y install curl gnupg
#RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
#RUN apt-get -y install nodejs

#RUN mkdir -p var/www/app
#WORKDIR /var/www/app
#COPY package.json /var/www/app
#COPY package-lock.json /var/www/app
#COPY . /var/www/app
#WORKDIR /var/www/app
#RUN npm install
#RUN npm run build

#FROM nginx
#RUN rm /usr/share/nginx/html/*
#RUN mkdir -p /usr/share/nginx/html/app
#COPY --from=build /var/www/app/build /usr/share/nginx/html/app
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]



FROM node:10.23.1 as build
RUN apt-get update 

RUN mkdir -p var/www/app
WORKDIR /var/www/app
COPY package.json /var/www/app
#COPY package-lock.json /var/www/app
COPY . /var/www/app
WORKDIR /var/www/app
RUN npm install
RUN npm run build

FROM nginx
RUN rm /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/app
COPY --from=build /var/www/app/build /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]