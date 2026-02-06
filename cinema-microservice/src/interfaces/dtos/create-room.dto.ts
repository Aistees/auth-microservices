import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'Room A', description: 'Name of the room' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100, description: 'Capacity of the room' })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ example: 'uuid-cinema-id', description: 'Cinema ID' })
  @IsUUID()
  @IsNotEmpty()
  cinemaId: string;
}
