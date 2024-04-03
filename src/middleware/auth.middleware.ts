// auth.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly whitelist = ['/ip', '/public'];
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl } = req;

    if (this.isWhitelisted(originalUrl)) {
      return next();
    }
    const token = req.headers.authorization;
    // 假设你有一个 AuthenticationService 来处理登录逻辑
    // const authService = new AuthenticationService();
    if (!token) {
      throw new UnauthorizedException('无效的token');
    }

    // const user = authService.validateToken(token); // 假设这个方法验证并返回用户信息

    // if (!user) {
    //   // 如果 token 不合法，返回 401 Unauthorized 错误
    //   throw new UnauthorizedException('Invalid token');
    // }

    // 如果你想在控制器中访问用户信息，你可以将其存储在请求对象中
    // req['user'] = user;
    req['token'] = token;

    next();
  }
  private isWhitelisted(url: string): boolean {
    return this.whitelist.some((path) => url.startsWith(path));
  }
}
