import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CinemaRepositoryPort } from '../../../domain/ports/cinema.port';
import { Cinema } from '../../../domain/entities/cinema.entity';
import { CinemaMapper } from '../mappers/cinema.mapper';

@Injectable()
export class PrismaCinemaRepository implements CinemaRepositoryPort {
    
  constructor(private readonly prisma: PrismaService) {}
    findOne(id: string): Promise<Cinema> {
        throw new Error('Method not implemented.');
    }

  async save(cinema: Cinema): Promise<Cinema> {
    const data = CinemaMapper.toPersistence(cinema);
    const saved = await this.prisma.cinemas.create({ data });
    return CinemaMapper.toDomain(saved);
  }

  async findAll(): Promise<Cinema[]> {
    const cinemas = await this.prisma.cinemas.findMany();
    return cinemas.map(CinemaMapper.toDomain);
  }
  
  async findById(id: string): Promise<Cinema | null> {
    const found = await this.prisma.cinemas.findUnique({ where: { id } });
    return found ? CinemaMapper.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cinemas.delete({ where: { id } });
  }
}