import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  const config = new DocumentBuilder()
    .setTitle('Rewards Api')
    .setDescription('Multi Tenant Rewards Api')
    .setVersion('1.0')
    .addTag('reward-configuration')
    .addTag('reward-redemption')
    .addTag('tenant')
    .addTag('user-rewards')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.enableCors();
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();
