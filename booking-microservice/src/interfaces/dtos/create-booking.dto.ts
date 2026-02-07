import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'Screening id' })
  @IsString()
  screeningId: string;

  @ApiProperty({ description: 'Seat id' })
  @IsString()
  seatId: string;

  @ApiProperty({ description: 'User id' })
  @IsString()
  userId: string;
}
