import { Injectable, Inject } from '@nestjs/common';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.port';

@Injectable()
export class GetScreeningsByRoomUseCase {
  constructor(@Inject(ScreeningRepositoryPort) private readonly screeningRepo: ScreeningRepositoryPort) {}

  async execute(roomId: string) {
    return this.screeningRepo.findByRoomId(roomId);
  }
}
