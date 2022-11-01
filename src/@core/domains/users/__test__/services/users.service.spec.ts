import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { UsersService } from '../../users.service';
import { TestUtil } from '../utils/test.util';
import { providerAndMockRepository } from '../utils/userServiceTestProvider';

describe('UsersService', () => {
  let service: UsersService;

  const mock = providerAndMockRepository.mockRepository;
  beforeEach(async () => {
    const provider : Provider[] = providerAndMockRepository.provider;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ...provider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Test find all users", ()=>{
    it("should return all users", async ()=>{
      const user = TestUtil.giveMeAValidUser();
      mock.findAll.mockReturnValue([user,user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
    })
  })
});
