import { CinemaRepositoryPort } from 'src/domain/ports/cinema.port';

export class DeleteCinemaUseCase {
  constructor(private readonly repo: CinemaRepositoryPort) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
