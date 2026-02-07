import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateBookingUseCase } from '../../application/use-cases/create-booking.use-case';
import { ListBookingsUseCase } from '../../application/use-cases/list-bookings.use-case';
import { GetBookingUseCase } from '../../application/use-cases/get-booking.use-case';
import { CancelBookingUseCase } from '../../application/use-cases/cancel-booking.use-case';
import { Booking } from '../../domain/entities/booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly createBooking: CreateBookingUseCase,
    private readonly listBookings: ListBookingsUseCase,
    private readonly getBooking: GetBookingUseCase,
    private readonly cancelBooking: CancelBookingUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a booking' })
  @ApiBody({ type: CreateBookingDto })
  async create(@Body() payload: CreateBookingDto) {
    const p = payload || ({} as CreateBookingDto);
    const b = new Booking(
      p['id'] || '',
      p.screeningId || '',
      p.seatId || '',
      p.userId || '',
      'reserved',
      new Date(),
      new Date(),
    );
    return this.createBooking.execute(b);
  }

  @Get('user/:userId')
  async listByUser(@Param('userId') userId: string) {
    return this.listBookings.execute(userId);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getBooking.execute(id);
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    return this.cancelBooking.execute(id);
  }
}
