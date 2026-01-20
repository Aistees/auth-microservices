export interface TokenPayload {
  sub: string;
  login: string;
  roles: string[];
  status: string;
}

export interface AuthTokens {
  accessToken: string;
  expiresAccessToken: Date;
  refreshToken: string;
  expiresRefreshToken: Date;
}

export interface ValidateTokens {
  accessToken: string;
  expiresAt: Date;
}

export abstract class TokenServicePort {
  abstract generateAuthTokens(payload: TokenPayload): Promise<AuthTokens>;

  abstract verifyAccessToken(token: string): Promise<ValidateTokens>;

  abstract verifyRefreshToken(token: string): Promise<TokenPayload>;
}

