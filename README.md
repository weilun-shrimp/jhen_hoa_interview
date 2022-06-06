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
$ php artisan storage:link
$ php artisan migrate
$ exit
```

### Straight
The Laravel package is in ./src folder, so you just copy the ./src folder to your localhost env, then change the ./.env file for your local, and command down below.
```bash
$ php artisan storage:link
$ php artisan migrate
```