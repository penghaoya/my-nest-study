import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from '@/modules/book/book.module';
import { UserModule } from '@/modules/user/user.module';
import { LylModule } from '@/modules/lyl/lyl.module';
import configuration from '@/config/configuration';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { createLogger } from 'winston';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { fileLogger, consoleLogger } from '@/utils/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XxstudyModule } from './modules/xxstudy/xxstudy.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    WinstonModule.forRoot({
      instance: createLogger({
        transports: [...fileLogger.transports, ...consoleLogger.transports],
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '10.0.0.2',
    //   port: 3306,
    //   username: 'nest',
    //   password: 'NPETJbkPfiwStze2',
    //   database: 'nest', //数据库名
    //   synchronize: true,
    //   // logging: true,
    //   retryDelay: 500,
    //   retryAttempts: 10,
    //   autoLoadEntities: true, // 自动加载实体
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${process.cwd()}/db/nest.db`, // SQLite 数据库文件名
      synchronize: true,
      // logging: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true, // 自动加载实体
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/client`,
    }),
    BookModule,
    UserModule,
    LylModule,
    XxstudyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'FILE_LOGGER',
      useValue: fileLogger,
    },
    {
      provide: 'CONSOLE_LOGGER',
      useValue: consoleLogger,
    },
  ],
  exports: ['FILE_LOGGER', 'CONSOLE_LOGGER'],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
