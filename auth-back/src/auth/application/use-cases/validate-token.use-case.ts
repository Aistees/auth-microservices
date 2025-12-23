import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenServicePort } from '../../domain/ports/services/token.service.port';
import { ValidateTokenQuery } from '../queries/validate-token.query';
import { TokenPayload } from '../../domain/ports/services/token.service.port';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly tokenService: TokenServicePort) {}

  async execute(query: ValidateTokenQuery): Promise<TokenPayload> {
    try {
      const result = await this.tokenService.verifyAccessToken(query.accessToken);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}