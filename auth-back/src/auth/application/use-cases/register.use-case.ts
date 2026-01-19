import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { HashingServicePort } from '../../domain/ports/services/hashing.service.port';
import { RegisterCommand } from '../commands/register.command';
import { RegisterResponseDto } from '../dtos/register-response.dto';


@Injectable()
export class RegisterUseCases {
    constructor(
        @Inject()
        private readonly userRepo: UserRepositoryPort,
        @Inject()
        private readonly hashingService: HashingServicePort,
    ) { }

    async execute(command: RegisterCommand): Promise<RegisterResponseDto> {
        const verifyUserExist = await this.userRepo.checkIfLoginExists(command.login);
        console.log(verifyUserExist)
        if (verifyUserExist) {
            throw new ConflictException('User already exist');
        }


        const hashedPassword = await this.hashingService.hash(command.password)

        const newUser = new User(
            crypto.randomUUID(),
            command.login,
            hashedPassword,
            command.roles,
            command.status,
            new Date(),
            new Date()
        )
        await this.userRepo.save(newUser)
        return new RegisterResponseDto(newUser.id, newUser.login, newUser.roles, newUser.createdAt, newUser.updatedAt);
    }
}
