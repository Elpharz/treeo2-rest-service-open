import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Questionnaire } from './questionnaire.model';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire) private questionModel: typeof Questionnaire,
  ) {}

  async findOne(id: number): Promise<Questionnaire> {
    const questionnaire = await this.questionModel.findOne({
      where: { id },
      include: [],
    });
    if (!questionnaire) {
      throw new NotFoundException('Questionnaire not found');
    }
    return questionnaire;
  }
}
