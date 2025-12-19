export class User {
  constructor(
    private readonly _id: string,
    private _login: string,
    private _password: string,
    private _roles: string[],
    private _status: string,
  ) { }

  get id(): string {
    return this._id;
  }

  get login(): string {
    return this._login;
  }

  get passwordHash(): string {
    return this._password;
  }

  get roles(): string[] {
    return this._roles;
  }

  get status(): string {
    return this._status;
  }

  changePassword(newHash: string) {
    this._password = newHash;
  }
}
