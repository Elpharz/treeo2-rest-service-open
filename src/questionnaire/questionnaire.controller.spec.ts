import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireModule } from './questionnaire.module';

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        QuestionnaireModule,
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_TEST,
          synchronize: false,
        }),
      ],
      controllers: [QuestionnaireController],
    }).compile();

    controller = module.get<QuestionnaireController>(QuestionnaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
