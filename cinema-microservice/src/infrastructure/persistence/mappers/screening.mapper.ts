import { Screening } from 'src/domain/entities/screening.entity';

type PrismaScreening = any;

export class ScreeningMapper {
  static toDomain(raw: PrismaScreening): Screening {
    return new Screening(
      raw.id,
      raw.roomId,
      raw.externalFilmId,
      raw.startTime,
      raw.endTime,
      raw.price.toNumber && raw.price.toNumber() || raw.price,
      new Date(),
      new Date(),
    );
  }

  static toPersistence(domain: Screening) {
    return {
      id: domain.id,
      roomId: domain.roomId,
      externalFilmId: domain.externalFilmId,
      startTime: domain.startTime,
      endTime: domain.endTime,
      price: domain.price,
    };
  }
}
