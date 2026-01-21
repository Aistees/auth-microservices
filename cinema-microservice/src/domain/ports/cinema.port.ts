import {Cinema } from '../entities/cinema.entity'

export abstract class CinemaRepositoryPort {
    abstract save(cinema: Cinema): Promise<Cinema>;
    abstract findAll(): Promise<Cinema[]>;
    abstract findOne(id: string): Promise<Cinema>;
    abstract delete(id: string): Promise<void>;
}