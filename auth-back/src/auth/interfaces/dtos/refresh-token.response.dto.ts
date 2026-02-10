import { ApiProperty } from '@nestjs/swagger';


export class RefreshtokenResponseDto {
  @ApiProperty({ description: 'JWT Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Access token expiring time'})
  expiresAccessToken: Date;

  @ApiProperty({ description: 'JWT Refresh Token' })
  refreshToken: string;

  @ApiProperty({ description: 'Access token expiring time'})
  expiresRefreshToken: Date;
}
