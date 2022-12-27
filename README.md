# Sagar Gas Strapi Admin Panel
A gas Agency admininstartion management tool

## Usage

Install node dependeny by running npm i

```bash
  npm i
```

Run Application on Development

```bash
  npm run devlop
```

# Configure Mysql database

Go on project Project>config>database.js and put below configuration

```bash

  module.exports = ({ env }) => ({
    connection: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        },
      },
      debug: false,
    },
  });


```

Set below .env constant

```bash
  HOST=0.0.0.0
  PORT=1337 
  DATABASE_NAME= <Database Name>
  DATABASE_USERNAME= <Databse User name>
  DATABASE_PASSWORD= <Databse Password>
```



