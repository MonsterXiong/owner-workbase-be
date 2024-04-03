// ip.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let result = null
    if(Array.isArray(ip)){
        result = ip[0].split(':').pop()
    }else{
        result = ip.split(':').pop()
    }
    if(result == '1' || result == '127.0.0.1'){
        result = 'localhost'
    }
    req['userIp'] = result;
    next();
  }
}
