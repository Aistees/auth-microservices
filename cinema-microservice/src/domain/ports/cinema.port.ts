import {Cinema } from '../entities/cinema.entity'

export abstract class CinemaRepositoryPort {
    abstract save(cinema: Cinema): Promise<Cinema>;
    abstract findAll(): Promise<Cinema[]>;
    abstract findById(id: string): Promise<Cinema | null>;
    abstract delete(id: string): Promise<void>;
}