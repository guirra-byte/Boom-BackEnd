import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import { providerAndMockRepository } from '../utils/userServiceTestProvider';

describe('UsersController', () => {
  let controller: UsersController;
  const mock = providerAndMockRepository.mockRepository;
  
  beforeEach(async () => {
    const provider : Provider[] = providerAndMockRepository.provider;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ...provider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
   expect(controller).toBeDefined();
  });
});
