import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      connectionTimeout: +process.env.TIMEOUT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
  }
}
