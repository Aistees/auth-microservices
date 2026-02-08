export const FilmRepositoryPort = Symbol('FilmRepositoryPort');

import { Film } from '../entities/film.entity';

export interface FilmRepository {
  save(film: Film): Promise<Film>;
  findById(id: string): Promise<Film | null>;
  findAll(): Promise<Film[]>;
  update(id: string, film: Film): Promise<Film>;
  delete(id: string): Promise<void>;
}

export type FilmRepositoryPortType = FilmRepository;
