import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if (process.env.NODE_ENV == 'local') {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }

      if (method !== 'GET' && method !== 'OPTIONS') {
        this.logger.verbose(`${method} ${originalUrl} ${statusCode}`);
        this.logger.verbose(request.body);
        this.logger.verbose(request.headers);
      }
    });

    next();
  }
}
