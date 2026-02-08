import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FilmRepositoryPort } from '../../domain/ports/film.port';
import type { FilmRepositoryPortType } from '../../domain/ports/film.port';

@Injectable()
export class DeleteFilmUseCase {
  constructor(@Inject(FilmRepositoryPort) private readonly filmRepo: FilmRepositoryPortType) {}

  async execute(filmId: string) {
    const film = await this.filmRepo.findById(filmId);
    if (!film) {
      throw new NotFoundException(`Film with ID ${filmId} not found`);
    }
    return this.filmRepo.delete(filmId);
  }
}
