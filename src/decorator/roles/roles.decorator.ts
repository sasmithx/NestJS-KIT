import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
}
export const ROLE_DEC_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_DEC_KEY, roles);
