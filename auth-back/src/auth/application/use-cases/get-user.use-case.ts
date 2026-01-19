import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { GetUserQuery } from '../queries/get-user.query';
import { UserMapper } from 'src/auth/infrastructure/persistence/mappers/user.mapper';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(query: GetUserQuery): Promise<RegisterResponseDto> {
    const user = await this.userRepository.findById(query.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new RegisterResponseDto(
      user.id,
      user.login,
      user.roles,
      user.createdAt,
      user.updatedAt,
    );
  }
}