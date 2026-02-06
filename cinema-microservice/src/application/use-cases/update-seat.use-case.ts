import { Injectable } from '@nestjs/common';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';
import { UpdateSeatCommand } from 'src/application/commands/update-seat.command';
import { Seat } from 'src/domain/entities/seat.entity';

@Injectable()
export class UpdateSeatUseCase {
  constructor(private readonly seatRepositoryPort: SeatRepositoryPort) {}

  async execute(command: UpdateSeatCommand): Promise<Seat> {
    const seat = new Seat(
      command.id,
      command.row,
      command.number,
      command.roomId,
      command.createdAt,
      new Date(),
    );

    return this.seatRepositoryPort.update(seat);
  }
}
