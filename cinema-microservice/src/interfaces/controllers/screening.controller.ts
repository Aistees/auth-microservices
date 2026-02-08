import { Controller, Post, Body, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateScreeningUseCase } from 'src/application/use-cases/create-screening.use-case';
import { ListScreeningsUseCase } from 'src/application/use-cases/list-screenings.use-case';
import { GetScreeningUseCase } from 'src/application/use-cases/get-screening.use-case';
import { DeleteScreeningUseCase } from 'src/application/use-cases/delete-screening.use-case';
import { UpdateScreeningUseCase } from 'src/application/use-cases/update-screening.use-case';
import { GetScreeningsByFilmUseCase } from 'src/application/use-cases/get-screenings-by-film.use-case';
import { GetScreeningsByRoomUseCase } from 'src/application/use-cases/get-screenings-by-room.use-case';
import { CheckRoomAvailabilityUseCase } from 'src/application/use-cases/check-room-availability.use-case';
import { CreateScreeningDto } from '../dtos/create-screening.dto';
import { UpdateScreeningDto } from '../dtos/update-screening.dto';
import { CheckRoomAvailabilityDto } from '../dtos/check-room-availability.dto';
import { CreateScreeningCommand } from 'src/application/commands/create-screening.command';
import { UpdateScreeningCommand } from 'src/application/commands/update-screening.command';

@ApiTags('Screenings')
@Controller('screenings')
export class ScreeningController {
  constructor(
    private readonly createScreeningUseCase: CreateScreeningUseCase,
    private readonly listScreeningsUseCase: ListScreeningsUseCase,
    private readonly getScreeningUseCase: GetScreeningUseCase,
    private readonly deleteScreeningUseCase: DeleteScreeningUseCase,
    private readonly updateScreeningUseCase: UpdateScreeningUseCase,
    private readonly getScreeningsByFilmUseCase: GetScreeningsByFilmUseCase,
    private readonly getScreeningsByRoomUseCase: GetScreeningsByRoomUseCase,
    private readonly checkRoomAvailabilityUseCase: CheckRoomAvailabilityUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new screening' })
  @ApiResponse({ status: 201, description: 'The screening has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Room is not available at the requested time.' })
  async create(@Body() dto: CreateScreeningDto) {
    await this.checkRoomAvailabilityUseCase.execute(dto.roomId, dto.startTime, dto.endTime);

    const command = new CreateScreeningCommand(
      dto.roomId,
      dto.externalFilmId,
      dto.startTime,
      dto.endTime,
      dto.price,
    );
    return this.createScreeningUseCase.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'List all screenings' })
  async list() {
    return this.listScreeningsUseCase.execute();
  }

  @Get('film/:filmId')
  @ApiOperation({ summary: 'Get all screenings for a specific film' })
  @ApiParam({ name: 'filmId', description: 'Film ID' })
  @ApiResponse({ status: 200, description: 'List of screenings for the film' })
  async getByFilm(@Param('filmId') filmId: string) {
    return this.getScreeningsByFilmUseCase.execute(filmId);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get all screenings in a specific room' })
  @ApiParam({ name: 'roomId', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'List of screenings in the room' })
  async getByRoom(@Param('roomId') roomId: string) {
    return this.getScreeningsByRoomUseCase.execute(roomId);
  }

  @Post('check-availability')
  @ApiOperation({ summary: 'Check if a room is available for a time slot' })
  @ApiResponse({ status: 200, description: 'Room is available' })
  @ApiResponse({ status: 409, description: 'Room is not available - conflict detected' })
  async checkAvailability(@Body() dto: CheckRoomAvailabilityDto) {
    await this.checkRoomAvailabilityUseCase.execute(dto.roomId, dto.startTime, dto.endTime);
    return { available: true, message: 'Room is available for the requested time slot' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get screening by id' })
  async get(@Param('id') id: string) {
    return this.getScreeningUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a screening' })
  async update(@Param('id') id: string, @Body() dto: UpdateScreeningDto) {
    const cmd = new UpdateScreeningCommand(
      id,
      dto.roomId,
      dto.externalFilmId,
      dto.startTime,
      dto.endTime,
      dto.price,
      new Date(),
    );
    return this.updateScreeningUseCase.execute(cmd);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a screening' })
  async remove(@Param('id') id: string) {
    return this.deleteScreeningUseCase.execute(id);
  }
}
