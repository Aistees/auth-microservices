import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID, IsDateString } from 'class-validator';

export class UpdateScreeningDto {
  @ApiProperty({ example: 'uuid-screening-id', description: 'Screening ID' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'uuid-room-id', description: 'Room ID' })
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ example: 'uuid-film-id', description: 'External Film ID' })
  @IsString()
  @IsNotEmpty()
  externalFilmId: string;

  @ApiProperty({ example: '2025-12-20T10:00:00Z', description: 'Start time' })
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ example: '2025-12-20T12:00:00Z', description: 'End time' })
  @IsDateString()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({ example: 12.5, description: 'Ticket price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
