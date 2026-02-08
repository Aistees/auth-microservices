import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ScreeningRepositoryPort } from '../../domain/ports/screening.port';

@Injectable()
export class CheckRoomAvailabilityUseCase {
  constructor(@Inject(ScreeningRepositoryPort) private readonly screeningRepo: ScreeningRepositoryPort) {}

  async execute(roomId: string, startTime: Date, endTime: Date): Promise<boolean> {
    // Check if a room is available for a given time slot
    const relevantScreenings = await this.screeningRepo.findByRoomId(roomId);

    // Check for time conflicts
    const hasConflict = relevantScreenings.some((screening) => {
      const screeningStart = new Date(screening.startTime);
      const screeningEnd = new Date(screening.endTime);
      const newStart = new Date(startTime);
      const newEnd = new Date(endTime);

      // Check if time slots overlap
      return newStart < screeningEnd && newEnd > screeningStart;
    });

    if (hasConflict) {
      throw new ConflictException(
        `Room is not available for the requested time slot. Please choose a different time.`
      );
    }

    return true;
  }
}
