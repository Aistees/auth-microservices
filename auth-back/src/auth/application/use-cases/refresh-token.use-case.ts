import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenServicePort } from '../../domain/ports/services/token.service.port';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { RefreshTokenCommand } from '../commands/refresh-token.command';
import { AuthTokensDto } from '../dtos/auth-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly tokenService: TokenServicePort,
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<AuthTokensDto> {
    try {
      const payload = await this.tokenService.verifyRefreshToken(command.refreshToken);

      const user = await this.userRepo.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.tokenService.generateAuthTokens({
        sub: user.id,
        login: user.login,
        roles: user.roles,
        status: user.status
      });

    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}