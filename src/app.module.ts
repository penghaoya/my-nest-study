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
    BookModule,
    UserModule,
    LylModule,
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
