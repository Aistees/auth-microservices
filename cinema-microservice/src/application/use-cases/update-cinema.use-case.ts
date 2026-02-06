import { Injectable } from '@nestjs/common';
import { CinemaRepositoryPort } from 'src/domain/ports/cinema.port';
import { Cinema } from 'src/domain/entities/cinema.entity';

@Injectable()
export class UpdateCinemaUseCase {
  constructor(private readonly repo: CinemaRepositoryPort) {}

  async execute(updated: Cinema): Promise<Cinema> {
    return this.repo.save(updated);
  }
}
