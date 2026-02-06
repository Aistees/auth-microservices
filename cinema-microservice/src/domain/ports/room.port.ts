import { Room } from '../entities/room.entity';

export abstract class RoomRepositoryPort {
  abstract save(room: Room): Promise<Room>;
  abstract findAll(): Promise<Room[]>;
  abstract findById(id: string): Promise<Room | null>;
  abstract findByCinemaId(cinemaId: string): Promise<Room[]>;
  abstract update(room: Room): Promise<Room>;
  abstract delete(id: string): Promise<void>;
}
