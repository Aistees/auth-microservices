import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BookingRepositoryPort } from '../../domain/ports/booking.port';
import type { BookingRepositoryPortType } from '../../domain/ports/booking.port';
import { Booking } from '../../domain/entities/booking.entity';

@Injectable()
export class CreateBookingUseCase {
  constructor(@Inject(BookingRepositoryPort) private readonly bookingRepo: BookingRepositoryPortType) {}

  async execute(data: any) {
    const screening = data.screening;
    const bookedSeats = screening.bookings?.length || 0;
    const availableSeats = screening.room.capacity - bookedSeats;

    if (availableSeats < data.numberOfSeats) {
      throw new BadRequestException('Not enough seats available');
    }
    
    return this.bookingRepo.save(data);
  }
}
