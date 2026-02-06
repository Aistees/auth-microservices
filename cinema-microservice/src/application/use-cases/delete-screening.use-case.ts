import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';

@Injectable()
export class DeleteScreeningUseCase {
  constructor(private readonly screeningRepositoryPort: ScreeningRepositoryPort) {}

  async execute(id: string): Promise<void> {
    return this.screeningRepositoryPort.delete(id);
  }
}
