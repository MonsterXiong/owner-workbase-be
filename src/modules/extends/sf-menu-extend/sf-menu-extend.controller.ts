import { Controller } from '@nestjs/common';
import { SfMenuExtendService } from './sf-menu-extend.service';

@Controller('sfMenuExtend')
export class SfMenuExtendController {
  constructor(private readonly sfMenuExtendService: SfMenuExtendService) {}
}
