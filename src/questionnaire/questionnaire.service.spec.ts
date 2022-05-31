import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireModule } from './questionnaire.module';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;

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
      providers: [QuestionnaireService],
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
