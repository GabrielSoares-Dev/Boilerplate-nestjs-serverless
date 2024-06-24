export interface UpdateRepositoryInputDto {
  id: number;
  name?: string;
  description?: string;
}

export interface UpdateRepositoryOutputDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
