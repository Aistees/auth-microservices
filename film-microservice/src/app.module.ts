import { Module } from '@nestjs/common';
import { FilmController } from './interfaces/controllers/film.controller';
import { CreateFilmUseCase } from './application/use-cases/create-film.use-case';
import { ListFilmsUseCase } from './application/use-cases/list-films.use-case';
import { GetFilmUseCase } from './application/use-cases/get-film.use-case';
import { UpdateFilmUseCase } from './application/use-cases/update-film.use-case';
import { DeleteFilmUseCase } from './application/use-cases/delete-film.use-case';
import { PrismaFilmRepository } from './infrastructure/persistence/repositories/prisma.film.repository';
import { FilmRepositoryPort } from './domain/ports/film.port';
import { PrismaService } from './infrastructure/persistence/prisma.service';

@Module({
  controllers: [FilmController],
  providers: [
    PrismaService,
    // Film Use Cases
    CreateFilmUseCase,
    ListFilmsUseCase,
    GetFilmUseCase,
    UpdateFilmUseCase,
    DeleteFilmUseCase,
    {
      provide: FilmRepositoryPort,
      useClass: PrismaFilmRepository,
    },
  ],
})
export class AppModule {}
