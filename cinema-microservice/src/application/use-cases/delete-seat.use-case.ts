import { Injectable } from '@nestjs/common';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';

@Injectable()
export class DeleteSeatUseCase {
  constructor(private readonly seatRepositoryPort: SeatRepositoryPort) {}

  async execute(id: string): Promise<void> {
    return this.seatRepositoryPort.delete(id);
  }
}
