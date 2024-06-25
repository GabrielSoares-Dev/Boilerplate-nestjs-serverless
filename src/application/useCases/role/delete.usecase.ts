import { Injectable, Inject } from '@nestjs/common';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { FindRoleRepositoryOutputDto } from '@application/dtos/repositories/role/find.dto';
import { DeleteRoleUseCaseInputDto } from '@application/dtos/useCases/role/delete.dto';
import {
  ROLE_REPOSITORY_TOKEN,
  RoleRepositoryInterface,
} from '@application/repositories/role.repository';
import { BusinessException } from '@application/exceptions/business.exception';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,

    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  protected async foundRole(id: number): Promise<FindRoleRepositoryOutputDto> {
    return this.roleRepository.find(id);
  }

  async run(input: DeleteRoleUseCaseInputDto): Promise<void> {
    this.loggerService.info('START DeleteRoleUseCase');
    this.loggerService.debug('input', input);

    const foundRole = await this.foundRole(input.id);
    this.loggerService.debug('foundRole', foundRole);

    if (!foundRole) throw new BusinessException('Invalid id');

    const deleted = await this.roleRepository.delete(input.id);
    this.loggerService.debug('deleted', deleted);

    this.loggerService.info('FINISH DeleteRoleUseCase');
  }
}
