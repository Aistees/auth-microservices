import { Seat } from 'src/domain/entities/seat.entity';

type PrismaSeat = any;

export class SeatMapper {
  static toDomain(raw: PrismaSeat): Seat {
    return new Seat(
      raw.id,
      raw.row,
      raw.number,
      raw.roomId,
      new Date(),
      new Date(),
    );
  }

  static toPersistence(domain: Seat) {
    return {
      id: domain.id,
      row: domain.row,
      number: domain.number,
      roomId: domain.roomId,
    };
  }
}
