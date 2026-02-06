import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RoomRepositoryPort } from 'src/domain/ports/room.port';
import { Room } from 'src/domain/entities/room.entity';
import { RoomMapper } from '../mappers/room.mapper';

@Injectable()
export class PrismaRoomRepository implements RoomRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(room: Room): Promise<Room> {
    const data = RoomMapper.toPersistence(room);
    const saved = await this.prisma.rooms.create({
      data,
    });
    return RoomMapper.toDomain(saved);
  }

  async findAll(): Promise<Room[]> {
    const rooms = await this.prisma.rooms.findMany();
    return rooms.map(RoomMapper.toDomain);
  }

  async findById(id: string): Promise<Room | null> {
    const found = await this.prisma.rooms.findUnique({ where: { id } });
    return found ? RoomMapper.toDomain(found) : null;
  }

  async findByCinemaId(cinemaId: string): Promise<Room[]> {
    const rooms = await this.prisma.rooms.findMany({
      where: { cinemaId },
    });
    return rooms.map(RoomMapper.toDomain);
  }

  async update(room: Room): Promise<Room> {
    const data = RoomMapper.toPersistence(room);
    const updated = await this.prisma.rooms.update({
      where: { id: room.id },
      data,
    });
    return RoomMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.rooms.delete({ where: { id } });
  }
}
