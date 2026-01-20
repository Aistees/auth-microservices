import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { 
  TokenServicePort, 
  TokenPayload, 
  AuthTokens, 
  ValidateTokens
} from '../../domain/ports/services/token.service.port';

@Injectable()
export class JwtTokenService implements TokenServicePort {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAuthTokens(payload: TokenPayload): Promise<AuthTokens> {

    const plainPayload = {
      sub: payload.sub,
      login: payload.login,
      roles: payload.roles,
      status: payload.status
    }

    const atSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const rtSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!atSecret || !rtSecret) {
      throw new Error('JWT Secrets are not defined in .env');
    }
    const [accessToken, refreshToken] = await Promise.all([
      
       this.jwtService.signAsync(plainPayload, {
        secret: atSecret,
        expiresIn: '1h',
      }),
      
      this.jwtService.signAsync(plainPayload, {
        secret: rtSecret,
        expiresIn: '2h',
      }),
    ]);

    const atPayload = await this.jwtService.decode(accessToken);
    const rtPayload = await this.jwtService.decode(refreshToken);

    return {
      accessToken: accessToken,
      expiresAccessToken: new Date(atPayload.exp * 1000),
      refreshToken,
      expiresRefreshToken: new Date(rtPayload.exp * 1000)
    };
  }

  async verifyAccessToken(token: string): Promise<ValidateTokens> {
    try {
      const result = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });

      const expirationSeconds = result.exp;
      const expirationDate = new Date(expirationSeconds * 1000);

      return {
        accessToken: result.sub,
        expiresAt: expirationDate
      }

    } catch (error) {
      throw new UnauthorizedException('Invalid Access Token');
    }
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}