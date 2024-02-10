export class SignUpCommand {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string,
  ) {}
}
