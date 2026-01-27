import { Cinema } from 'src/domain/entities/cinema.entity';

export class UpdateCinemaCommand {
  constructor(public readonly cinema: Cinema) {}
}
