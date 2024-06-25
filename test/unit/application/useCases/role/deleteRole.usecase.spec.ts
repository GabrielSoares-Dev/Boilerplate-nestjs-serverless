import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRoleUseCase } from '@application/useCases/role/delete.usecase';
import {
  ROLE_REPOSITORY_TOKEN,
  RoleRepositoryInterface,
} from '@application/repositories/role.repository';
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

describe('DeleteRoleUseCase', () => {
  let useCase: DeleteRoleUseCase;
  let roleRepository: RoleRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRoleUseCase,
        {
          provide: ROLE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue(mockFindOutput),
            delete: jest.fn(),
          },
        },
        { ...loggerMock },
      ],
    }).compile();

    useCase = module.get<DeleteRoleUseCase>(DeleteRoleUseCase);
    roleRepository = module.get<RoleRepositoryInterface>(ROLE_REPOSITORY_TOKEN);
  });

  it('Should be delete role', async () => {
    const deleteSpyOn = jest.spyOn(roleRepository, 'delete');
    await useCase.run(input);

    const expectedInputDelete = 1;

    expect(deleteSpyOn).toHaveBeenCalledWith(expectedInputDelete);
  });

  it('Should be is invalid id', async () => {
    const deleteSpyOn = jest.spyOn(roleRepository, 'delete');
    jest.spyOn(roleRepository, 'find').mockResolvedValue(null);

    await expect(useCase.run(input)).rejects.toThrow('Invalid id');

    expect(deleteSpyOn).not.toHaveBeenCalled();
  });
});
