import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoomUseCase } from 'src/application/use-cases/create-room.use-case';
import { ListRoomsUseCase } from 'src/application/use-cases/list-rooms.use-case';
import { GetRoomUseCase } from 'src/application/use-cases/get-room.use-case';
import { DeleteRoomUseCase } from 'src/application/use-cases/delete-room.use-case';
import { UpdateRoomUseCase } from 'src/application/use-cases/update-room.use-case';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { UpdateRoomDto } from '../dtos/update-room.dto';
import { CreateRoomCommand } from 'src/application/commands/create-room.command';
import { UpdateRoomCommand } from 'src/application/commands/update-room.command';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly listRoomsUseCase: ListRoomsUseCase,
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly deleteRoomUseCase: DeleteRoomUseCase,
    private readonly updateRoomUseCase: UpdateRoomUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
  async create(@Body() dto: CreateRoomDto) {
    const command = new CreateRoomCommand(dto.name, dto.capacity, dto.cinemaId);
    return this.createRoomUseCase.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'List all rooms' })
  async list() {
    return this.listRoomsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by id' })
  async get(@Param('id') id: string) {
    return this.getRoomUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a room' })
  async update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    const cmd = new UpdateRoomCommand(
      id,
      dto.name,
      dto.capacity,
      dto.cinemaId,
      new Date(),
    );
    return this.updateRoomUseCase.execute(cmd);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  async remove(@Param('id') id: string) {
    return this.deleteRoomUseCase.execute(id);
  }
}
