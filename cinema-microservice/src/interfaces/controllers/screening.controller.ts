import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateScreeningUseCase } from 'src/application/use-cases/create-screening.use-case';
import { ListScreeningsUseCase } from 'src/application/use-cases/list-screenings.use-case';
import { GetScreeningUseCase } from 'src/application/use-cases/get-screening.use-case';
import { DeleteScreeningUseCase } from 'src/application/use-cases/delete-screening.use-case';
import { UpdateScreeningUseCase } from 'src/application/use-cases/update-screening.use-case';
import { CreateScreeningDto } from '../dtos/create-screening.dto';
import { UpdateScreeningDto } from '../dtos/update-screening.dto';
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
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new screening' })
  @ApiResponse({ status: 201, description: 'The screening has been successfully created.' })
  async create(@Body() dto: CreateScreeningDto) {
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
