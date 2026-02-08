import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ description: 'Film title', example: 'The Shawshank Redemption' })
  title: string;

  @ApiProperty({ description: 'Film description', example: 'A story of hope and friendship' })
  description: string;

  @ApiProperty({ description: 'Film director', example: 'Frank Darabont' })
  director: string;

  @ApiProperty({ description: 'Film genre', example: 'Drama' })
  genre: string;

  @ApiProperty({ description: 'Film duration in minutes', example: 142 })
  duration: number;

  @ApiProperty({ description: 'Film release date', example: '1994-10-14', type: 'string', format: 'date' })
  releaseDate: Date;

  @ApiProperty({ description: 'Film rating', example: 8.5, required: false })
  rating?: number;
}
