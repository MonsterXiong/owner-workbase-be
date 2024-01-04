import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateService } from './generate.service';
import {exec} from './index'
import { ApiTags } from '@nestjs/swagger';
import { ParamsDto } from './dto/param.dto';

@ApiTags('gen')
@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}
  @Get()
  findAll() {
    // return this.generateService.findAll();
  }

// paramsDto
// code,basePath,
  @Post('genBeCode')
  async genBeCode(@Body() param:ParamsDto){
    return await exec(param)
  }

  @Post('genFeCode')
  async genFeCode(@Body() param:ParamsDto){
    return await exec(param)
  }
}
