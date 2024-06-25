import { Injectable, Inject } from '@nestjs/common';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';
import { FindRoleRepositoryOutputDto } from '@application/dtos/repositories/role/find.dto';
import { UpdateUseCaseInputDto } from '@application/dtos/useCases/role/update.dto';
import {
  ROLE_REPOSITORY_TOKEN,
  RoleRepositoryInterface,
} from '@application/repositories/role.repository';
import { BusinessException } from '@application/exceptions/business.exception';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,

    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  protected async foundRole(id: number): Promise<FindRoleRepositoryOutputDto> {
    return this.roleRepository.find(id);
  }

  async run(input: UpdateUseCaseInputDto): Promise<void> {
    this.loggerService.info('START UpdateRoleUseCase');
    this.loggerService.debug('input', input);

    const foundRole = await this.foundRole(input.id);
    this.loggerService.debug('foundRole', foundRole);

    if (!foundRole) throw new BusinessException('Invalid id');

    const updated = await this.roleRepository.update(input);
    this.loggerService.debug('updated', updated);

    this.loggerService.info('FINISH UpdateRoleUseCase');
  }
}
