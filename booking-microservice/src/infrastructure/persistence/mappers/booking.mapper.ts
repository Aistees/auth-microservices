import { Booking } from '../../../domain/entities/booking.entity';

export class BookingMapper {
  static toPersistence(b: Booking) {
    return {
      id: b.id,
      screeningId: b.screeningId,
      seatId: b.seatId,
      userId: b.userId,
      status: b.status,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };
  }

  static toDomain(p: any): Booking {
    return new Booking(p.id, p.screeningId, p.seatId, p.userId, p.status, p.createdAt, p.updatedAt);
  }
}
