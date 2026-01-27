import { CinemaRepositoryPort } from 'src/domain/ports/cinema.port';
import { Cinema } from 'src/domain/entities/cinema.entity';

export class GetCinemaUseCase {
  constructor(private readonly repo: CinemaRepositoryPort) {}

  async execute(id: string): Promise<Cinema | null> {
    return this.repo.findById(id);
  }
}
