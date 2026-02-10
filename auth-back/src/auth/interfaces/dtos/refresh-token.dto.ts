import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'The Refresh Token issued during login' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}