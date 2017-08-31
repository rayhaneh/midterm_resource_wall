require('dotenv').config();

module.exports = {

  production: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  development: {
    client: 'postgresql',
    connection: process.env.DB_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};


