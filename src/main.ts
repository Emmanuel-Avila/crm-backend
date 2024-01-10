import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5174', // Especifica el origen permitido
    methods: 'GET,POST', // Métodos HTTP permitidos
  });
  await app.listen(3001);
}
bootstrap();
