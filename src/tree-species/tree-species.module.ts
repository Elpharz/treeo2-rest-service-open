import { Module } from '@nestjs/common';
import { TreeSpeciesService } from './tree-species.service';
import { TreeSpeciesController } from './tree-species.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TreeSpecies } from './tree-species.model';

@Module({
  imports: [SequelizeModule.forFeature([TreeSpecies])],
  controllers: [TreeSpeciesController],
  providers: [TreeSpeciesService],
  exports: [TreeSpeciesService, SequelizeModule],
})
export class TreeSpeciesModule {}
