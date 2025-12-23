import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { HashingServicePort } from '../../domain/ports/services/hashing.service.port';
import { TokenServicePort } from '../../domain/ports/services/token.service.port';
import { LoginCommand } from '../commands/login.command';
import { AuthTokensDto } from '../dtos/auth-token.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly hashingService: HashingServicePort,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(command: LoginCommand): Promise<AuthTokensDto> {
    const user = await this.userRepo.findByLogin(command.login);
    if(!user) {
        new UnauthorizedException("Your username or password is incorrect");
    };

    const isValidPassword = await this.hashingService.compare(
        command.password,
        user.passwordHash,
    )

    if(!isValidPassword) {
        new UnauthorizedException("Your username or password is incorrect")
    }
    
    const tokens = await this.tokenService.generateAuthTokens({
        sub: user.id,
        login:user.login,
        roles:user.roles,
        status: user.status,
    })

    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }
  }
}