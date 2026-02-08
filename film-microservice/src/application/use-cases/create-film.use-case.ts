import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { FilmRepositoryPort } from '../../domain/ports/film.port';
import type { FilmRepositoryPortType } from '../../domain/ports/film.port';
import { Film } from '../../domain/entities/film.entity';

@Injectable()
export class CreateFilmUseCase {
  constructor(@Inject(FilmRepositoryPort) private readonly filmRepo: FilmRepositoryPortType) {}

  async execute(data: any) {
    if (!data.title || !data.director) {
      throw new BadRequestException('Film title and director are required');
    }

    const now = new Date();
    const film = new Film(
      data.id,
      data.title,
      data.description,
      data.director,
      data.genre,
      data.duration,
      data.releaseDate,
      data.rating || 0,
      now,
      now,
    );

    return this.filmRepo.save(film);
  }
}
