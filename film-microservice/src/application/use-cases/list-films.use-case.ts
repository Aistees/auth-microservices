import { Injectable, Inject } from '@nestjs/common';
import { FilmRepositoryPort } from '../../domain/ports/film.port';
import type { FilmRepositoryPortType } from '../../domain/ports/film.port';

@Injectable()
export class ListFilmsUseCase {
  constructor(@Inject(FilmRepositoryPort) private readonly filmRepo: FilmRepositoryPortType) {}

  async execute() {
    return this.filmRepo.findAll();
  }
}
