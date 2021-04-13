FROM nginx
#RUN rm /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/app
RUN mkdir -p /etc/virujh-ca
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY sshKey/. /etc/virujh-ca/.
COPY ./build/. /usr/share/nginx/html/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]