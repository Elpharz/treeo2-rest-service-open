import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TModule } from './modules.model';

@Module({
  imports: [SequelizeModule.forFeature([TModule])],
  providers: [ModulesService],
  controllers: [ModulesController],
  exports: [ModulesService, SequelizeModule],
})
export class ModulesModule {}
