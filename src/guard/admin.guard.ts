// admin.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as Ip from 'ip'
import { CustomException } from '../exception/custom.exception';
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIp = request['userIp']; // 假设请求对象中包含用户信息
    const isAdmin = userIp == 'localhost' || Ip.address()
    if (!isAdmin) {
        throw new CustomException('非管理员无权限操作', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return true
  }
}
