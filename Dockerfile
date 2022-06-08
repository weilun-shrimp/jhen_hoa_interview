FROM php:8.1-apache
# MAINTAINER Weilun

COPY ./conf/000-default.conf /etc/apache2/sites-available/000-default.conf

#apache config
RUN a2enmod rewrite
RUN a2dissite 000-default.conf
RUN a2ensite 000-default.conf

#install php extensions
RUN docker-php-source extract
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apt-get update

#install git
RUN apt-get install -y git

#install composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer 

#install nodejs
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get install -y nodejs

#project
WORKDIR /var/www/html
COPY ./src /var/www/html


RUN composer install --ignore-platform-reqs

#.env
RUN cp .env.example .env
RUN php artisan key:generate
RUN php artisan storage:link
RUN php artisan jwt:secret
RUN php artisan migrate
RUN php artisan db:seed

RUN npm install
# npm run dev must do it in docker exec
