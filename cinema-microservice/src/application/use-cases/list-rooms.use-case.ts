import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';
import { Room } from 'src/domain/entities/room.entity';

@Injectable()
export class ListRoomsUseCase {
  constructor(private readonly roomRepositoryPort: RoomRepositoryPort) {}

  async execute(): Promise<Room[]> {
    return this.roomRepositoryPort.findAll();
  }
}
