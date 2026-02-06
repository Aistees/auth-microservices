import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';
import { Screening } from 'src/domain/entities/screening.entity';
import { ScreeningMapper } from '../mappers/screening.mapper';

@Injectable()
export class PrismaScreeningRepository implements ScreeningRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(screening: Screening): Promise<Screening> {
    const data = ScreeningMapper.toPersistence(screening);
    const saved = await this.prisma.screening.create({
      data,
    });
    return ScreeningMapper.toDomain(saved);
  }

  async findAll(): Promise<Screening[]> {
    const screenings = await this.prisma.screening.findMany();
    return screenings.map(ScreeningMapper.toDomain);
  }

  async findById(id: string): Promise<Screening | null> {
    const found = await this.prisma.screening.findUnique({ where: { id } });
    return found ? ScreeningMapper.toDomain(found) : null;
  }

  async findByRoomId(roomId: string): Promise<Screening[]> {
    const screenings = await this.prisma.screening.findMany({
      where: { roomId },
    });
    return screenings.map(ScreeningMapper.toDomain);
  }

  async update(screening: Screening): Promise<Screening> {
    const data = ScreeningMapper.toPersistence(screening);
    const updated = await this.prisma.screening.update({
      where: { id: screening.id },
      data,
    });
    return ScreeningMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.screening.delete({ where: { id } });
  }
}
