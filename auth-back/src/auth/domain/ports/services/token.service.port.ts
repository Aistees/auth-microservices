export interface TokenPayload {
  sub: string;
  login: string;
  roles: string[];
  status: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export abstract class TokenServicePort {
  abstract generateAuthTokens(payload: TokenPayload): Promise<AuthTokens>;

  abstract verifyAccessToken(token: string): Promise<TokenPayload>;

  abstract verifyRefreshToken(token: string): Promise<TokenPayload>;
}

