import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService {
  test() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return 'hello';
  }
}
