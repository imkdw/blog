export default abstract class BaseEntity {
  createAt: Date;

  createUser: string = null;

  updateAt: Date;

  updateUser: string = null;

  deleteAt: Date | null;

  deleteUser: string | null;
}
