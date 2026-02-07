import { Injectable, Inject } from '@nestjs/common';
import { BookingRepositoryPort } from '../../domain/ports/booking.port';
import type { BookingRepositoryPortType } from '../../domain/ports/booking.port';

@Injectable()
export class GetBookingUseCase {
  constructor(@Inject(BookingRepositoryPort) private readonly bookingRepo: BookingRepositoryPortType) {}

  async execute(id: string) {
    return this.bookingRepo.findById(id);
  }
}
