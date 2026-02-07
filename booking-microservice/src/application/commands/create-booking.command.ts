import { Booking } from '../../domain/entities/booking.entity';

export class CreateBookingCommand {
  constructor(public readonly booking: Booking) {}
}
