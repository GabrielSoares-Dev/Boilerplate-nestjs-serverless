import { Test, TestingModule } from '@nestjs/testing';
import { CreatePermissionUseCase } from '@application/useCases/permission/create.usecase';
import {
  PERMISSION_REPOSITORY_TOKEN,
  PermissionRepositoryInterface,
} from '@application/repositories/permission.repository';
import { loggerMock } from '@test/helpers/mocks/logger.mock';

const input = {
  name: 'test',
  description: 'test',
};

describe('CreatePermissionUseCase', () => {
  let useCase: CreatePermissionUseCase;
  let permissionRepository: PermissionRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePermissionUseCase,
        {
          provide: PERMISSION_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            findByName: jest.fn().mockResolvedValue(null),
          },
        },
        { ...loggerMock },
      ],
    }).compile();

    useCase = module.get<CreatePermissionUseCase>(CreatePermissionUseCase);
    permissionRepository = module.get<PermissionRepositoryInterface>(
      PERMISSION_REPOSITORY_TOKEN,
    );
  });

  it('Should be create user', async () => {
    const createSpyOn = jest.spyOn(permissionRepository, 'create');

    await useCase.run(input);

    const expectedInputCreate = {
      name: 'test',
      description: 'test',
    };

    expect(createSpyOn).toHaveBeenCalledWith(expectedInputCreate);
  });

  it('Should be failure when permission already exists', async () => {
    const createSpyOn = jest.spyOn(permissionRepository, 'create');

    const mockFindByNameOutput = {
      id: 1,
      name: 'test',
      description: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(permissionRepository, 'findByName')
      .mockResolvedValue(mockFindByNameOutput);

    await expect(useCase.run(input)).rejects.toThrow(
      'Permission already exists',
    );

    expect(createSpyOn).not.toHaveBeenCalled();
  });
});
