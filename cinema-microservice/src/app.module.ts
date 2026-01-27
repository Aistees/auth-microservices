import { Module } from '@nestjs/common';
import { CinemaController } from './interfaces/controllers/cinema.controller';
import { CreateCinemaUseCase } from './application/use-cases/create-cinema.use-case';
import { ListCinemasUseCase } from './application/use-cases/list-cinemas.use-case';
import { GetCinemaUseCase } from './application/use-cases/get-cinema.use-case';
import { DeleteCinemaUseCase } from './application/use-cases/delete-cinema.use-case';
import { UpdateCinemaUseCase } from './application/use-cases/update-cinema.use-case';
import { PrismaCinemaRepository } from './infrastructure/persistence/repositories/prisma.cinema.repository';
import { CinemaRepositoryPort } from './domain/ports/cinema.port';
import { PrismaService } from './infrastructure/persistence/prisma.service';

@Module({
  controllers: [CinemaController],
  providers: [
    PrismaService,
    CreateCinemaUseCase,
    ListCinemasUseCase,
    GetCinemaUseCase,
    DeleteCinemaUseCase,
    UpdateCinemaUseCase,
    {
      provide: CinemaRepositoryPort,
      useClass: PrismaCinemaRepository,
    },
  ],
})
export class AppModule {}
