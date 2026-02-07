import { Booking } from '../../domain/entities/booking.entity';

export class UpdateBookingCommand {
  constructor(public readonly booking: Booking) {}
}
