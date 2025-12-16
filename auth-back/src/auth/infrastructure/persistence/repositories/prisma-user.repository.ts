import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepositoryPort } from 'src/auth/domain/ports/repositories/user.repository.port';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async findByLogin(login: string): Promise<User | null> {
        const userRow = await this.prisma.({
            where: { login: login },
        });
        if (!userRow) return null;
        return UserMapper.toDomain(userRow);
    }

    async findById(user_id: string): Promise<User | null> {
        const userRow = await this.prisma.findOne({ where: { id: user_id } });
        if (!userRow) return null;
        return UserMapper.toDomain(userRow);
    }

    async save(user: User): Promise<void> {
        const ormEntity = UserMapper.toPersistence(user);
        await this.prisma.save(ormEntity);
    }

    async update(user_id: string, updatedUser: User): Promise<void> {
        await this.prisma.findByLogin({
            where: { id: { user_id } },
            data: {
                login: updatedUser.login || undefined,
                password: updatedUser.passwordHash || undefined,
                role: updatedUser.roles || undefined,
                status: updatedUser.status || undefined,
            },
        });
    }
}
