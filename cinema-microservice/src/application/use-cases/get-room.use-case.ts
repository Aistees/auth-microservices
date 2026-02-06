import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';
import { Room } from 'src/domain/entities/room.entity';

@Injectable()
export class GetRoomUseCase {
  constructor(private readonly roomRepositoryPort: RoomRepositoryPort) {}

  async execute(id: string): Promise<Room | null> {
    return this.roomRepositoryPort.findById(id);
  }
}
