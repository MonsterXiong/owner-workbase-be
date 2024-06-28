import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import chalk from 'chalk';
@Catch()
// 接口异常拦截器
export class HttpFaild implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    // const status = exception.getStatus();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(chalk.red('报错了~~~Error:'),chalk.bgRed.bold(exception.message));

    // response.status(status).json({
    response.status(status).json({
      success: false,
      time: new Date(),
      msg: exception.message,
      status,
      path: request.url,
    });
  }
}
