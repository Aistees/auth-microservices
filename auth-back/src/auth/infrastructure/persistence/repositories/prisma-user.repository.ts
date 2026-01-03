import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserRepositoryPort } from "src/auth/domain/ports/repositories/user.repository.port";
import { PrismaService } from "../../../../prisma/prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async findByLogin(login: string): Promise<User> {
        const userRow = await this.prisma.user.findUnique({
            where: { login: login },
        });
        if (!userRow) throw new NotFoundException(`Can't found user with this login: ${login}`);
        return UserMapper.toDomain(userRow);
    }

    async checkIfLoginExists(login: string): Promise<boolean> {
        const userRow = await this.prisma.user.findUnique({
            where: { login: login }
        })
        return userRow ? true : false;
    }

    async findById(user_id: string): Promise<User | null> {
        const userRow = await this.prisma.user.findUnique({
            where: { id: user_id },
        });
        if (!userRow) return null;
        return UserMapper.toDomain(userRow);
    }

    async save(user: User): Promise<void> {
        const ormEntity = UserMapper.toPersistence(user);
        await this.prisma.user.create({
            data: {
                id: ormEntity.id,
                login: ormEntity.login,
                password: ormEntity.password,
                roles: ormEntity.roles,
                status: ormEntity.status,
            },
        });
    }

    async update(user_id: string, updatedUser: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user_id },
            data: {
                login: updatedUser.login || undefined,
                password: updatedUser.passwordHash || undefined,
                roles: updatedUser.roles || undefined,
                status: updatedUser.status || undefined,
            },
        });
    }
}
