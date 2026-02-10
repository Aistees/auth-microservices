import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Film Microservice')
    .setDescription('Film management API for cinema booking system')
    .setVersion('1.0.0')
    .addServer('/films')
    .addTag('Films', 'Film management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
  console.log('Film Microservice running on port 3003');
  console.log('Swagger documentation available at http://localhost:3003/api');
}
bootstrap();
