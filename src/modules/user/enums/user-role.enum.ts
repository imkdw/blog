export const UserRoles = {
  NORMAL: 'normal',
  ADMIN: 'admin',
} as const;
export type IUserRoles = (typeof UserRoles)[keyof typeof UserRoles];
