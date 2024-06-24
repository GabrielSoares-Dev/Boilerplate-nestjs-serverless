import { Test, TestingModule } from '@nestjs/testing';
import { FindPermissionsUseCase } from '@application/useCases/permission/find.usecase';
import {
  PERMISSION_REPOSITORY_TOKEN,
  PermissionRepositoryInterface,
} from '@application/repositories/permission.repository';
import { loggerMock } from '@test/helpers/mocks/logger.mock';

const input = {
  id: 1,
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

describe('FindPermissionsUseCase', () => {
  let useCase: FindPermissionsUseCase;
  let permissionRepository: PermissionRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPermissionsUseCase,
        {
          provide: PERMISSION_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue(mockFindOutput),
          },
        },
        { ...loggerMock },
      ],
    }).compile();

    useCase = module.get<FindPermissionsUseCase>(FindPermissionsUseCase);
    permissionRepository = module.get<PermissionRepositoryInterface>(
      PERMISSION_REPOSITORY_TOKEN,
    );
  });

  it('Should be find permission', async () => {
    const output = await useCase.run(input);

    const expectedOutput = {
      id: 1,
      name: 'test',
      description: 'test',
      createdAt,
      updatedAt,
    };

    expect(output).toEqual(expectedOutput);
  });

  it('Should be is invalid id', async () => {
    jest.spyOn(permissionRepository, 'find').mockResolvedValue(null);

    await expect(useCase.run(input)).rejects.toThrow('Invalid id');
  });
});
