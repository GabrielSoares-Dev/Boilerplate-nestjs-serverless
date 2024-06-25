export interface CreateRepositoryInputDto {
  name: string;
  description?: string;
}

export interface CreateRepositoryOutputDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
