import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { TestUtil } from '../utils/test.util';
import { providerAndMockRepository } from '../utils/userServiceTestProvider';

describe('UsersService', () => {
  let service: UsersService;

  const mock = providerAndMockRepository.mockRepository;
  beforeAll(async () => {
    const provider : Provider[] = providerAndMockRepository.provider;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ...provider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  beforeEach(()=>{
    mock.create.mockClear();
    mock.findAll.mockClear();
    mock.findOne.mockClear();
    mock.update.mockClear();
    mock.remove.mockClear();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAll method", ()=>{
    it("should return all users", async ()=>{
      const user = TestUtil.giveMeAValidUser();
      mock.findAll.mockReturnValue([user,user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(mock.findAll).toHaveBeenCalledTimes(1);
    })
  })
  describe('findOne method', ()=>{
    it('should find a existing user', async()=>{
      const user = TestUtil.giveMeAValidUser();
      mock.findOne.mockReturnValue(user);
      const userFound = await service.findOne("uuasdfasdf");

      expect(userFound).toBe(user);
      expect(userFound).toMatchObject({ name: user.name });
      expect(mock.findOne).toHaveBeenCalledTimes(1);
    })
  })
  describe("create method", ()=>{
    it("Should create new a user and return it", async()=>{
      const user = TestUtil.giveMeAValidUser();
      mock.create.mockReturnValue(user);
      const newUser = await service.create(user);

      expect(newUser).toMatchObject(user);
      expect(mock.create).toHaveBeenCalledTimes(1);
    })
  })
  describe('update method', ()=>{
    it('Should not throw an error', async()=>{
      const user = TestUtil.giveMeAValidUser();
      const updated = { ...user, email:'updated@gmail.com'};
      mock.remove.mockReturnValue(updated);
      const result = await service.update('asfdfadas', updated);
      expect(result).toBeUndefined();
      expect(mock.update).toHaveBeenCalledTimes(1);
    })
  })
  describe('remove method', ()=>{
    it('Should not throw an error', async()=>{
      const user = TestUtil.giveMeAValidUser();
      mock.remove.mockReturnValue(null);
      const result = await service.remove('asdfsad');

      expect(result).toBeUndefined();
      expect(mock.remove).toHaveBeenCalledTimes(1);
    })
  })
});
