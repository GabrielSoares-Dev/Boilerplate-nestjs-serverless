export interface CreateRepositoryInputDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface CreateRepositoryOutputDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
