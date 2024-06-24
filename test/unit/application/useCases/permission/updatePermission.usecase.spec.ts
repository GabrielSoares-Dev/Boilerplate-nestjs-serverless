import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePermissionUseCase } from '@application/useCases/permission/update.usecase';
import {
  PERMISSION_REPOSITORY_TOKEN,
  PermissionRepositoryInterface,
} from '@application/repositories/permission.repository';
import { loggerMock } from '@test/helpers/mocks/logger.mock';

const input = {
  id: 1,
  name: 'test',
  description: 'test',
};
const createdAt = new Date();
const updatedAt = new Date();
const mockFindOutput = {
  id: 1,
  name: 'test',
  description: 'test',
  createdAt,
  updatedAt,
};

describe('UpdatePermissionUseCase', () => {
  let useCase: UpdatePermissionUseCase;
  let permissionRepository: PermissionRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePermissionUseCase,
        {
          provide: PERMISSION_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue(mockFindOutput),
            update: jest.fn(),
          },
        },
        { ...loggerMock },
      ],
    }).compile();

    useCase = module.get<UpdatePermissionUseCase>(UpdatePermissionUseCase);
    permissionRepository = module.get<PermissionRepositoryInterface>(
      PERMISSION_REPOSITORY_TOKEN,
    );
  });

  it('Should be update permission', async () => {
    const updateSpyOn = jest.spyOn(permissionRepository, 'update');
    await useCase.run(input);

    const expectedInputUpdate = {
      id: 1,
      name: 'test',
      description: 'test',
    };

    expect(updateSpyOn).toHaveBeenCalledWith(expectedInputUpdate);
  });

  it('Should be is invalid id', async () => {
    const updateSpyOn = jest.spyOn(permissionRepository, 'update');
    jest.spyOn(permissionRepository, 'find').mockResolvedValue(null);

    await expect(useCase.run(input)).rejects.toThrow('Invalid id');

    expect(updateSpyOn).not.toHaveBeenCalled();
  });
});
