# Inventory management

this project is school related project and will be used to manage the inventory management. You can use the following commands to install the whole project.

## Technology

-   Client
    -   Javascript
    -   React js
    -   Ant design
-   Server
    -   php
    -   Laravel

## Installation

First make sure you have installed [Node](https://nodejs.org/en/) in machine environment and you have to install [composer](https://getcomposer.org/). then clone the repository.

### Server

run:

```
cd server/
composer install
```

Next copy `.env.example` file to `.env` by run command

```
copy .env.example .env
```

Create your own database in xampp and open your `.env` file and change the database name (`DB_DATABASE`) to whatever you have, field correspond to your configuration.

Next generate key, run:

```
php artisan key:generate
```

then migrate database, run:

```
php artisan migrate
```

finally just run:

```
php artisan serve
```

### Client

run:

```
cd client/
npm install
```

Next, run:

```
npm run dev
```

Go to [http://localhost:5173/](http://localhost:5173/)
