import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { knife4jSetup } from 'nest-knife4j';
import * as chalk from 'chalk';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { AllExceptionFilter } from './common/filter/http.filter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  // session 配置
  app.use(
    session({
      secret: 'lyl',
      resave: false,
      cookie: { maxAge: null },
      name: 'lyl',
      rolling: true,
      saveUninitialized: true,
    }),
  );

  // 开启跨域
  app.enableCors();

  // 处理静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    // 虚拟路径
    prefix: '/uploads',
  });

  // 使用拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 过滤器
  app.useGlobalFilters(new AllExceptionFilter());

  // 全局管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局守卫
  // app.useGlobalGuards(new AuthGuard());
  //Swagger 文档
  const options = new DocumentBuilder()
    .setTitle('文档')
    .setDescription('测试')
    .setVersion('1.0')
    .addTag('测试')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // knife4j文档
  knife4jSetup(app, [
    {
      name: '2.X版本',
      url: `/api-json`,
      swaggerVersion: '1.0',
      location: `/api-json`,
    },
  ]);

  // 启动配置
  const port = configService.get('http.port');
  const host = configService.get('http.host');

  await app.listen(port);

  console.log(`
    🚀 应用已启动: http://${host}:${port}
    📚 Swagger文档: http://${host}:${port}/api
    🔪 knife4j文档: http://${host}:${port}/doc.html
  `);
}
bootstrap();
