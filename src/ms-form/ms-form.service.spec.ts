import { Test, TestingModule } from '@nestjs/testing';
import { MsFormService } from './ms-form.service';

describe('MsFormService', () => {
  let service: MsFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsFormService],
    }).compile();

    service = module.get<MsFormService>(MsFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
