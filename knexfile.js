module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  seeds: {
    directory: './db/seeds/dev',
  },
  useNullAsDefault: true,
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
