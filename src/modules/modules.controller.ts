import { Controller, Get } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly moduleService: ModulesService) {}

  @Get()
  async getAllTreeoModules() {
    return this.moduleService.findAll();
  }
}
