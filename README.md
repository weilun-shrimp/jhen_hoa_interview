# Weilun Interview
Docker, Laravel, JWT Auth, Mysql, Vue, Bootstrap, Scss
*   [Installation - 安裝](#installation)
    *   [Docker](#docker)
    *   [Straight](#straight)
*   [Seed User](#seed-user)
    
## Installation

### Docker
```bash
$ docker compose up --detach
$ docker exec -it wl_interview_php_apache bash
$ cd /var/www/html
$ php artisan migrate
$ php artisan db:seed
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

## Seed User
- email : admin@gmail.com
- password : admin