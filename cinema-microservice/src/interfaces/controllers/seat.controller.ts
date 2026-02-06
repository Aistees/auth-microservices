import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSeatUseCase } from 'src/application/use-cases/create-seat.use-case';
import { ListSeatsUseCase } from 'src/application/use-cases/list-seats.use-case';
import { GetSeatUseCase } from 'src/application/use-cases/get-seat.use-case';
import { DeleteSeatUseCase } from 'src/application/use-cases/delete-seat.use-case';
import { UpdateSeatUseCase } from 'src/application/use-cases/update-seat.use-case';
import { CreateSeatDto } from '../dtos/create-seat.dto';
import { UpdateSeatDto } from '../dtos/update-seat.dto';
import { CreateSeatCommand } from 'src/application/commands/create-seat.command';
import { UpdateSeatCommand } from 'src/application/commands/update-seat.command';

@ApiTags('Seats')
@Controller('seats')
export class SeatController {
  constructor(
    private readonly createSeatUseCase: CreateSeatUseCase,
    private readonly listSeatsUseCase: ListSeatsUseCase,
    private readonly getSeatUseCase: GetSeatUseCase,
    private readonly deleteSeatUseCase: DeleteSeatUseCase,
    private readonly updateSeatUseCase: UpdateSeatUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new seat' })
  @ApiResponse({ status: 201, description: 'The seat has been successfully created.' })
  async create(@Body() dto: CreateSeatDto) {
    const command = new CreateSeatCommand(dto.row, dto.number, dto.roomId);
    return this.createSeatUseCase.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'List all seats' })
  async list() {
    return this.listSeatsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get seat by id' })
  async get(@Param('id') id: string) {
    return this.getSeatUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a seat' })
  async update(@Param('id') id: string, @Body() dto: UpdateSeatDto) {
    const cmd = new UpdateSeatCommand(
      id,
      dto.row,
      dto.number,
      dto.roomId,
      new Date(),
    );
    return this.updateSeatUseCase.execute(cmd);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a seat' })
  async remove(@Param('id') id: string) {
    return this.deleteSeatUseCase.execute(id);
  }
}
