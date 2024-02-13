export default class SaveUserDto {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {}
}
