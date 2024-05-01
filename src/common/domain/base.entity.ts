export default class BaseEntity {
  createAt?: Date = new Date();

  createUser?: string = null;

  updateAt?: Date = new Date();

  updateUser?: string = null;

  deleteAt?: Date | null = null;

  deleteUser?: string | null = null;
}
