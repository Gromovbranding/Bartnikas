FROM nginx:1.21.6

RUN rm -rf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY proxy-nginx.conf /etc/nginx/proxy-nginx.conf