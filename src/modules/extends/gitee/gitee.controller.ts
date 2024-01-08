import { Controller } from '@nestjs/common';
import { GiteeService } from './gitee.service';

@Controller('gitee')
export class GiteeController {
  constructor(private readonly giteeService: GiteeService) {}
}
