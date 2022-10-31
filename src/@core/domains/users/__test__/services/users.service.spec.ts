import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mock = {
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UsersRepository',
          useValue: mock,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
