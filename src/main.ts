import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-awagger';
import { SuccessResponse } from './http/SuccessResponse';
import { HttpFaild } from './http/HttpFaild';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalInterceptors(new SuccessResponse());
  app.useGlobalFilters(new HttpFaild());
  // swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
