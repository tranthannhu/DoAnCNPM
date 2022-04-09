require('dotenv').config();
module.exports = [
  {
    name: 'default',
    type: 'mssql',
    host: process.env.DB_HOST,
    // port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: true,
    dropSchema: true,
    extra: {
      trustServerCertificate: true,
    },
    migrationsTableName: 'custom_migration_table',
    migrations: ['src/database/migrations/*{.ts,.js}'],
    entities: ['src/**/*.entity{.ts,.js}'],
    seeds: ['src/database/seeds/**/*.seed{.ts,.js}'],
    factories: ['src/database/factories/**/*.factory{.ts,.js}'],
    cli: {
      'migrationsDir': 'src/database/migrations'
    }
  },
];
