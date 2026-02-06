import { Injectable } from '@nestjs/common';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';
import { CreateRoomCommand } from 'src/application/commands/create-room.command';
import { Room } from 'src/domain/entities/room.entity';

@Injectable()
export class CreateRoomUseCase {
  constructor(private readonly roomRepositoryPort: RoomRepositoryPort) {}

  async execute(command: CreateRoomCommand): Promise<Room> {
    const newRoom = new Room(
      crypto.randomUUID(),
      command.name,
      command.capacity,
      command.cinemaId,
      new Date(),
      new Date(),
    );

    return this.roomRepositoryPort.save(newRoom);
  }
}
