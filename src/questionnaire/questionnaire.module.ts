import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questionnaire } from './questionnaire.model';

@Module({
  imports: [SequelizeModule.forFeature([Questionnaire])],
  providers: [QuestionnaireService],
  controllers: [QuestionnaireController],
  exports: [QuestionnaireService, SequelizeModule],
})
export class QuestionnaireModule {}
