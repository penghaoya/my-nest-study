import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('FILE_LOGGER') private readonly fileLogger: Logger,
    @Inject('CONSOLE_LOGGER') private readonly consoleLogger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 如果是根路径，直接调用 next() 并返回
    if (req.originalUrl === '/') {
      return next();
    }

    const { method, originalUrl: url, ip } = req;

    const logInfo: any = {
      req: {
        method,
        url,
        ip,
      },
    };

    // 只添加非空的参数
    if (Object.keys(req.body).length > 0) {
      logInfo.req.body = req.body;
    }

    if (Object.keys(req.query).length > 0) {
      logInfo.req.query = req.query;
    }

    if (Object.keys(req.params).length > 0) {
      logInfo.req.params = req.params;
    }

    // 使用控制台日志记录器
    this.consoleLogger.info('路由请求', logInfo);

    // 捕获响应结束事件，记录响应状态码
    res.on('finish', () => {
      logInfo.res = {
        statusCode: res.statusCode,
      };

      // 如果状态码大于等于400，记录为错误
      if (res.statusCode >= 400) {
        this.fileLogger.error('路由错误', logInfo);
      }
    });
    next();
  }
}
