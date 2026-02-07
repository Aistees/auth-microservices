import { Injectable, Inject } from '@nestjs/common';
import { BookingRepositoryPort } from '../../domain/ports/booking.port';
import type { BookingRepositoryPortType } from '../../domain/ports/booking.port';

@Injectable()
export class ListBookingsUseCase {
  constructor(@Inject(BookingRepositoryPort) private readonly bookingRepo: BookingRepositoryPortType) {}

  async execute(userId: string) {
    return this.bookingRepo.findByUser(userId);
  }
}
