import { Room } from 'src/domain/entities/room.entity';

type PrismaRoom = any;

export class RoomMapper {
  static toDomain(raw: PrismaRoom): Room {
    return new Room(
      raw.id,
      raw.name,
      raw.capacity,
      raw.cinemaId,
      new Date(),
      new Date(),
    );
  }

  static toPersistence(domain: Room) {
    return {
      id: domain.id,
      name: domain.name,
      capacity: domain.capacity,
      cinemaId: domain.cinemaId,
    };
  }
}
