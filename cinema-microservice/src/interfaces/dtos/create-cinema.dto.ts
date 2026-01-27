import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCinemaDto {
  @ApiProperty({ example: 'Grand Rex', description: 'Name of the cinema' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Paris', description: 'City location' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '1 Blvd Poissonnière', description: 'Full address' })
  @IsString()
  @IsNotEmpty()
  address: string;
}