import { Injectable } from '@nestjs/common';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';
import { Seat } from 'src/domain/entities/seat.entity';

@Injectable()
export class GetSeatUseCase {
  constructor(private readonly seatRepositoryPort: SeatRepositoryPort) {}

  async execute(id: string): Promise<Seat | null> {
    return this.seatRepositoryPort.findById(id);
  }
}
