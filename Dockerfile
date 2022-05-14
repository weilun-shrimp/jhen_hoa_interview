FROM php:8.1-apache
MAINTAINER Weilun

COPY ./conf/000-default.conf /etc/apache2/sites-available/000-default.conf

#apache config
RUN a2enmod rewrite
RUN a2dissite 000-default.conf
RUN a2ensite 000-default.conf

#install php extensions
RUN docker-php-source extract
RUN docker-php-ext-install mysqli pdo pdo_mysql

# RUN apt-get update
# RUN apt-get install -y git


#project
# WORKDIR /var/www/html
# COPY ./src /var/www/html

# RUN ls

#install composer
# COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer 
# RUN composer install -n

#.env
# RUN cp .env.example .env
# RUN php artisan key:generate

#install nodejs
# RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
# RUN apt-get install -y nodejs
# RUN npm install
# RUN npm run dev  #has permission issue
