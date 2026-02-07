import { Module } from '@nestjs/common';
import { BookingController } from './interfaces/controllers/booking.controller';
import { CreateBookingUseCase } from './application/use-cases/create-booking.use-case';
import { ListBookingsUseCase } from './application/use-cases/list-bookings.use-case';
import { GetBookingUseCase } from './application/use-cases/get-booking.use-case';
import { CancelBookingUseCase } from './application/use-cases/cancel-booking.use-case';
import { PrismaBookingRepository } from './infrastructure/persistence/repositories/prisma.booking.repository';
import { BookingRepositoryPort } from './domain/ports/booking.port';
import { PrismaService } from './infrastructure/persistence/prisma.service';

@Module({
  controllers: [BookingController],
  providers: [
    PrismaService,
    // Booking Use Cases
    CreateBookingUseCase,
    ListBookingsUseCase,
    GetBookingUseCase,
    CancelBookingUseCase,
    {
      provide: BookingRepositoryPort,
      useClass: PrismaBookingRepository,
    },
  ],
})
export class AppModule {}
