FROM nginx
RUN mkdir -p /var/www/html/app
RUN mkdir -p /etc/virujh-ca
COPY ./nginx/local/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build/. /var/www/html/app
COPY ./virujh-static/. /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]