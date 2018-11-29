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
    connection: process.env.postgres://abokzeobtxmdyx:66c4a49a12b93889201062c278f7e7d902db9ba02445214bfb985dae1eab2b29@ec2-54-235-133-42.compute-1.amazonaws.com:5432/d707m4p7cnm1rg + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
