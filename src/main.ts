import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  GraphqlConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { load as loadSecrets } from '@qatalog/gcp-config';
import * as assert from 'assert';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const graphqlConfig = configService.get<GraphqlConfig>('graphql');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  const config = await loadSecrets({
    project: process.env.PROJECT_ID,
    schema: {
      jwtAccessToken: {
        secret: 'JWT_ACCESS_SECRET',
      },
      jwtRefreshToken: {
        secret: 'JWT_REFRESH_SECRET',
      },
    },
  });
  assert(typeof config.jwtAccessToken === 'string');
  assert(typeof config.jwtRefreshToken === 'string');

  // graphql file uploads
  if (graphqlConfig.uploadFilesEnabled) {
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
