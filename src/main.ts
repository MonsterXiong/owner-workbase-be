import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-awagger';
import { SuccessResponse } from './http/SuccessResponse';
import { HttpFaild } from './http/HttpFaild';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
 // 开启静态资源访问
 app.useStaticAssets('public')
  //  app.useStaticAssets(join(__dirname,'../public'),{prefix:'/static'})
  app.useGlobalInterceptors(new SuccessResponse());
  app.use(express.json({limit:'50mb'}))
  app.useGlobalFilters(new HttpFaild());
  // swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
