import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { TokenServicePort,  } from '../../domain/ports/services/token.service.port'; 
import { RefreshAuthTokensDto } from '../dtos/refresh-auth-token.dto';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(incomingRefreshToken: string): Promise<RefreshAuthTokensDto> {
    try {
      const payload = await this.jwtService.verifyAsync(incomingRefreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      
      console.log(payload)

      const user = await this.userRepository.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      const result = await this.tokenService.generateAuthTokens(payload);
      return {
        accessToken: result.accessToken,
        expiresAccessToken: result.expiresAccessToken,
        refreshToken: result.refreshToken,
        expiresRefreshToken: result.expiresRefreshToken
      }

    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}