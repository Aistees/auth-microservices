import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookingRepositoryPort } from '../../../domain/ports/booking.port';
import type { BookingRepositoryPortType } from '../../../domain/ports/booking.port';
import { Booking } from '../../../domain/entities/booking.entity';
import { BookingMapper } from '../mappers/booking.mapper';

@Injectable()
export class PrismaBookingRepository implements BookingRepositoryPortType {
  constructor(private readonly prisma: PrismaService) {}

  async save(booking: Booking): Promise<Booking> {
    const data = BookingMapper.toPersistence(booking);
    const saved = await this.prisma.booking.create({ data });
    return BookingMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Booking | null> {
    const found = await this.prisma.booking.findUnique({ where: { id } });
    return found ? BookingMapper.toDomain(found) : null;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    const rows = await this.prisma.booking.findMany({ where: { userId } });
    return rows.map(BookingMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.booking.delete({ where: { id } });
  }
}
