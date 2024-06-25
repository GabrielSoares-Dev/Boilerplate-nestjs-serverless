export interface DeleteRepositoryOutputDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
