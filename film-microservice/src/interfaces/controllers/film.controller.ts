import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { CreateFilmUseCase } from '../../application/use-cases/create-film.use-case';
import { GetFilmUseCase } from '../../application/use-cases/get-film.use-case';
import { ListFilmsUseCase } from '../../application/use-cases/list-films.use-case';
import { UpdateFilmUseCase } from '../../application/use-cases/update-film.use-case';
import { DeleteFilmUseCase } from '../../application/use-cases/delete-film.use-case';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';

@ApiTags('Films')
@Controller()
export class FilmController {
  constructor(
    private readonly createFilmUseCase: CreateFilmUseCase,
    private readonly getFilmUseCase: GetFilmUseCase,
    private readonly listFilmsUseCase: ListFilmsUseCase,
    private readonly updateFilmUseCase: UpdateFilmUseCase,
    private readonly deleteFilmUseCase: DeleteFilmUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new film' })
  @ApiBody({ type: CreateFilmDto })
  @ApiResponse({ status: 201, description: 'Film created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.createFilmUseCase.execute(createFilmDto);
  }

  @ApiOperation({ 
    summary: 'Get film by ID',
    description: 'Returns film details. To get screenings for this film, use GET /screenings/film/:filmId in the Cinema Microservice'
  })
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiResponse({ status: 200, description: 'Film found' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getFilmUseCase.execute(id);
  }

  @ApiOperation({ 
    summary: 'Get all films',
    description: 'Returns list of all films in the system. Each film can be scheduled in multiple screenings via the Cinema Microservice.'
  })
  @ApiResponse({ status: 200, description: 'List of all films' })
  @Get()
  async getAll() {
    return this.listFilmsUseCase.execute();
  }

  @ApiOperation({ summary: 'Update film by ID' })
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiBody({ type: UpdateFilmDto })
  @ApiResponse({ status: 200, description: 'Film updated successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.updateFilmUseCase.execute(id, updateFilmDto);
  }

  @ApiOperation({ summary: 'Delete film by ID' })
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiResponse({ status: 200, description: 'Film deleted successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteFilmUseCase.execute(id);
  }
}
