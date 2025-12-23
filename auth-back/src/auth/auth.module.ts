import { Module } from '@nestjs/common';
import { HashingServicePort } from './domain/ports/services/hashing.service.port';
import { JwtModule } from '@nestjs/jwt'
import { BcryptHashingService } from './infrastructure/adapters/bcrypt.hashing.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtTokenService } from './infrastructure/adapters/jwt.token.service';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryPort } from './domain/ports/repositories/user.repository.port';
import { PrismaUserRepository } from './infrastructure/persistence/repositories/prisma-user.repository';
import { TokenServicePort } from './domain/ports/services/token.service.port';
import { AuthController } from './presentation/controllers/auth.controller';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { ValidateTokenUseCase } from './application/use-cases/validate-token.use-case';
import { RegisterUseCases } from './application/use-cases/register.use-case';

@Module({
    imports: [
        ConfigModule,
        JwtModule.register({}),
    ],
    controllers: [
      AuthController,
    ],
    providers: [
      LoginUseCase,
      {
        provide: HashingServicePort,     
        useClass: BcryptHashingService, 
      },
      {
          provide: UserRepositoryPort,
          useClass: PrismaUserRepository,
      },
      {
          provide: TokenServicePort,
          useClass: JwtTokenService,
      },
      LoginUseCase,
      RefreshTokenUseCase,
      ValidateTokenUseCase,
      RegisterUseCases
    ],
  exports: [],
})
export class AuthModule {}