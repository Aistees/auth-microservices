import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { FilmRepositoryPort } from '../../domain/ports/film.port';
import type { FilmRepositoryPortType } from '../../domain/ports/film.port';
import { Film } from '../../domain/entities/film.entity';

@Injectable()
export class UpdateFilmUseCase {
  constructor(@Inject(FilmRepositoryPort) private readonly filmRepo: FilmRepositoryPortType) {}

  async execute(filmId: string, data: any) {
    const existingFilm = await this.filmRepo.findById(filmId);
    if (!existingFilm) {
      throw new NotFoundException(`Film with ID ${filmId} not found`);
    }

    if (!data.title || !data.director) {
      throw new BadRequestException('Film title and director are required');
    }

    const updatedFilm = new Film(
      filmId,
      data.title,
      data.description,
      data.director,
      data.genre,
      data.duration,
      data.releaseDate,
      data.rating || existingFilm.rating,
      existingFilm.createdAt,
      new Date(),
    );

    return this.filmRepo.update(filmId, updatedFilm);
  }
}
