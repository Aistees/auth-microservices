import { Injectable } from '@nestjs/common';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';
import { Seat } from 'src/domain/entities/seat.entity';

@Injectable()
export class ListSeatsUseCase {
  constructor(private readonly seatRepositoryPort: SeatRepositoryPort) {}

  async execute(): Promise<Seat[]> {
    return this.seatRepositoryPort.findAll();
  }
}
