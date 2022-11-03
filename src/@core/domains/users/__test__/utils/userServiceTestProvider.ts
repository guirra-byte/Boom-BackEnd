import { Provider } from "@nestjs/common";

const mock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const userServiceTestProvider : Provider[] =[
    {
      provide: 'UsersRepository',
      useValue: mock,
  }]

  export const providerAndMockRepository = {
    provider:userServiceTestProvider,
    mockRepository:mock
  }