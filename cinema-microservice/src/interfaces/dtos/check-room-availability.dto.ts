import { ApiProperty } from '@nestjs/swagger';

export class CheckRoomAvailabilityDto {
  @ApiProperty({
    description: 'Room ID to check availability',
    example: 'room-123',
  })
  roomId: string;

  @ApiProperty({
    description: 'Screening start time',
    example: '2026-02-20T14:00:00Z',
    type: 'string',
    format: 'date-time',
  })
  startTime: Date;

  @ApiProperty({
    description: 'Screening end time',
    example: '2026-02-20T16:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  endTime: Date;
}
