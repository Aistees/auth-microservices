import { ConflictException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/ports/repositories/user.repository.port';
import { HashingServicePort } from '../../domain/ports/services/hashing.service.port';
import { RegisterCommand } from '../commands/register.command';
import { RegisterResponseDto } from '../dtos/register-response.dto';


export class RegisterUseCases {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly hashingService: HashingServicePort,
    ){}

    async execute(command: RegisterCommand): Promise<RegisterResponseDto> {
        console.log(command.login)

        const verifyUserExist = await this.userRepo.findByLogin(command.login);
        if(verifyUserExist) {
            throw new ConflictException('User already exist');
        }

        const hashedPassword = await this.hashingService.hash(command.password)
        
        const newUser = new User(
            crypto.randomUUID(),
            command.login,
            hashedPassword,
            command.roles,
            command.status
        )
        await this.userRepo.save(newUser)
        return new RegisterResponseDto(newUser.id);
    }
}