import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';

@Injectable()
export class DeleteRoomUseCase {
  constructor(private readonly roomRepositoryPort: RoomRepositoryPort) {}

  async execute(id: string): Promise<void> {
    return this.roomRepositoryPort.delete(id);
  }
}
