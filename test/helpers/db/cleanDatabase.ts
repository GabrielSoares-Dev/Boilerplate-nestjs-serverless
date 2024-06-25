import { deleteUsers } from './factory/user.factory';
import { deletePermissions } from './factory/permission.factory';

export const cleanDatabase = async () => {
  await deleteUsers();
  await deletePermissions();
};
