import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({ 
    description: 'The JWT access token to verify',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}