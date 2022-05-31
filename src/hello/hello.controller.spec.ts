import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { HelloModule } from './hello.modules';

describe('HelloController', () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HelloModule],
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    helloController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const res = helloController.getHello();
      expect(res.message).toBe('Hello Earth, this is Treeo!');
    });
  });
});
