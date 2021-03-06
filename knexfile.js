require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    // connection: process.env.DB_URL + '?ssl=true',
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  // production: {
  //   connection: process.env.DB_URL + '?ssl=true',
  //   migrations: {
  //     directory: './db/migrations',
  //     tableName: 'migrations'
  //   },
  //     pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   seeds: {
  //     directory: './db/seeds'
  //   }
  // }

};
