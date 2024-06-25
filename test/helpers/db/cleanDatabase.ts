import { deleteUsers } from './factory/user.factory';
import { deletePermissions } from './factory/permission.factory';
import { deleteRoles } from './factory/role.factory';

export const cleanDatabase = async () => {
  await deleteUsers();
  await deleteRoles();
  await deletePermissions();
};
