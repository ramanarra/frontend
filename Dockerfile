FROM nginx
RUN rm /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/app
COPY ./build/. /usr/share/nginx/html/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]