import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  roles: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<RegisterResponseDto>) {
    Object.assign(this, partial);
  }
}
