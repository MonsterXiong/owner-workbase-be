import { Controller, Get } from '@nestjs/common';
import { GenerateService } from './generate.service';

@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}
  @Get()
  findAll() {
    // return this.generateService.findAll();
  }
}
