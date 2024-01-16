import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const CORS_METHODS = configService.get<string>('CORS_METHODS');
  const CORS_ORIGIN = configService.get<string>('CORS_ORIGIN');
  const PORT = configService.get<number>('PORT')

  app.enableCors({
    origin: CORS_ORIGIN, // Especifica el origen permitido
    methods: CORS_METHODS, // Métodos HTTP permitidos
  });
  await app.listen(PORT);
}
bootstrap();
