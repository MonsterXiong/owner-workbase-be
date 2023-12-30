import { Controller, Get } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}
  @Get()
  async get() {
    return this.peopleService.test();
  }
}
