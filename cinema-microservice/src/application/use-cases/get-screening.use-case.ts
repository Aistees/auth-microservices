import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';
import { Screening } from 'src/domain/entities/screening.entity';

@Injectable()
export class GetScreeningUseCase {
  constructor(private readonly screeningRepositoryPort: ScreeningRepositoryPort) {}

  async execute(id: string): Promise<Screening | null> {
    return this.screeningRepositoryPort.findById(id);
  }
}
