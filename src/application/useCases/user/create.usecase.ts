import { Injectable, Inject } from '@nestjs/common';
import {
  LoggerServiceInterface,
  LOGGER_SERVICE_TOKEN,
} from '@application/services';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
  ) {}

  async run() {}
}

// class CreateUserUseCase
// {
//     protected LoggerServiceInterface $loggerService;

//     protected UserRepositoryInterface $repository;

//     public function __construct(
//         LoggerServiceInterface $loggerService,
//         UserRepositoryInterface $repository
//     ) {
//         $this->loggerService = $loggerService;
//         $this->repository = $repository;
//     }

//     protected function valid(CreateUserUseCaseInputDto $input): void
//     {
//         $entity = new User(...(array) $input);

//         $entity->create();
//     }

//     protected function foundUserBySameEmail(string $email): bool
//     {
//         return (bool) $this->repository->findByEmail($email);
//     }

//     protected function assignRole(string $email): void
//     {
//         $input = new AssignRoleRepositoryInputDto(Role::ADMIN, $email);

//         $this->repository->assignRole($input);
//     }

//     public function run(CreateUserUseCaseInputDto $input): void
//     {
//         $this->loggerService->info('START CreateUserUseCase');

//         $this->loggerService->debug('Input CreateUserUseCase', $input);

//         $this->valid($input);

//         $email = $input->email;

//         if ($this->foundUserBySameEmail($email)) throw new BusinessException('User already exists');

//         $data = new CreateUserRepositoryInputDto(...(array) $input);

//         $this->repository->create($data);

//         $this->assignRole($email);

//         $this->loggerService->info('FINISH CreateUserUseCase');

//     }
// }
