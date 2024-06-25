export interface CreateUserRepositoryInputDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface CreateUserRepositoryOutputDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
