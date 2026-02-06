import { Injectable } from '@nestjs/common';
import { CinemaRepositoryPort } from 'src/domain/ports/cinema.port';
import { Cinema } from 'src/domain/entities/cinema.entity';

@Injectable()
export class ListCinemasUseCase {
  constructor(private readonly repo: CinemaRepositoryPort) {}

  async execute(): Promise<Cinema[]> {
    return this.repo.findAll();
  }
}
