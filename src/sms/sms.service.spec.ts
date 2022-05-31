import { Test, TestingModule } from '@nestjs/testing';
import { OtpModule } from '../auth/otp/otp.module';
import { SmsService } from './sms.service';

describe('SmsService', () => {
  let service: SmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OtpModule],
      providers: [SmsService],
    }).compile();

    service = module.get<SmsService>(SmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
