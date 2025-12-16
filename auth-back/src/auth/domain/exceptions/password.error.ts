export class PasswordError extends Error {
  constructor(password: string) {
    super(`The password ${password} is invalid`);
    this.name = 'InvalidPasswordError';
  }
}
