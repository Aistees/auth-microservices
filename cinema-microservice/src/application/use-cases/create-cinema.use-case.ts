import { Injectable } from '@nestjs/common';
import { CinemaRepositoryPort } from "src/domain/ports/cinema.port";
import { CreateCinemaCommand } from "../commands/create-cinema.command";
import { Cinema } from "src/domain/entities/cinema.entity";

@Injectable()
export class CreateCinemaUseCase {
    constructor(
        private readonly cinemaRepositoryPort: CinemaRepositoryPort
    ) {}

    async execute(command: CreateCinemaCommand): Promise<Cinema> {
        const newCinema = new Cinema(
            crypto.randomUUID(),
            command.name,
            command.city,
            command.address,
            new Date(),
            new Date()
        );

        return this.cinemaRepositoryPort.save(newCinema);

    }
}