import { Film } from '../../../domain/entities/film.entity';
import { FilmRepository } from '../../../domain/ports/film.port';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaFilmRepository implements FilmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(film: Film): Promise<Film> {
    const saved = await this.prisma.film.create({
      data: {
        id: film.id,
        title: film.title,
        description: film.description,
        director: film.director,
        genre: film.genre,
        duration: film.duration,
        releaseDate: new Date(film.releaseDate),
        rating: film.rating,
        createdAt: film.createdAt,
        updatedAt: film.updatedAt,
      },
    });
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Film | null> {
    const found = await this.prisma.film.findUnique({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Film[]> {
    const films = await this.prisma.film.findMany();
    return films.map((f) => this.toDomain(f));
  }

  async update(id: string, film: Film): Promise<Film> {
    const updated = await this.prisma.film.update({
      where: { id },
      data: {
        title: film.title,
        description: film.description,
        director: film.director,
        genre: film.genre,
        duration: film.duration,
        releaseDate: new Date(film.releaseDate),
        rating: film.rating,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.film.delete({ where: { id } });
  }

  private toDomain(raw: any): Film {
    return new Film(
      raw.id,
      raw.title,
      raw.description,
      raw.director,
      raw.genre,
      raw.duration,
      raw.releaseDate,
      typeof raw.rating === 'object' && raw.rating !== null && 'toNumber' in raw.rating
        ? raw.rating.toNumber()
        : raw.rating,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
