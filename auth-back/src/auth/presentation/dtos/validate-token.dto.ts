import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({ 
    description: 'The JWT access token to verify',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}