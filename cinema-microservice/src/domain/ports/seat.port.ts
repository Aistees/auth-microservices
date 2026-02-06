import { Seat } from '../entities/seat.entity';

export abstract class SeatRepositoryPort {
  abstract save(seat: Seat): Promise<Seat>;
  abstract findAll(): Promise<Seat[]>;
  abstract findById(id: string): Promise<Seat | null>;
  abstract findByRoomId(roomId: string): Promise<Seat[]>;
  abstract update(seat: Seat): Promise<Seat>;
  abstract delete(id: string): Promise<void>;
}
