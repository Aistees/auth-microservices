import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'string', description: 'New username' })
  @IsString()
  @IsOptional()
  login?: string;

  @ApiPropertyOptional({ example: "string", description: "The user password" })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: ['string'], description: 'List of roles' })
  @IsArray()
  @IsOptional()
  roles?: string[];

  @ApiPropertyOptional({ example: "string", description: 'Account status' })
  @IsString()
  @IsOptional()
  status?: string;
}