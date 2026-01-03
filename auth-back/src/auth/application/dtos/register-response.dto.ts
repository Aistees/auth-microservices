export class RegisterResponseDto {
  constructor(id: string, login: string, roles: string[], createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.login = login;
    this.roles = roles;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  id: string;
  login: string;
  roles: string[];
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
