import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionService: QuestionnaireService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Get a single questionnaire' })
  getSingleQuestionnaire(@Param('id') questionnaireID: string) {
    return this.questionService.findOne(parseInt(questionnaireID));
  }
}
