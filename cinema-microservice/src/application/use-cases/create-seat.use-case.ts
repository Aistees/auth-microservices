import { Injectable } from '@nestjs/common';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';
import { CreateSeatCommand } from 'src/application/commands/create-seat.command';
import { Seat } from 'src/domain/entities/seat.entity';

@Injectable()
export class CreateSeatUseCase {
  constructor(private readonly seatRepositoryPort: SeatRepositoryPort) {}

  async execute(command: CreateSeatCommand): Promise<Seat> {
    const newSeat = new Seat(
      crypto.randomUUID(),
      command.row,
      command.number,
      command.roomId,
      new Date(),
      new Date(),
    );

    return this.seatRepositoryPort.save(newSeat);
  }
}
