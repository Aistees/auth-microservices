import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';
import { UpdateRoomCommand } from 'src/application/commands/update-room.command';
import { Room } from 'src/domain/entities/room.entity';

@Injectable()
export class UpdateRoomUseCase {
  constructor(private readonly roomRepositoryPort: RoomRepositoryPort) {}

  async execute(command: UpdateRoomCommand): Promise<Room> {
    const room = new Room(
      command.id,
      command.name,
      command.capacity,
      command.cinemaId,
      command.createdAt,
      new Date(),
    );

    return this.roomRepositoryPort.update(room);
  }
}
