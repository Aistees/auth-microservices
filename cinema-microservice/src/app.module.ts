import { Module } from '@nestjs/common';
import { CinemaController } from './interfaces/controllers/cinema.controller';
import { RoomController } from './interfaces/controllers/room.controller';
import { SeatController } from './interfaces/controllers/seat.controller';
import { ScreeningController } from './interfaces/controllers/screening.controller';
import { CreateCinemaUseCase } from './application/use-cases/create-cinema.use-case';
import { ListCinemasUseCase } from './application/use-cases/list-cinemas.use-case';
import { GetCinemaUseCase } from './application/use-cases/get-cinema.use-case';
import { DeleteCinemaUseCase } from './application/use-cases/delete-cinema.use-case';
import { UpdateCinemaUseCase } from './application/use-cases/update-cinema.use-case';
import { CreateRoomUseCase } from './application/use-cases/create-room.use-case';
import { ListRoomsUseCase } from './application/use-cases/list-rooms.use-case';
import { GetRoomUseCase } from './application/use-cases/get-room.use-case';
import { DeleteRoomUseCase } from './application/use-cases/delete-room.use-case';
import { UpdateRoomUseCase } from './application/use-cases/update-room.use-case';
import { CreateSeatUseCase } from './application/use-cases/create-seat.use-case';
import { ListSeatsUseCase } from './application/use-cases/list-seats.use-case';
import { GetSeatUseCase } from './application/use-cases/get-seat.use-case';
import { DeleteSeatUseCase } from './application/use-cases/delete-seat.use-case';
import { UpdateSeatUseCase } from './application/use-cases/update-seat.use-case';
import { CreateScreeningUseCase } from './application/use-cases/create-screening.use-case';
import { ListScreeningsUseCase } from './application/use-cases/list-screenings.use-case';
import { GetScreeningUseCase } from './application/use-cases/get-screening.use-case';
import { DeleteScreeningUseCase } from './application/use-cases/delete-screening.use-case';
import { UpdateScreeningUseCase } from './application/use-cases/update-screening.use-case';
import { PrismaCinemaRepository } from './infrastructure/persistence/repositories/prisma.cinema.repository';
import { PrismaRoomRepository } from './infrastructure/persistence/repositories/prisma.room.repository';
import { PrismaSeatRepository } from './infrastructure/persistence/repositories/prisma.seat.repository';
import { PrismaScreeningRepository } from './infrastructure/persistence/repositories/prisma.screening.repository';
import { CinemaRepositoryPort } from './domain/ports/cinema.port';
import { RoomRepositoryPort } from './domain/ports/room.port';
import { SeatRepositoryPort } from './domain/ports/seat.port';
import { ScreeningRepositoryPort } from './domain/ports/screening.port';
import { PrismaService } from './infrastructure/persistence/prisma.service';

@Module({
  controllers: [CinemaController, RoomController, SeatController, ScreeningController],
  providers: [
    PrismaService,
    // Cinema Use Cases
    CreateCinemaUseCase,
    ListCinemasUseCase,
    GetCinemaUseCase,
    DeleteCinemaUseCase,
    UpdateCinemaUseCase,
    {
      provide: CinemaRepositoryPort,
      useClass: PrismaCinemaRepository,
    },
    // Room Use Cases
    CreateRoomUseCase,
    ListRoomsUseCase,
    GetRoomUseCase,
    DeleteRoomUseCase,
    UpdateRoomUseCase,
    {
      provide: RoomRepositoryPort,
      useClass: PrismaRoomRepository,
    },
    // Seat Use Cases
    CreateSeatUseCase,
    ListSeatsUseCase,
    GetSeatUseCase,
    DeleteSeatUseCase,
    UpdateSeatUseCase,
    {
      provide: SeatRepositoryPort,
      useClass: PrismaSeatRepository,
    },
    // Screening Use Cases
    CreateScreeningUseCase,
    ListScreeningsUseCase,
    GetScreeningUseCase,
    DeleteScreeningUseCase,
    UpdateScreeningUseCase,
    {
      provide: ScreeningRepositoryPort,
      useClass: PrismaScreeningRepository,
    },
  ],
})
export class AppModule {}
