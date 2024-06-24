export interface FindPermissionUseCaseInputDto {
  id: number;
}

export interface FindPermissionUseCaseOutputDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
