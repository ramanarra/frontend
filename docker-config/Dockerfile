FROM nginx

RUN unlink /etc/timezone
RUN ln -s /usr/share/zoneinfo/Asia/Kolkata /etc/timezone

RUN unlink /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Kolkata /etc/localtime


RUN mkdir -p /var/www/html/app
RUN mkdir -p /etc/virujh-ca
COPY docker-config/nginx/local/nginx.conf /etc/nginx/conf.d/default.conf

COPY /build/. /var/www/html/app/.
COPY ./virujh-static/. /var/www/html/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]