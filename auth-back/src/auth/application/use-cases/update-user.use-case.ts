import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryPort } from "src/auth/domain/ports/repositories/user.repository.port";
import { RegisterResponseDto } from "../dtos/register-response.dto";
import { UpdateCommand } from "../commands/update.command";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject()
        private readonly userRepositoryPort: UserRepositoryPort
    ) { }

    async execute(command: UpdateCommand): Promise<RegisterResponseDto>{

    const isSelfUpdate = command.requesterId === command.targetUserId;
    
    let isAdmin = false; 

    if (!isSelfUpdate) {

      const requester = await this.userRepositoryPort.findById(command.requesterId);
      
      if (!requester || !requester.roles.includes('ADMIN')) {
        throw new ForbiddenException('You are not allowed to update other accounts.');
      }
      isAdmin = true;
    }

    if (!isAdmin && (command.updates.roles || command.updates.status !== undefined)) {
      throw new ForbiddenException('You cannot change your own roles or account status.');
    }

    const user = await this.userRepositoryPort.findById(command.targetUserId);
    if (!user) {
      throw new NotFoundException('User to update not found.');
    }

    if (command.updates.login) {
        user.updateLogin(command.updates.login);
    }

    if (command.updates.roles) {
        user.updateRoles(command.updates.roles);
    }
    if (command.updates.status !== undefined) {
        user.updateStatus(command.updates.status);
    }
    
    await this.userRepositoryPort.update(user);

    return new RegisterResponseDto(
      user.id,
      user.login,
      user.roles,
      user.createdAt,
      user.updatedAt,
    );
    }
}