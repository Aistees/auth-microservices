import { Injectable, Inject } from '@nestjs/common';
import { BookingRepositoryPort } from '../../domain/ports/booking.port';
import type { BookingRepositoryPortType } from '../../domain/ports/booking.port';

@Injectable()
export class CancelBookingUseCase {
  constructor(@Inject(BookingRepositoryPort) private readonly bookingRepo: BookingRepositoryPortType) {}

  async execute(id: string) {
    await this.bookingRepo.delete(id);
  }
}
