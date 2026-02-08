import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmDto {
  @ApiProperty({ description: 'Film title', example: 'The Shawshank Redemption', required: false })
  title?: string;

  @ApiProperty({ description: 'Film description', example: 'A story of hope and friendship', required: false })
  description?: string;

  @ApiProperty({ description: 'Film director', example: 'Frank Darabont', required: false })
  director?: string;

  @ApiProperty({ description: 'Film genre', example: 'Drama', required: false })
  genre?: string;

  @ApiProperty({ description: 'Film duration in minutes', example: 142, required: false })
  duration?: number;

  @ApiProperty({ description: 'Film release date', example: '1994-10-14', type: 'string', format: 'date', required: false })
  releaseDate?: Date;

  @ApiProperty({ description: 'Film rating', example: 8.5, required: false })
  rating?: number;
}
