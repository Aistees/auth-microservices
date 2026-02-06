import { Injectable } from '@nestjs/common';
import { ScreeningRepositoryPort } from 'src/domain/ports/screening.port';
import { CreateScreeningCommand } from 'src/application/commands/create-screening.command';
import { Screening } from 'src/domain/entities/screening.entity';

@Injectable()
export class CreateScreeningUseCase {
  constructor(private readonly screeningRepositoryPort: ScreeningRepositoryPort) {}

  async execute(command: CreateScreeningCommand): Promise<Screening> {
    const newScreening = new Screening(
      crypto.randomUUID(),
      command.roomId,
      command.externalFilmId,
      command.startTime,
      command.endTime,
      command.price,
      new Date(),
      new Date(),
    );

    return this.screeningRepositoryPort.save(newScreening);
  }
}
