import { Film } from '../../domain/entities/film.entity';

export class UpdateFilmCommand {
  constructor(
    public readonly filmId: string,
    public readonly film: Film,
  ) {}
}
