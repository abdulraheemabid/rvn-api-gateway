import { Test, TestingModule } from '@nestjs/testing';
import { MsFormController } from './ms-form.controller';

describe('MsFormController', () => {
  let controller: MsFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsFormController],
    }).compile();

    controller = module.get<MsFormController>(MsFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
