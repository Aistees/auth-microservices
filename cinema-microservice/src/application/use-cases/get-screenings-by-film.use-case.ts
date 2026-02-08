import { Injectable, Inject } from '@nestjs/common';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.port';

@Injectable()
export class GetScreeningsByFilmUseCase {
  constructor(@Inject(ScreeningRepositoryPort) private readonly screeningRepo: ScreeningRepositoryPort) {}

  async execute(filmId: string) {
    // This will fetch all screenings for a specific film
    const allScreenings = await this.screeningRepo.findAll();
    return allScreenings.filter((screening: any) => screening.externalFilmId === filmId);
  }
}
