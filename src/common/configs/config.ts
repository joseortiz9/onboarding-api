import type { Config } from './config.interface';
import * as process from 'process';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
    uploadFilesEnabled: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  redis: {
    config: {
      name: 'onboarding-api-redis',
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      keyPrefix: 'onboarding_api:',
    },
  },
};

export default (): Config => config;
