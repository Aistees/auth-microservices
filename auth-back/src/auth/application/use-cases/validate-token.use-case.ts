import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenServicePort } from '../../domain/ports/services/token.service.port';
import { ValidateTokenQuery } from '../queries/validate-token.query';
import {  ValidateTokens } from '../../domain/ports/services/token.service.port';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly tokenService: TokenServicePort) {}

  async execute(query: ValidateTokenQuery): Promise<ValidateTokens> {
    try {
      const result = await this.tokenService.verifyAccessToken(query.accessToken);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}