export default class BaseEntity {
  createAt?: Date

  createUser?: string;

  updateAt?: Date

  updateUser?: string

  deleteAt?: Date | null

  deleteUser?: string | null
}
