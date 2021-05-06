import { Test, TestingModule } from '@nestjs/testing';
import { AccountTypeController } from '../accountType.controller';
import { AccountTypeService } from '../../service/accountType.service';

describe('AccountTypeController', () => {
  let controller: AccountTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTypeController],
      providers: [AccountTypeService],
    }).compile();

    controller = module.get<AccountTypeController>(AccountTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
