export class RefreshAuthTokensDto {
    accessToken: string;
    expiresAccessToken: Date;
    refreshToken: string;
    expiresRefreshToken: Date;
  }