import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SeatRepositoryPort } from 'src/domain/ports/seat.port';
import { Seat } from 'src/domain/entities/seat.entity';
import { SeatMapper } from '../mappers/seat.mapper';

@Injectable()
export class PrismaSeatRepository implements SeatRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(seat: Seat): Promise<Seat> {
    const data = SeatMapper.toPersistence(seat);
    const saved = await this.prisma.seats.create({
      data,
    });
    return SeatMapper.toDomain(saved);
  }

  async findAll(): Promise<Seat[]> {
    const seats = await this.prisma.seats.findMany();
    return seats.map(SeatMapper.toDomain);
  }

  async findById(id: string): Promise<Seat | null> {
    const found = await this.prisma.seats.findUnique({ where: { id } });
    return found ? SeatMapper.toDomain(found) : null;
  }

  async findByRoomId(roomId: string): Promise<Seat[]> {
    const seats = await this.prisma.seats.findMany({
      where: { roomId },
    });
    return seats.map(SeatMapper.toDomain);
  }

  async update(seat: Seat): Promise<Seat> {
    const data = SeatMapper.toPersistence(seat);
    const updated = await this.prisma.seats.update({
      where: { id: seat.id },
      data,
    });
    return SeatMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.seats.delete({ where: { id } });
  }
}
