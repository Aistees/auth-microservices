import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { CreateCinemaUseCase } from '../../application/use-cases/create-cinema.use-case';
import { ListCinemasUseCase } from '../../application/use-cases/list-cinemas.use-case';
import { GetCinemaUseCase } from '../../application/use-cases/get-cinema.use-case';
import { DeleteCinemaUseCase } from '../../application/use-cases/delete-cinema.use-case';
import { UpdateCinemaUseCase } from '../../application/use-cases/update-cinema.use-case';
import { CreateCinemaDto } from '../dtos/create-cinema.dto';
import { UpdateCinemaDto } from '../dtos/update-cinema.dto';
import { CreateCinemaCommand } from '../../application/commands/create-cinema.command';
import { UpdateCinemaCommand } from '../../application/commands/update-cinema.command';

@ApiTags('Cinemas')
@Controller('cinemas')
export class CinemaController {
  constructor(
    private readonly createCinemaUseCase: CreateCinemaUseCase,
    private readonly listCinemasUseCase: ListCinemasUseCase,
    private readonly getCinemaUseCase: GetCinemaUseCase,
    private readonly deleteCinemaUseCase: DeleteCinemaUseCase,
    private readonly updateCinemaUseCase: UpdateCinemaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cinema' })
  @ApiResponse({ status: 201, description: 'The cinema has been successfully created.' })
  async create(@Body() dto: CreateCinemaDto) {
    // Map DTO -> Command
    const command = new CreateCinemaCommand(dto.name, dto.city, dto.address);
    
    // Execute
    return this.createCinemaUseCase.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'List cinemas' })
  async list() {
    return this.listCinemasUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cinema by id' })
  async get(@Param('id') id: string) {
    return this.getCinemaUseCase.execute(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update a cinema' })
  async update(@Body() dto: UpdateCinemaDto) {
    const cmd = new UpdateCinemaCommand({
      id: dto.id,
      name: dto.name,
      city: dto.city,
      address: dto.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.updateCinemaUseCase.execute(cmd.cinema);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cinema' })
  async remove(@Param('id') id: string) {
    return this.deleteCinemaUseCase.execute(id);
  }

    @ApiProperty()
    async createRooms() {

    }

    @ApiProperty()
    async createSeats() {

    }

    @ApiProperty()
    async createScreening() {

    }

    @ApiProperty()
    async updateCinema() {

    }

    @ApiProperty()
    async updateRooms() {

    }

    @ApiProperty()
    async updateSeats() {

    }

    @ApiProperty()
    async updateScreening() {

    }

    @ApiProperty()
    async deleteCinema() {

    }

    @ApiProperty()
    async deleteRooms() {

    }

    @ApiProperty()
    async deleteSeats() {

    }

    @ApiProperty()
    async deleteScreening() {

    }
}