import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';
import { UpdateScreeningCommand } from 'src/application/commands/update-screening.command';
import { Screening } from 'src/domain/entities/screening.entity';

@Injectable()
export class UpdateScreeningUseCase {
  constructor(private readonly screeningRepositoryPort: ScreeningRepositoryPort) {}

  async execute(command: UpdateScreeningCommand): Promise<Screening> {
    const screening = new Screening(
      command.id,
      command.roomId,
      command.externalFilmId,
      command.startTime,
      command.endTime,
      command.price,
      command.createdAt,
      new Date(),
    );

    return this.screeningRepositoryPort.update(screening);
  }
}
