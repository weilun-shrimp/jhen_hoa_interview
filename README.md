# Weilun Interview
Docker, Laravel, JWT Auth, Mysql, Vue, Bootstrap, Scss
*   [Installation - 安裝](#installation---安裝)
    *   [Docker](#docker)
    *   [Straight](#straight)
    
## Installation

### Docker
```bash
$ docker compose up
$ docker exec -it wl_interview_php_apache bash
$ cd /var/www/html
# $ composer install --ignore-platform-reqs
# $ npm install
# $ php artisan key:generate
# $ php artisan storage:link
# $ php artisan jwt:secret
# $ php artisan migrate
# $ php artisan db:seed
$ npm run dev
$ exit
```

### Straight
Before you start, you must check requirement env package down below
- php ^7.4
- composer 2.3.7
- node ^16.14
- mysql ^5.6

```bash
$ composer install --ignore-platform-reqs
$ npm install
$ npm run dev
```

The Laravel package is in ./src folder, so you just copy the ./src folder to your localhost env
```bash
$ cd src
$ cp .env.example .env
$ php artisan key:generate
$ php artisan storage:link
$ php artisan jwt:secret
```

After you changed you mysql connection params.
```bash
$ php artisan migrate
$ php artisan db:seed
```