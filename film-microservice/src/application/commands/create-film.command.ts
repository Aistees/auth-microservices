import { Film } from '../../domain/entities/film.entity';

export class CreateFilmCommand {
  constructor(public readonly film: Film) {}
}
