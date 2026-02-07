export const BookingRepositoryPort = Symbol('BookingRepositoryPort');

import { Booking } from '../entities/booking.entity';

export interface BookingRepository {
  save(booking: Booking): Promise<Booking>;
  findById(id: string): Promise<Booking | null>;
  findByUser(userId: string): Promise<Booking[]>;
  delete(id: string): Promise<void>;
}

export type BookingRepositoryPortType = BookingRepository;
