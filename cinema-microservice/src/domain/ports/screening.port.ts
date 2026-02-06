import { Screening } from '../entities/screening.entity';

export abstract class ScreeningRepositoryPort {
  abstract save(screening: Screening): Promise<Screening>;
  abstract findAll(): Promise<Screening[]>;
  abstract findById(id: string): Promise<Screening | null>;
  abstract findByRoomId(roomId: string): Promise<Screening[]>;
  abstract update(screening: Screening): Promise<Screening>;
  abstract delete(id: string): Promise<void>;
}
