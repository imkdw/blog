export default class SignUpDto {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly nickname: string,
  ) {}
}
