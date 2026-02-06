import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateSeatDto {
  @ApiProperty({ example: 'uuid-seat-id', description: 'Seat ID' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'A', description: 'Row identifier' })
  @IsString()
  @IsNotEmpty()
  row: string;

  @ApiProperty({ example: 1, description: 'Seat number' })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({ example: 'uuid-room-id', description: 'Room ID' })
  @IsUUID()
  @IsNotEmpty()
  roomId: string;
}
