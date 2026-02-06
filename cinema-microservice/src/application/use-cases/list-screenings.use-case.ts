import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';
import { Screening } from 'src/domain/entities/screening.entity';

@Injectable()
export class ListScreeningsUseCase {
  constructor(private readonly screeningRepositoryPort: ScreeningRepositoryPort) {}

  async execute(): Promise<Screening[]> {
    return this.screeningRepositoryPort.findAll();
  }
}
