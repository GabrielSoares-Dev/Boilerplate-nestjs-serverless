import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUserUseCase,
  USER_REPOSITORY_TOKEN,
  UserRepositoryInterface,
} from '@application';
import { loggerMock } from '@test/helpers';

const input = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'Test@2312',
  phoneNumber: '11991742156',
};

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(null),
          },
        },
        { ...loggerMock },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepositoryInterface>(USER_REPOSITORY_TOKEN);
  });

  it('Should be create user', async () => {
    const createSpyOn = jest.spyOn(userRepository, 'create');

    await useCase.run(input);

    const expectedInputCreate = {
      email: 'test@gmail.com',
      name: 'test',
      password: 'Test@2312',
      phoneNumber: '11991742156',
    };

    expect(createSpyOn).toHaveBeenCalledWith(expectedInputCreate);
  });

  it('Should be failure when user already exists', async () => {
    const createSpyOn = jest.spyOn(userRepository, 'create');
    const mockFindByEmailOutput = {
      id: 17,
      name: 'test',
      email: 'test@gmail.com',
      phoneNumber: '11991742156',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(userRepository, 'findByEmail')
      .mockResolvedValue(mockFindByEmailOutput);

    await expect(useCase.run(input)).rejects.toThrow('User already exists');

    expect(createSpyOn).not.toHaveBeenCalled();
  });
});
